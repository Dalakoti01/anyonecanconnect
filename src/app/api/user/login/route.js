import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModels";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    let { identifier, password, role } = body;

    if (!role) role = "freelancer";
    if (!identifier || !password) {
      return NextResponse.json(
        { message: "Email/Username or password is missing", success: false },
        { status: 400 }
      );
    }

    // ✅ NEW: Determine whether identifier is an email or username
    const searchQuery = validator.isEmail(identifier)
      ? { email: identifier }
      : { username: identifier };

    const existingUser = await User.findOne(searchQuery);
    if (!existingUser) {
      return NextResponse.json(
        { message: "Incorrect Email or Password", success: false },
        { status: 400 }
      );
    }

    if (!existingUser.verified) {
      return NextResponse.json(
        {
          message: "Please verify your email before logging in.",
          success: false,
        },
        { status: 403 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Incorrect Email or Password", success: false },
        { status: 400 }
      );
    }

    // JWT payload
    const tokenData = {
      userId: existingUser._id,
    };

    // Token expires in 1 hour
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const user = {
      _id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      role: existingUser.role,
      username: existingUser.username,
      activeJob: existingUser.activeJobs,
      proposalsSent: existingUser.proposalsSent,
      profilePhoto: existingUser.profile?.profilePhoto,
      bio: existingUser.profile?.bio,
      languages: existingUser.profile?.languages,
      professionalTitle: existingUser.profile?.professionalTitle,
      resume: existingUser.skillProfile?.resume,
      resumeOriginalName: existingUser.skillProfile?.resumeOriginalName,
      category: existingUser.skillProfile?.category,
      subCategory: existingUser.skillProfile?.subCategory,
      hiringAssistantStatus: existingUser?.hiringAssistantStatus,
      projectCompleted: existingUser?.projectCompleted,
      subscribed: existingUser?.subscribed,
      rank: existingUser?.rank,
      yourRating: existingUser?.yourRating,
      proposalsAccepted: existingUser?.proposalsAccepted,
      connectedFreelancers: existingUser?.connectedFreelancers,
      verified: existingUser?.verified,
      mentor: existingUser?.mentor,
      money: existingUser?.money,
      profileCompletion: existingUser?.profileCompletion,
    };

    // Set token cookie with 1 hour expiry
    const cookieStore = await cookies(); // ⬅️ only this needs `await`
cookieStore.set("token", token, {
  httpOnly: true,
  sameSite: "strict",
  maxAge: 60 * 60,
});

    return NextResponse.json(
      {
        message: `Welcome Back ${user.fullName}`,
        user,
        success: true,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Login error:", error);
    return NextResponse.json(
      {
        message: "An error occurred in the login logic",
        success: false,
      },
      { status: 500 }
    );
  }
}
