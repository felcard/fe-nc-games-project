import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments, getReview } from "../tools/api";
import Loading from "./Loading";

export default function Review() {
  const [reviewUnit, setReviewUnit] = useState([]);
  const { review } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getReview(review).then((res) => {
      setReviewUnit(res[0]);
    });
    getComments(review).then((res) => {
      setComments(res);
      setLoading(false);
    });
  }, [review]);

  const handleVote = () => {
    console.log("hi");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="review--review-unit">
      <main>
        <h2>{reviewUnit.title}</h2>
        <img src={reviewUnit.review_img_url} alt={review.title} />
        <div className="review--headings">
          <p>
            <strong>Category: </strong>
            {reviewUnit.category}
          </p>
          <p>
            <strong>Designer: </strong>
            {reviewUnit.designer}
          </p>
          <p>
            <strong>Game Owner: </strong>
            {reviewUnit.owner}
          </p>
        </div>
        <p id="review--txt">Review: {reviewUnit.review_body}</p>
        <p id="review--votes">
          Review Votes:{" "}
          <i class="fa-solid fa-circle-up" onClick={handleVote}></i>{" "}
          <span className="review--votes-color">{reviewUnit.votes}</span>{" "}
          <i class="fa-solid fa-circle-down"></i>
        </p>
      </main>
      <footer id="review--footer">
        <h2>Comments</h2>
        {comments.map((comment) => {
          return (
            <div id="review--comments-box">
              <p key={comment.comment_id}>{comment.body}</p>
              <p>
                <strong>Author: </strong>
                {comment.author}
              </p>
              <p>
                <strong>Votes: </strong>
                {comment.votes}
              </p>
            </div>
          );
        })}
      </footer>
    </div>
  );
}
