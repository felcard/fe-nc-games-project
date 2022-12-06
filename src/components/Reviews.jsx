import { useEffect, useState } from "react";
import { getReviews } from "../tools/api";
import ReviewUnit from "./ReviewUnit";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((res) => {
      setReviews(res);
    });
  }, []);

  return (
    <div id="reviews--grid">
      {reviews.map((review) => {
        return <ReviewUnit key={review.review_id} review={review} />;
      })}
    </div>
  );
}
