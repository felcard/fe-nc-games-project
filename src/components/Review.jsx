import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getComments, getReview, updateVotes } from "../tools/api";
import Loading from "./Loading";

export default function Review() {
  const [reviewUnit, setReviewUnit] = useState([]);
  const { review } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState();
  const [vis, setVis] = useState("in-line");

  useEffect(() => {
    getReview(review).then((res) => {
      setReviewUnit(res[0]);
      setVotes(reviewUnit.votes);
      setLoading(false);
    });
    getComments(review).then((res) => {
      setComments(res);
    });
  }, [review, reviewUnit.votes]);

  const handleVote = (vote) => {
    setVis("none");
    if (vote === "up") {
      setVotes((currVote) => {
        return currVote + 1;
      });
      updateVotes(review, {
        inc_votes: 1,
      }).catch((err) => {
        setVotes((currVote) => {
          return currVote - 1;
        });
        alert("Something went horribly wrong! I beg you please try again :)");
      });
    } else {
      setVotes((currVote) => {
        return currVote - 1;
      });
      updateVotes(review, {
        inc_votes: -1,
      }).catch((err) => {
        setVotes((currVote) => {
          return currVote + 1;
        });
        alert("Something went horribly wrong! I beg you please try again :)");
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="review--review-unit">
      <main>
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
          <i
            style={{ display: `${vis}` }}
            className="fa-solid fa-circle-up"
            onClick={() => handleVote("up")}
          ></i>{" "}
          <span className="review--votes-color">{votes}</span>{" "}
          <i
            style={{ display: `${vis}` }}
            className="fa-solid fa-circle-down"
            onClick={() => handleVote("down")}
          ></i>
        </p>
      </main>
      <footer id="review--footer">
        <h2>Comments</h2>{" "}
        <h3 id="review--comment">
          <Link to={`/reviews/${review}/comments`}>
            <span id="review--comment--button">Post a comment</span>
          </Link>
        </h3>
        {comments.length === 0 && (
          <div className="review--comments-box">
            This review has no comments yet...
          </div>
        )}
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id} className="review--comments-box">
              <p>{comment.body}</p>
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
