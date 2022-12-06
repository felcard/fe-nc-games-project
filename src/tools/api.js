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
