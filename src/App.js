import "./App.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserContext } from "./context/User";
import Reviews from "./components/Reviews";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Review from "./components/Review";

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
        <Header user={user} />
        <nav id="nav">
          <Link to="/" id="reviews-link">
            Reviews
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Reviews></Reviews>}></Route>
          <Route path="/reviews/:review" element={<Review></Review>}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
