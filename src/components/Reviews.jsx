import { useEffect, useState } from "react";
import { getReviews } from "../tools/api";
import ReviewUnit from "./ReviewUnit";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

export default function Reviews({ sort, order }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  useEffect(() => {
    setLoading(true);
    getReviews(sort, order, category)
      .then((res) => {
        setReviews(res);
        setLoading(false);
      })
      .catch((err) => {
        setReviews(err.response.data);
      });
  }, [category, order, sort]);

  if (reviews.msg) {
    return <Error error={`Category ${reviews.msg}`} />;
  }

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
