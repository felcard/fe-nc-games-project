import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReview } from "../tools/api";
import Loading from "./Loading";
import { postComment } from "../tools/api";

export default function Comment() {
  const navigate = useNavigate();
  const { review_id } = useParams();
  const [reviewUnit, setReviewUnit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const commentObj = {};
  const [alertStyle, setAlertStyle] = useState("none");
  const [alertMessage, setAlertMessage] = useState("");

  let user = "";
  if (!sessionStorage.user) {
    navigate("/");
  } else {
    user = JSON.parse(sessionStorage.user).username;
  }

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
      setAlertStyle("flex");
      setAlertMessage("You haven't entered a comment");
      setTimeout(() => {
        setAlertStyle("none");
      }, 2000);
    } else {
      postComment(review_id, commentObj)
        .then((res) => {
          setCommentInput("");
          navigate(-1);
        })
        .catch(() => {
          setAlertStyle("flex");
          setAlertMessage(
            "We are really sorry but your precious comment was not posted. Please try again"
          );
          setTimeout(() => {
            setAlertStyle("none");
          }, 3000);
        });
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="review--review-unit">
      <main>
        <div className="alert-message" style={{ display: `${alertStyle}` }}>
          {alertMessage}
        </div>
        <h2 id="comment--title">Comment on this Review</h2>
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
          <span id="comments--user">{user}</span>
          {"-->"} please post your comment below
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
