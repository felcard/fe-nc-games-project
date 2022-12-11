import { useState } from "react";

export default function Header({ user, setUser }) {
  const [btnHover, setBtnHover] = useState("rgb(185, 117, 71)");

  const handleHover = () => {
    setBtnHover((currHover) => {
      return currHover === "rgb(185, 117, 71)"
        ? "rgb(146, 115, 150)"
        : "rgb(185, 117, 71)";
    });
  };
  const handleLogOut = () => {
    sessionStorage.setItem("user", "");
    setUser(null);
  };

  return (
    <header>
      <h1 className="header--title">NC Games Rating</h1>
      <h3 className="header--wellcome">
        Wellcome Back: <span id="header--user">{user}</span>
      </h3>
      <div className="header--farewell">
        <button
          id="header--farewell-btn"
          style={{ background: `${btnHover}` }}
          onClick={handleLogOut}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          Log Out
        </button>
      </div>
    </header>
  );
}
