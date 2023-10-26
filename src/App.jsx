import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [userName, setuserName] = useState("");
  const [userMail, setuserMail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [users, setUsers] = useState([]);

  // const handleSubmit = (e) => {
  //   console.log("submitted");
  //   e.preventDefault();
  //   // console.log(userName);
  //   // console.log(userMail);
  //   // console.log(userPassword);
  //   const data = {
  //     userName,
  //     userMail,
  //     userPassword
  //   }
  //   console.log(data);
  //   localStorage.setItem("data" , JSON.stringify(data));
  //   setSubmitted(true);
  // }

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      userName,
      userMail,
      userPassword,
    };
    setUsers([...users, newUser]);
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setSubmitted(true);
  };

  return (
    <div>
      <div className="heading">
        <h2>
          {" "}
          Not have account?<br></br>Register Now
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Enter Name"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />
        <input
          className="input"
          type="mail"
          placeholder="Enter Email"
          value={userMail}
          onChange={(e) => setuserMail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Enter Password"
          value={userPassword}
          onChange={(e) => setuserPassword(e.target.value)}
        />
        <button className="submit" type="submit">
          Signup
        </button>
      </form>

      {submitted && (
        <div className="submitted">Form submitted successfully!</div>
      )}

      <div className="user-list">
        <h3>User List:</h3>

        {users.map((user) => (
          <li>
            Name: {user.userName}, Email: {user.userMail}, Password:{" "}
            {user.userPassword}
          </li>
        ))}
      </div>
    </div>
  );
};

export default App;
