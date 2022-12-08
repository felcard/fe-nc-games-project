import "./App.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserContext } from "./context/User";
import Reviews from "./components/Reviews";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Review from "./components/Review";
import Comment from "./components/Comment";

function App() {
  const [user, setUser] = useState(null);
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
        </nav>
        <Routes>
          <Route path="/" element={<Reviews />} />
          <Route path="/reviews/:review" element={<Review />} />
          <Route path="/reviews/:review_id/comments" element={<Comment />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
