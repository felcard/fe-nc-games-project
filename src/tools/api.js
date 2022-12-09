import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://helpful-fox-leather-jacket.cyclic.app/api",
});

export const getReviews = (category) => {
  return gamesApi
    .get("/reviews", {
      params: {
        category: category,
      },
    })
    .then((res) => {
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

export const postComment = (review_id, comment) => {
  return gamesApi
    .post(`/reviews/${review_id}/comments`, comment)
    .then((res) => {
      return res.data.insertedComment;
    });
};

export const getCategories = () => {
  return gamesApi.get("/categories").then((res) => {
    return res.data.categories;
  });
};
