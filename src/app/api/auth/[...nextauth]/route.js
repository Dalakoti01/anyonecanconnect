import { createUserIfNotExists, getUserByEmail } from "@/lib/db";
import NextAuthImport from "next-auth";
const NextAuth = NextAuthImport.default || NextAuthImport;
import GoogleProviderImport from "next-auth/providers/google";
const GoogleProvider = GoogleProviderImport.default || GoogleProviderImport;

console.log("GoogleProvider type:", typeof GoogleProvider);


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const existingUser = await getUserByEmail(user.email);

      if (!existingUser) {
        await createUserIfNotExists({
          email: user.email,
          fullName: user.name,
          profilePhoto: user.image || profile?.picture || null,
          googleId: profile.sub || account.providerAccountId, // ✅ pass this explicitly
        });
        user.isNewUser = true;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.isNewUser) {
        token.isNewUser = true;
      }

      const existingUser = await getUserByEmail(token.email);
      if (existingUser) {
        token._id = existingUser._id;
        token.role = existingUser.role;
        token.username = existingUser.username;
        token.fullName = existingUser.fullName;
        token.profilePhoto = existingUser.profile?.profilePhoto;

        // Add full profile fields
        token.bio = existingUser.profile?.bio ?? "";
        token.languages = existingUser.profile?.languages ?? [];
        token.professionalTitle = existingUser.profile?.professionalTitle ?? "";
        token.category = existingUser.skillProfile?.category ?? "";
        token.subCategory = existingUser.skillProfile?.subCategory ?? [];
        token.uspSkill = existingUser.skillProfile?.uspSkill ?? [];
        token.profileCompletion = existingUser.profileCompletion ?? 0;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        email: session.user.email,
        _id: token._id,
        username: token.username,
        fullName: token.fullName,
        role: token.role ?? null,
        profilePhoto: token.profilePhoto,
        isNewUser: token.isNewUser ?? false,

        // Pass all profile-related fields
        bio: token.bio ?? "",
        languages: token.languages ?? [],
        professionalTitle: token.professionalTitle ?? "",
        category: token.category ?? "",
        subCategory: token.subCategory ?? [],
        uspSkill: token.uspSkill ?? [],
        profileCompletion: token.profileCompletion ?? 0,
      };

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
