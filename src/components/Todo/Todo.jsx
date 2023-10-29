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
  const userName=currentUser.userName;
  console.log(currentUser);


  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);
  const addTask = () => {
    const newTask = {
      currentUserMail: currentUser.userMail,
      userInput,
    };
    setTasks([...tasks, newTask]);
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
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
              //dbt - e console chythl value kittmo??
            }}
          />
          <button className="add" onClick={addTask}>
            +
          </button>
        </div>

        <div className="tasks">
          {tasks.map((task, index) => (
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
