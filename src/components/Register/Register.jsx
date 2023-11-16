import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
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

    console.log("users array setted");

    if (userName && userMail && userPassword) {
      const emailExists = users.some((user) => user.userMail === userMail);
      if (emailExists) {
        setError("Email already exists");
        setSubmitted(false);
      } else {
        //setSubmitted(true);
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        if (!currentUser) {
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
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>
          Not have an account ?<br></br><br></br>Register Now
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Name"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />
        <input
          className={styles.input}
          type="mail"
          placeholder="Enter Email"
          value={userMail}
          onChange={(e) => setuserMail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Enter Password"
          value={userPassword}
          onChange={(e) => setuserPassword(e.target.value)}
        />
        <button className={styles.submit} type="submit">
          Signup
        </button>
      </form>
      <p style={{ textAlign: "center", color: "red" , padding:"1rem"}}>{error}</p>

      <p className={styles.loginpara}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
