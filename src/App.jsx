import React, { useState } from "react";
import "./App.css";

const App = () => {

  const[userName , setuserName]=useState("");
  const[userMail , setuserMail]=useState("");
  const[userPassword , setuserPassword]=useState("");
 
  const handleSubmit = (e) => {
    console.log("submitted");
    e.preventDefault();
    // console.log(userName);
    // console.log(userMail);
    // console.log(userPassword);
    const data = {
      userName,
      userMail,
      userPassword
    }
    console.log(data);
    localStorage.setItem("data" , JSON.stringify(data));
  }


  return (
    <div>
      <div className="heading">
        <h2> Not have account? <br></br>Register Now</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input className="input" type="text" placeholder="Enter Name" value={userName} onChange={(e) => setuserName(e.target.value)} />
        <input className="input" type="mail" placeholder="Enter Email"  value={userMail} onChange={(e) => setuserMail(e.target.value)}/>
        <input className="input" type="password" placeholder="Enter Password"  value={userPassword} onChange={(e) => setuserPassword(e.target.value)} />
        <button className="submit" type="submit">
          Signup
        </button>
       
      </form>
    </div>
  );
};

export default App;
