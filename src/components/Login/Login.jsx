import React, { useState, useEffect} from "react";
// import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const[error,setError]=useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
    console.log(storedUsers);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.userMail === userMail && u.userPassword === userPassword
    );

    if (user&&userMail&&userPassword){
      console.log(users);
      navigate('/todo');
    } else {
      //alert("Login failed");
      setError("Invalid credentials");
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
        <p style={{ color: "red" , textAlign:"center"}}>{error}</p>
      </form>
    </div>
  );
};

export default Login;
