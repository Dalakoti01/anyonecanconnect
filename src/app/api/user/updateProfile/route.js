import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/userModels";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  await dbConnect();

  let userId = null;

  // Try from NextAuth session
  const sessionToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (sessionToken?._id) {
    userId = sessionToken._id;
  } else {
    // Try from custom JWT
    const cookieStore = cookies();
    const customToken = cookieStore.get("token")?.value;
    if (customToken) {
      try {
        const decoded = jwt.verify(customToken, process.env.SECRET_KEY);
        userId = decoded.userId;
      } catch (err) {
        console.error("Invalid custom JWT", err);
      }
    }
  }

  if (!userId) {
    return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 });
  }

  try {
    const {
      email,
      fullName,
      bio,
      languages,
      professionalTitle,
      category,
      subCategory,
      uspSkill,
    } = await req.json();

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 400 });
    }

    // Update fields
    if (fullName) existingUser.fullName = fullName;
    if (email) existingUser.email = email;

    // Bio
    if (typeof bio !== "undefined") {
      const prev = existingUser.profile.bio;
      existingUser.profile.bio = bio;
      if (bio && !prev) {
        existingUser.profileCompletion += 10;
      }
    }

    // Category
    if (category) existingUser.skillProfile.category = category;

    // Professional Title
    if (typeof professionalTitle !== "undefined") {
      const prev = existingUser.profile.professionalTitle;
      existingUser.profile.professionalTitle = professionalTitle;
      if (professionalTitle && !prev) {
        existingUser.profileCompletion += 10;
      }
    }

    // Languages
    if (typeof languages !== "undefined") {
      const prev = existingUser.profile.languages;
      let newLangs = Array.isArray(languages)
        ? languages
        : typeof languages === "string" && languages.trim() !== ""
        ? languages.split(",").map((l) => l.trim())
        : [];
      existingUser.profile.languages = newLangs;
      if (newLangs.length > 0 && (!prev || prev.length === 0)) {
        existingUser.profileCompletion += 10;
      }
    }

    // SubCategory (Skills)
    if (typeof subCategory !== "undefined") {
      const prev = existingUser.skillProfile.subCategory;
      let newSkills = Array.isArray(subCategory)
        ? subCategory
        : typeof subCategory === "string" && subCategory.trim() !== ""
        ? subCategory.split(",").map((s) => s.trim())
        : [];
      existingUser.skillProfile.subCategory = newSkills;
      if (newSkills.length > 0 && (!prev || prev.length === 0)) {
        existingUser.profileCompletion += 10;
      }
    }

    // USP Skill
    if (typeof uspSkill !== "undefined") {
      const prev = existingUser.skillProfile.uspSkill;
      let newUsp = Array.isArray(uspSkill)
        ? uspSkill.slice(0, 2)
        : typeof uspSkill === "string" && uspSkill.trim() !== ""
        ? uspSkill.split(",").map((s) => s.trim()).slice(0, 2)
        : [];
      existingUser.skillProfile.uspSkill = newUsp;
      if (newUsp.length > 0 && (!prev || prev.length === 0)) {
        existingUser.profileCompletion += 10;
      }
    }

    // Cap profileCompletion at 100
    if (existingUser.profileCompletion > 100) {
      existingUser.profileCompletion = 100;
    }

    await existingUser.save();

    return NextResponse.json({
      success: true,
      message: "Profile details updated successfully",
      user: {
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
      },
    });
  } catch (error) {
    console.error("Error updating profile details:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while updating profile details" },
      { status: 500 }
    );
  }
}
