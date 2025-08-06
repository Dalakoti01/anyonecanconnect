import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModels";

export async function POST(request) {
  await dbConnect();

  try {
    const { userId, role } = await request.json();

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

    if (!user) {
      return NextResponse.json(
        { message: "User Not Found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User Role Updated", success: true, user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update role error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
