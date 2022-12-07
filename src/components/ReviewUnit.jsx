export default function ReviewUnit({ review }) {
  return (
    <div className="reviews--review">
      <h2>{review.title}</h2>
      <img src={review.review_img_url} alt={review.title} />
      <p>Category:{review.category}</p>
      <p>Designer:{review.designer}</p>
      <p>Game Owner:{review.owner}</p>
      <p>Votes:{review.votes}</p>
    </div>
  );
}
