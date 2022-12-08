import { useEffect, useState } from "react";
import { getReviews } from "../tools/api";
import ReviewUnit from "./ReviewUnit";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    getReviews().then((res) => {
      if (category) {
        let revByCat = res.filter((review) => review.category === category);
        setReviews(revByCat);
      } else {
        setReviews(res);
      }
      setLoading(false);
    });
  }, [category]);

  if (loading) {
    return <Loading />;
  }

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
