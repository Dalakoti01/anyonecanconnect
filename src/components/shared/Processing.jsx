// app/processing/page.jsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ProcessingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (!session.user.role) {
        router.replace("/select-role");
      } else if (session.user.role === "freelancer") {
        router.replace("/freelancer/freelancersHome");
      } else if (session.user.role === "client") {
        router.replace("/client/dashboard");
      }
    }
  }, [status, session]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
      <h2 className="text-xl font-semibold text-gray-700">
        Processing your account...
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Hang tight while we redirect you to your dashboard
      </p>
    </div>
  );
}
