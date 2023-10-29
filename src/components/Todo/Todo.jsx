import React, { useState, useEffect } from "react";
import "./Todo.css";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/register");
  };
  const [userInput, setuserInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userName = currentUser.userName;
  const userTasks=tasks.filter((task)=>task.currentUserMail===currentUser.userMail);
  

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, [currentUser.userMail]); // Only trigger when currentUser.userMail changes



  const addTask = () => {
    const newTask = {
      currentUserMail: currentUser.userMail,
      userInput,
    };

    
    const updatedTask=([...tasks, newTask]);
    setTasks(updatedTask);
    //[task1]
    console.log(newTask);

    
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
    console.log(tasks)
    setuserInput("");

  };

  return (
    <div>
      <div className="todo">
        <nav>
          <h3>Welcome {userName}</h3>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </nav>

        <div className="todo-heading">
          <h2>To-Do List</h2>
        </div>

        <div className="todo-form">
          <input
            className="todo-input"
            type="text"
            placeholder="Enter task"
            value={userInput}
            onChange={(e) => {
              setuserInput(e.target.value);
            }}
          />
          <button className="add" onClick={addTask}>
            +
          </button>
        </div>

        <div className="tasks">
          {userTasks.map((task, index) => (
            <div className="tasks-box" key={index}>
              {task.userInput}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
