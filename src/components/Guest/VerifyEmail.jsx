"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


export default function OTPVerificationPage() {
  const searchParams = useSearchParams();
const email = searchParams.get("email");
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Timer for resend functionality
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key down events
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6 && /^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      const res = await axios.post(
        `/api/user/verify-user?email=${encodeURIComponent(email)}`,
        {
          code: otpValue,
        }
      );
      if (res.data.success) {
        setSuccess(true);
        toast.success(res.data.message);
        router.push("/freelancer");
      }

      // For demo purposes, accept '123456' as valid OTP
    } catch (err) {
      setError("Verification failed. Please try again.");
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setCanResend(false);
    setResendTimer(60);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("OTP resent successfully");
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Email Verified!
          </h1>
          <p className="text-gray-600 mb-6">
            Your account has been successfully verified. Redirecting to your
            dashboard...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Sign Up
          </button>

          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-indigo-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Check Your Email
          </h1>
          <p className="text-gray-600 leading-relaxed">
            We've sent a 6-digit verification code to
            <br />
            <span className="font-semibold text-gray-900">
              your-email@example.com
            </span>
          </p>
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <div className="flex justify-center space-x-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg transition-all duration-200 ${
                  error
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                } focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center justify-center text-red-600 text-sm mb-4">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerifyOTP}
          disabled={isLoading || otp.join("").length !== 6}
          className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 mb-6"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Verifying...
            </div>
          ) : (
            "Verify Code"
          )}
        </button>

        {/* Resend Section */}
        <div className="text-center text-sm text-gray-600">
          <p className="mb-2">Didn't receive the code?</p>
          {canResend ? (
            <button
              onClick={handleResendOTP}
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
            >
              Resend Code
            </button>
          ) : (
            <p className="text-gray-500">Resend in {resendTimer} seconds</p>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Check your spam folder if you don't see the email.
            <br />
            For help, contact{" "}
            <a
              href="mailto:support@example.com"
              className="text-indigo-600 hover:text-indigo-800"
            >
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
