import { StarRatingProps } from "@/types";
import { Star } from "lucide-react";

export function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
    return (
        <div className="flex gap-1">
            {[...Array(maxRating)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${
                        i < rating
                            ? "fill-purple-600 stroke-purple-600"
                            : "fill-gray-200 stroke-gray-200"
                    }`}
                />
            ))}
        </div>
    );
}
