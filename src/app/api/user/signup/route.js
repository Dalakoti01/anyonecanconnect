import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Rank from "@/models/rankSchema";
import nodemailer from 'nodemailer';
import validator from "validator";
import disposableEmailDomains from "disposable-email-domains"



const blockedDomains = [
  "chansd.com",
  "cyclelove.cc",
  "imagepoet.net",
  "polkaroad.net",
  "teleg.eu",
  "azuretechtalk.net",
  "thetechnext.net",
  "logsmarter.net",
  "thetechnext.net",
  "vvtxiy.com",
  "gufum.com",
  "freesourcecodes.com",
  "koletter.com",
  "opemails.com",
  "zod.edu.pl",
  "instantletter.net",
  "psnator.com",
  "vibzi.com",
  "tempmailto.org",
  "machunu.com",
  "temp-inbox.me",
  "tempmail.us.com",
  "upsnab.net",
  "tozya.com",
  "finestudio.org",
  "1secmail.com",
  "1secmail.org",
  "1secmail.net",
  "rteet.com",
  "dpptd.com",
];

const isTemporaryEmail = (email) => {
  const domain = email.split("@")[1];
  console.log("Checking domain: ", domain); // Add logging to debug
  return (
    blockedDomains.includes(domain) || disposableEmailDomains.includes(domain)
  );
};


export async function POST(request) {
  try {
    dbConnect();
    const { username, fullName, email, password, role } = await request.json();
    console.log(username,fullName,email,password,role);
    
    if (!username || !fullName || !email || !password || !role) {
      console.log("incomplete");
      
      return NextResponse.json(
        {
          message: "Something is Missing",
          success: false,
        },
        { status: 400 }
      );
    }

    //Validating email
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        {
          message: "Invalid Email Address",
          success: false,
        },
        { status: 400 }
      );
    }

    //Checking for disposable email

    const domain = email.split("@")[1];
    if (disposableEmailDomains.includes(domain)) {
      return NextResponse.json(
        {
          message: "Temp Mail Are Not Allowed",
          success: false,
        },
        { status: 400 }
      );
    }

    //Check for temp mail from the given list of domains

    if (isTemporaryEmail(email)) {
      return NextResponse.json(
        {
          message: "Temp Mail Are Not Allowed",
          success: false,
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User Already Exist with this email",
          success: false,
        },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const verificationToken = crypto.randomBytes(32).toString("hex");
    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const otp = generateOTP();

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      role,
      verified: false,
      verification: {
        otp: otp,
        validity: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      },
    });

    await Rank.create({
      userDetails: user._id,
    });

    // const verificationLink = `${process.env.BACKEND_URL}/api/v1/user/verify-email?token=${verificationToken}`;
    await sendVerificationCode(email, otp);
    console.log("mail sent");
    
    return NextResponse.json(
      {
        message: "Account Created Successfully",
        success: true,
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error, "Something Went Wrong");
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}


export const sendVerificationCode = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred email service
      auth: {
        user: process.env.EMAIL_NEXTCONNECTHUB,
        pass: process.env.PASSWORD_NEXTCONNECTHUB,
      },
    });

    const mailOptions = {
      from: `"Anyonecanconnect Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your Verification Code - NextConnect',
      html: `
        <h2>Hello 👋</h2>
        <p>Your verification code is:</p>
        <h1 style="color:#2563eb;">${otp}</h1>
        <p>This code will expire in 24 hours.</p>
        <br />
        <p>If you didn't request this, please ignore this email.</p>
        <p>— NextConnect Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification code email:', error);
    throw new Error('Email sending failed');
  }
};

