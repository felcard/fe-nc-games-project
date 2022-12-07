import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://helpful-fox-leather-jacket.cyclic.app/api",
});

export const getReviews = () => {
  return gamesApi.get("/reviews").then((res) => {
    return res.data.reviews;
  });
};

export const getUsers = () => {
  return gamesApi.get("/users").then((res) => {
    return res.data.users;
  });
};

export const getReview = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}`).then((res) => {
    return res.data.review;
  });
};

export const getComments = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const updateVotes = (review_id, vote) => {
  return gamesApi.patch(`/reviews/${review_id}`, vote).then((res) => {
    return res.data.review;
  });
};
