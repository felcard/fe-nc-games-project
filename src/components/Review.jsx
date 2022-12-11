import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getComments, getReview, updateVotes } from "../tools/api";
import Loading from "./Loading";
import { deleteComment } from "../tools/api";
import Error from "./Error";

export default function Review() {
  const [reviewUnit, setReviewUnit] = useState([]);
  const { review } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState();
  const [vis, setVis] = useState("in-line");
  const [deleteMsg, setDeleteMsg] = useState("none");

  const navigate = useNavigate();

  let user = "";
  if (!sessionStorage.user) {
    navigate("/");
  } else {
    user = JSON.parse(sessionStorage.user).username;
  }
  useEffect(() => {
    getReview(review)
      .then((res) => {
        setReviewUnit(res[0]);
        setVotes(reviewUnit.votes);
        setLoading(false);
      })
      .catch((err) => {
        setReviewUnit(err.response.data);
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

  const handleDelete = (id, author) => {
    if (user !== author) {
      alert("it is not right to try and delete other people's comments!! :)");
    } else {
      deleteComment(id).then((res) => {
        getComments(review).then((res) => {
          setDeleteMsg("flex");
          setTimeout(() => {
            setComments(res);
            setDeleteMsg("none");
          }, 2000);
        });
      });
    }
  };

  if (reviewUnit.msg) {
    return <Error error={`Review ${reviewUnit.msg}`} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="review--review-unit">
      <div id="delete-message" style={{ display: `${deleteMsg}` }}>
        YOR MESSAGE WAS DELETED..FOREVER!
      </div>
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
          <span id="review--votes-color">{votes}</span>{" "}
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
              <button
                onClick={() => handleDelete(comment.comment_id, comment.author)}
                className="comment--delete-button"
              >
                delete
              </button>
            </div>
          );
        })}
      </footer>
    </div>
  );
}
