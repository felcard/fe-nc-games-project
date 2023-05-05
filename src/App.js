import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Reviews from "./components/Reviews";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Review from "./components/Review";
import Comment from "./components/Comment";
import Categories from "./components/Categories";
import Error from "./components/Error";

//////////CHANGE value of user in useState to null
//////////////amend file review and comment for login fucntionality to work
////people cant make comments under Test User

function App() {
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [user, setUser] = useState("test-user");
  // useEffect(() => {
  //   if (sessionStorage.user) setUser(JSON.parse(sessionStorage.user).name);
  // }, []);

  if (!user) {
    return <Auth setUser={setUser} />;
  }
  return (
    <div className="App">
      <nav id="nav">
        <Header user={user} setUser={setUser} />
        <Link to="/" id="reviews-link">
          Reviews
        </Link>
        <Categories setSort={setSort} setOrder={setOrder} />
      </nav>
      <Routes>
        <Route path="*" element={<Error error={"URL not found"} />} />
        <Route path="/" element={<Reviews sort={sort} order={order} />} />
        <Route
          path="/reviews"
          element={<Reviews sort={sort} order={order} />}
        />
        <Route path="/reviews/:review" element={<Review />} />
        <Route path="/reviews/:review_id/comments" element={<Comment />} />
        <Route
          path="/categories/:category"
          element={<Reviews sort={sort} order={order} />}
        />
      </Routes>
    </div>
  );
}

export default App;
