import { useEffect, useState } from "react";
import { getUsers } from "../tools/api";
import Loading from "./Loading";

export default function Auth({ setUser }) {
  const [inputUser, setInputUser] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertStyle, setAlertStyle] = useState("none");

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
      setLoading(false);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedUser = users.filter((user) => user.username === inputUser);
    if (loggedUser.length !== 0) {
      sessionStorage.setItem("user", JSON.stringify(loggedUser[0]));
      setUser(loggedUser[0].name);
    } else {
      setAlertStyle("flex");
      setTimeout(() => {
        setAlertStyle("none");
      }, 2000);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="auth-main">
      <div className="alert-message" style={{ display: `${alertStyle}` }}>
        Username doesn't exist. Please try again
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Please enter your username:</h2>
        <label htmlFor={inputUser}>
          <input
            value={inputUser}
            onChange={(event) => setInputUser(event.target.value)}
            id="auth--input"
          />
        </label>
        <button type="submit" className="auth--form-button">
          Submit
        </button>
      </form>
    </main>
  );
}
