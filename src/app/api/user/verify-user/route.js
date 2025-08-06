import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    console.log("db connect from controller");
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const { code } = await request.json();

    if (!email || !code) {
      console.log(email,"email");
      console.log(code,"code");
      
      
      return NextResponse.json(
        { message: "Email and code are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const userOtp = user.verification?.otp;
    const otpExpiry = user.verification?.validity;

    if (!userOtp || !otpExpiry) {
      return NextResponse.json(
        { message: "OTP not generated or already verified" },
        { status: 400 }
      );
    }

    const now = new Date();

    if (otpExpiry < now) {
      return NextResponse.json(
        { message: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    if (userOtp !== code) {
      return NextResponse.json(
        { message: "Invalid OTP code." },
        { status: 400 }
      );
    }

    // All checks passed — verify the user
    user.verified = true;
    user.verification.otp = undefined;
    user.verification.validity = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
