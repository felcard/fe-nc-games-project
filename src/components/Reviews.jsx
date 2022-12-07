import { useEffect, useState } from "react";
import { getReviews } from "../tools/api";
import ReviewUnit from "./ReviewUnit";
import { Link } from "react-router-dom";

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
        return (
          <Link key={review.review_id} to={`/reviews/${review.review_id}`}>
            <ReviewUnit review={review} />
          </Link>
        );
      })}
    </div>
  );
}
