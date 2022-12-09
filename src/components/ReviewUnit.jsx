import { formatDate } from "../tools/utils";

export default function ReviewUnit({ review }) {
  return (
    <div className="reviews--review">
      <h2 className="review-unit--h2">{review.title}</h2>
      <img src={review.review_img_url} alt={review.title} />
      <p>
        <strong>Category: </strong>
        {review.category}
      </p>
      <p>
        <strong>Designer: </strong>
        {review.designer}
      </p>
      <p>
        <strong>Game Owner: </strong>
        {review.owner}
      </p>
      <p>
        <strong>Votes: </strong>
        {review.votes}
      </p>
      <p>
        <strong>Date: </strong>
        {formatDate(review.created_at)}
      </p>
    </div>
  );
}
