import React, { useState, useEffect } from "react";

const Login = () => {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.userMail === userMail && u.userPassword === userPassword
    );

    if (user) {
      console.log(users);
      window.location.href = "/todo";
    } else {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Login here</h1>
      <form onSubmit={handleLogin}>
        <input
          className="input"
          type="email"
          placeholder="Enter Email"
          value={userMail}
          onChange={(e) => setUserMail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Enter Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;