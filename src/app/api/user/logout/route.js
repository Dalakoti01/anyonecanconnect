import { NextResponse } from "next/server";

export async function POST(req) {
  const response = NextResponse.json({
    message: "Logged out successfully (custom JWT)",
    success: true,
  });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
