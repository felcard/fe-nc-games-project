import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import { getReview } from "../tools/api";
import Loading from "./Loading";
import { postComment } from "../tools/api";

export default function Comment() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { review_id } = useParams();
  const [reviewUnit, setReviewUnit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [postedComment, setPostComment] = useState({});
  const commentObj = {};

  useEffect(() => {
    getReview(review_id).then((res) => {
      setReviewUnit(res[0]);
      setLoading(false);
    });
  }, [review_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    commentObj.username = user;
    commentObj.body = commentInput;
    if (commentInput === "") {
      alert("You haven't entered a comment");
    } else {
      postComment(review_id, commentObj).then((res) => {
        setCommentInput("");
        setPostComment(res);
        navigate(-1);
      });
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="review--review-unit">
      <main>
        <h2>Comment on this Review</h2>
        <h2>{reviewUnit.title}</h2>
        <img src={reviewUnit.review_img_url} alt={reviewUnit.title} />
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
          <span className="review--votes-color">{reviewUnit.votes}</span>
        </p>
      </main>
      <footer>
        <h3>
          Please post your comment below <span id="comments--user">{user}</span>
        </h3>
        <form id="comments--form" onSubmit={handleSubmit}>
          <label htmlFor={commentInput}>
            <textarea
              id="comments--text"
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </footer>
    </div>
  );
}
