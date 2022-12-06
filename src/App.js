import "./App.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserContext } from "./context/User";
import Reviews from "./components/Reviews";
import Auth from "./components/Auth";

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
        <h1>NC Games Ratings</h1>
        <h3>Wellcome Back: {user}</h3>
        <nav id="nav">
          <Link to="/">Reviews</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Reviews></Reviews>}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
