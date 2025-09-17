import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "default";
}

export function StarRating({
  rating,
  maxRating = 1,
  size = "default",
}: StarRatingProps) {
  const stars = [];
  const starSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= rating;

    stars.push(
      <Star
        key={i}
        className={`${starSize} ${
          isFilled
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    );
  }

  return <div className="flex items-center gap-1">{stars}</div>;
}
