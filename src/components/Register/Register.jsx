import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [userName, setuserName] = useState("");
  const [userMail, setuserMail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    console.log(users + "this is users");
    console.log(newUser + "this is newUser");

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    console.log("users array setted")

    if (userName && userMail && userPassword) {
      const emailExists = users.some((user) => user.userMail === userMail);
      if (emailExists) {
        setError("Email already exists");
        setSubmitted(false);
      } else {
        //setSubmitted(true);
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        if(!currentUser){
          //localStorage.setItem('isLoggedIn','false')
          navigate("/register"); 
        }
        setSubmitted(true);
        // localStorage.setItem('isLoggedIn','true')
        navigate("/protected/todo"); 
      }
    } else {
      setError("Please fill all the fields");
      console.log(setError);
    }
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
      <p style={{ textAlign: "center", color: "red" }}>{error}</p>

      {/* {submitted && (
        <div className="submitted">Form submitted successfully!Now Login.</div>
      )} */}

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
