import React, { useState, useEffect } from "react";
import "./Todo.css";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid"; // You need to install uuid package

const demo = () => {
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

  //for editing
  const [isEditing, setIsEditing] = useState(false);

  // Assuming each task has a unique id now
  const handleEditClick = (taskId) => {
    setIsEditing(taskId);
    // Find the task to edit and set its userInput to the state
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setuserInput(taskToEdit.userInput);
  };

  const handleInputChange = (e) => {
    setuserInput(e.target.value);
  };

  const handleSave = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, userInput };
      }
      return task;
    });

    setTasks(updatedTasks);
    setIsEditing(null); // Reset editing state
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setuserInput(""); // Optionally clear the userInput if needed
  };

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
      id: uuidv4(),
      currentUserMail: currentUser.userMail,
      userInput,
      date: date,
      isChecked: false,
      editing: false, // Include the specific date for the task
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

        <div className="tasks">
          {userTasks.map((task, index) => (
            <div
              className="tasks-box"
              key={index}
              style={{
                textDecoration: task.isChecked ? "line-through" : "none",
                opacity: task.isChecked ? 0.5 : 1,
              }}
            >
              <input
                type="checkbox"
                checked={task.isChecked}
                onChange={() => handleCheckboxChange(index)}
              />

              <div>{task.date}</div>

              {isEditing === task.id ? (
                <div className="taskeditinput">
                  <input
                    type="text"
                    value={task.userInput}
                    onChange={handleInputChange}
                  />
                  <FaCheck
                    onClick={() => handleSave(task.id)}
                    className="facheck"
                  />
                </div>
              ) : (
                <div className="task-box">{task.userInput}</div>
              )}

              {/* <div className="task-box">{task.userInput}</div> */}
              <FaEdit onClick={() => handleEditClick(task.id)} />

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

export default demo;
