// src/lib/db.js
import dbConnect from "@/lib/dbConnect.js";
import User from "@/models/userModels";

export async function getUserByEmail(email) {
  await dbConnect();
  return await User.findOne({ email }).populate(["profile", "skillProfile"]);
}

export async function createUserIfNotExists(userData) {
  await dbConnect();

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) return existingUser;

  console.log("➡️ Google login email:", userData.email);

  // ✅ Generate username
  const baseUsername = userData.email?.split("@")[0]?.toLowerCase();
  if (!baseUsername) {
    console.error("❌ Cannot extract username from email:", userData.email);
    throw new Error("Invalid email. Cannot create username.");
  }

  let username = baseUsername;
  let counter = 1;

  while (await User.findOne({ username })) {
    username = `${baseUsername}${counter++}`;
  }

  console.log("✅ Generated username:", username);

  const newUser = new User({
    fullName: userData.fullName,
    email: userData.email,
    username, // ✅ Set here
    googleId: userData.googleId,
    isGoogleUser: true,
    verified: true,
    profile: {
      profilePhoto: userData.profilePhoto,
    },
  });

  return await newUser.save();
}

