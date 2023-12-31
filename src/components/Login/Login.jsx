import React, { useState, useEffect } from "react";
// import { Redirect } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import styles from "./Login.module.css";

const Login = () => {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.userMail === userMail && u.userPassword === userPassword
    );

    if (user && userMail && userPassword) {
      console.log(user);
      // localStorage.setItem("currentUser", JSON.stringify(user));
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/protected/todo");
        localStorage.setItem("isLoggedIn", "true");
      } else {
        navigate("/register");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1 style={{ textAlign: "center" }}>Login here</h1>
      </div>

      <form onSubmit={handleLogin}>
        <input
          className={styles.input}
          type="email"
          placeholder="Enter Email"
          value={userMail}
          onChange={(e) => setUserMail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Enter Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button className={styles.login}>Login</button>
        <p
          className={styles.error}
          style={{ color: "red", textAlign: "center",padding:"0.5rem" }}
        >
          {error}
        </p>
        <p className={styles.regpara} style={{ textAlign: "center" }}>
          Didn't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
