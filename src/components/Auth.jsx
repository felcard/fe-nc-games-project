import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import { getUsers } from "../tools/api";

export default function Auth() {
  const { setUser } = useContext(UserContext);
  const [inputUser, setInputUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Please enter your username:</h2>
        <label>
          <input
            value={inputUser}
            onChange={(event) => setInputUser(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
