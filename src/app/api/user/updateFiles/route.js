// app/api/update-files/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModels";
import getUserIdFromRequest from "@/lib/getUserIdFromRequest";
import { parseForm } from "@/lib/parseForm";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

// Disable body parsing so we can handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Convert Web Request (what Next.js gives) to Node.js Readable stream
function toNodeReadable(webRequest) {
  const reader = webRequest.body.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) return this.push(null);
      this.push(value);
    },
  });
}

export async function POST(req) {
  await dbConnect();

  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  const existingUser = await User.findById(userId);
  if (!existingUser) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  try {
    const nodeReq = toNodeReadable(req); // ✅ convert correctly
    nodeReq.headers = Object.fromEntries(req.headers); // ✅ form-data requires headers

    const { files } = await parseForm(nodeReq); // ✅ works now
    console.log("Parsed files:", files);

    // Profile Photo Upload
    if (files.profilePhoto) {
      const file = Array.isArray(files.profilePhoto)
        ? files.profilePhoto[0]
        : files.profilePhoto;

      const profileUpload = await cloudinary.uploader.upload(file.filepath, {
        resource_type: "image",
        public_id: `profile_photo/${Date.now()}`,
        access_mode: "public",
      });

      existingUser.profile.profilePhoto = profileUpload.secure_url;
      existingUser.profileCompletion += 15;
    }

    // Resume Upload
    if (files.resume) {
      const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;
      const resumeUpload = await cloudinary.uploader.upload(file.filepath, {
        resource_type: "auto",
        public_id: `resume/${Date.now()}`,
        access_mode: "public",
      });

      existingUser.skillProfile.resume = resumeUpload.secure_url;
      existingUser.skillProfile.resumeOriginalName = file.originalFilename;
      existingUser.profileCompletion += 10;
    }

    if (existingUser.profileCompletion > 100) {
      existingUser.profileCompletion = 100;
    }

    await existingUser.save();

    const user = {
      _id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      role: existingUser.role,
      username: existingUser.username,
      profilePhoto: existingUser.profile?.profilePhoto,
      resume: existingUser.skillProfile?.resume,
      resumeOriginalName: existingUser.skillProfile?.resumeOriginalName,
      profileCompletion: existingUser?.profileCompletion,
      // Add others as needed...
    };

    return NextResponse.json({
      success: true,
      message: "Files uploaded successfully",
      user,
    });
  } catch (err) {
    console.error("File upload error:", err);
    return NextResponse.json(
      { success: false, message: "Error uploading files" },
      { status: 500 }
    );
  }
}
