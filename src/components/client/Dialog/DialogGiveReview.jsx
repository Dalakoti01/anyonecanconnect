"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

const DialogGiveReview = ({open,setOpen}) => {
      const {selectedJob} = useSelector(store => store.job)
      const [rating, setRating] = useState(0);
      const [reviewText, setReviewText] = useState("");

    const handleReviewSubmit = async () => {
        try {
          // Submit review API call (adjust URL and payload as needed)
          const res = await axios.post(
            `/api/user/giveReview/${selectedJob?._id}`,
            {
              rating,
              feedback: reviewText,
            },
            { withCredentials: true }
          );
          if (res.data.success) {
            toast.success("Review submitted successfully!");
            setShowReviewDialog(false);
            setRating(0);
            setReviewText("");
            setOpen(false)
          }
        } catch (error) {
          console.log("Error submitting review", error);
        }
      };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Leave a Review</h2>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="p-2 border rounded resize-none min-h-[100px]"
        />

        <div className="flex justify-end">
          <Button
            onClick={handleReviewSubmit}
            className="bg-green-600 text-white hover:bg-green-700"
            disabled={rating === 0 || reviewText.trim() === ""}
          >
            Submit Review
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default DialogGiveReview