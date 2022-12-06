import { useEffect, useState } from "react";
import { getReviews } from "../tools/api";
import ReviewUnit from "./ReviewUnit";
import Categories from "./Categories";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((res) => {
      setReviews(res.reviews);
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
