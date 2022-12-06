import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://helpful-fox-leather-jacket.cyclic.app/api",
});

export const getReviews = () => {
  return gamesApi.get("/reviews").then((res) => {
    return res.data;
  });
};

export const getUSers = () => {
  return gamesApi.get("/users").then((res) => {
    return res.data.users;
  });
};

export const getCategories = () => {
  return gamesApi.get("/categories").then((res) => {
    return res.data.categories;
  });
};
