import React, { useState, useEffect } from "react";
import "./Todo.css";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Todo = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/register");
  };
  const [userInput, setuserInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userName = currentUser.userName;
  const userTasks = tasks.filter(
    (task) => task.currentUserMail === currentUser.userMail
  );
  const [date, setDate] = useState(new Date());

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, [currentUser.userMail]); // Only trigger when currentUser.userMail changes

  const addTask = () => {
    const newTask = {
      currentUserMail: currentUser.userMail,
      userInput,
      date: date,
      isChecked:false, // Include the specific date for the task
    };

    const updatedTask = [...tasks, newTask];
    setTasks(updatedTask);
    //[task1]
    console.log(newTask);

    localStorage.setItem("tasks", JSON.stringify(updatedTask));
    console.log(tasks);
    setuserInput("");
    setDate(new Date());
  };

  // const deleteTask=()=>{
  //   console.log("task deleetd")
  // }

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDateChange = (e) => {
    // Update the date state with the new value
    setDate(e.target.value);
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
          <input
            type="date"
            className="dateview"
            value={date}
            onChange={handleDateChange}
          />
          <button className="add" onClick={addTask}>
            +
          </button>
        </div>

        <div
          className="tasks"
        >
          {userTasks.map((task, index) => (
            <div className="tasks-box" key={index} style={{
              textDecoration: task.isChecked ? 'line-through' : 'none',
              opacity: task.isChecked ? 0.5 : 1,
            }}>
              <input
                type="checkbox"
                checked={task.isChecked}
                onChange={() => handleCheckboxChange(index)}
              />
              {task.userInput}
              <div>{task.date}</div>
              {/* Display the specific date for each task */}
              <div className="delete">
                <FaTrash onClick={() => deleteTask(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
