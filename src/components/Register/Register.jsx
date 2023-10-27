import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [userName, setuserName] = useState("");
  const [userMail, setuserMail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    console.log(storedUsers)
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
    console.log(users);
    console.log(newUser);
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
        <div className="submitted">Form submitted successfully!Now Login.</div>
      )}

      {/* <div className="user-list">
        <h3>User List:</h3>
        {users.map((user) => (
          <li>
            Name: {user.userName}, Email: {user.userMail}, Password:{" "}
            {user.userPassword}
          </li>
        ))}
      </div> */}
      <p className="login-para">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
