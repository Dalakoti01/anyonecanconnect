"use client";

import React, { useEffect, useState } from "react";
import { Star, Send, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { set } from "mongoose";

const RateFreelancer = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handlePopState = (event) => {
      router.push("/client/myJobs", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const router = useRouter();
  const { selectedJob } = useSelector((store) => store.job);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [responseTime, setResponseTime] = useState(1);
  const [suggestions, setSuggestions] = useState("");

  const StarRating = ({ value, onChange, label, maxStars = 5 }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex space-x-1">
        {[...Array(maxStars)].map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i + 1)}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                i < value
                  ? "text-blue-500 fill-current"
                  : "text-gray-300 hover:text-blue-400"
              }`}
            />
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-500">
        {value > 0 ? `${value}/${maxStars}` : "No rating selected"}
      </span>
    </div>
  );

  const submitHandler = async () => {
    console.log({
      rating,
      feedback,
      responseTime,
      suggestions,
    });
    const body = {
      rating: rating,
      feedback,
      responseScore: responseTime,
      suggestions,
    };
    try {
      setLoading(true);
      const res = await axios.post(`/api/user/rateFreelancer/${id}`, body, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsSubmitted(true);
        toast.success(res.data.message);
        router.push("/client/myJobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Rate Your Freelancer
            </h1>
            <p className="text-gray-600">
              Share your experience to help improve our marketplace
            </p>
          </div>

          <div className="space-y-8">
            {/* Overall Rating */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <StarRating
                value={rating}
                onChange={setRating}
                label="Overall Rating"
                maxStars={5}
              />
            </div>

            {/* Feedback */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback for Work
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts about the quality of work delivered..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={4}
                required
              />
            </div>

            {/* Response Time Rating */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Response Time
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={responseTime || 1}
                    onChange={(e) => setResponseTime(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
                        ((responseTime || 1) - 1) * 11.11
                      }%, #E5E7EB ${
                        ((responseTime || 1) - 1) * 11.11
                      }%, #E5E7EB 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Poor</span>
                  <div className="bg-blue-100 px-3 py-1 rounded-full">
                    <span className="text-blue-700 font-medium">
                      {responseTime || 1}/10
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Excellent</span>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Suggestions for Improvements
                <span className="text-gray-500 text-xs ml-1">(Optional)</span>
              </label>
              <textarea
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                placeholder="Any suggestions to help the freelancer improve their services..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              {loading ? (
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Submitting ... <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </button>
              ) : (
                <button
                  onClick={submitHandler}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Rating</span>
                </button>
              )}
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              Your feedback helps us maintain quality standards and improve our
              platform
            </p>
          </div>
        </div>
      </div>

      {/* {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Leave this page?</h2>
            <p className="mb-4">Please complete your review before leaving this page.</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={cancelLeave}
              >
                Stay
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={confirmLeave}
              >
                Leave Anyway
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default RateFreelancer;
