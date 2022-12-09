import "./App.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserContext } from "./context/User";
import Reviews from "./components/Reviews";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Review from "./components/Review";
import Comment from "./components/Comment";
import Categories from "./components/Categories";
import Error from "./components/Error";

function App() {
  const [user, setUser] = useState(null);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  if (!user) {
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <Auth></Auth>
      </UserContext.Provider>
    );
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <nav id="nav">
          <Header user={user} />
          <Link to="/" id="reviews-link">
            Reviews
          </Link>
          <Categories setSort={setSort} setOrder={setOrder} />
        </nav>
        <Routes>
          <Route path="*" element={<Error error={"Path not found"} />} />
          <Route path="/" element={<Reviews sort={sort} order={order} />} />
          <Route path="/reviews/:review" element={<Review />} />
          <Route path="/reviews/:review_id/comments" element={<Comment />} />
          <Route
            path="/categories/:category"
            element={<Reviews sort={sort} order={order} />}
          />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
