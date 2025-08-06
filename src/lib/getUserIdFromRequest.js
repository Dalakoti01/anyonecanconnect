import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserIdFromRequest(req) {
  // 1. Try NextAuth token (Google login)
  const sessionToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (sessionToken?._id) return sessionToken._id;

  // 2. Try custom JWT (manual login)
  const cookieStore =  await cookies();
  const customToken =  cookieStore.get("token")?.value;

  if (customToken) {
    try {
      const decoded = jwt.verify(customToken, process.env.SECRET_KEY);
      return decoded.userId;
    } catch (err) {
      console.error("Invalid custom JWT", err);
    }
  }

  // 3. Not authenticated
  return null;
}
