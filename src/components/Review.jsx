import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReview } from "../tools/api";

export default function Review() {
  const [reviewUnit, setReviewUnit] = useState([]);
  const { review } = useParams();
  useEffect(() => {
    getReview(review).then((res) => {
      setReviewUnit(res[0]);
    });
  }, [review]);
  return (
    <main className="review--review-unit">
      <h2>{reviewUnit.title}</h2>
      <img src={reviewUnit.review_img_url} alt={review.title} />
      <p>Category:{reviewUnit.category}</p>
      <p>Designer:{reviewUnit.designer}</p>
      <p>Owner:{reviewUnit.owner}</p>
      <p id="review--txt">Review:{reviewUnit.review_body}</p>
      <p>Votes:{reviewUnit.votes}</p>
    </main>
  );
}
