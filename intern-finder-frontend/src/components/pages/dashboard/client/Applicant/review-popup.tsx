"use client";

import { useState, useRef, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface ReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userImage?: string;
}

export default function ReviewPopup({
  isOpen,
  onClose,
  userName = "Jeromy bell",
  userImage = "/asian-man-headshot.png",
}: ReviewPopupProps) {
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStarClick = (starIndex: number) => {
    // Toggle star - if clicking the same star that's already selected, remove it
    if (starIndex + 1 === rating) {
      setRating(0);
    } else {
      setRating(starIndex + 1);
    }
  };

  const handleSubmit = () => {
    // Handle review submission here
    console.log({ rating, review, userName });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-primary/50 flex items-center justify-center z-50 p-4">
      <div
        ref={popupRef}
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
      >
        {/* Header with profile */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
            <Image
              width={40}
              height={40}
              src={userImage || "/placeholder.svg"}
              alt={userName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-dark text-xl font-semibold">
              Review {userName}
            </h2>
            <p className="text-light text-sm">Select your Rating</p>
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex gap-1 mb-6">
          {[0, 1, 2, 3, 4].map((starIndex) => (
            <button
              key={starIndex}
              onClick={() => handleStarClick(starIndex)}
              className="transition-colors hover:scale-110 transform duration-150"
            >
              <Star
                size={32}
                className={`${
                  starIndex < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Review Text Area */}
        <div className="mb-6">
          <Textarea
            placeholder="Tell us what you think..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-[120px] focus:border-primary focus:ring-primary text-dark placeholder:text-light"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="none"
            onClick={onClose}
            className="flex-1 text-light border bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
          >
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
}
