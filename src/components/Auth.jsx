import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import { getUsers } from "../tools/api";
import Loading from "./Loading";

export default function Auth() {
  const { setUser } = useContext(UserContext);
  const [inputUser, setInputUser] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setUser(loggedUser[0].username);
    } else {
      alert("Username doesn't exist. Please try again");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="auth-main">
      <form onSubmit={handleSubmit}>
        <h2>Please enter your username:</h2>
        <h3>{"( Tutors enter grumpy19 )"}</h3>
        <label htmlFor={inputUser}>
          <input
            className="auth--form-input"
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
