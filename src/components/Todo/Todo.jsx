import React, { useState, useEffect } from "react";
import "./Todo.css";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/register");
  };

  const [userInput, setUserInput] = useState("");
  const [editInput, setEditInput] = useState(""); // Separate state for edit input
  const [tasks, setTasks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [date, setDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    ).filter((task) => task.currentUserMail === currentUser.userMail);
    setTasks(storedTasks);
  }, [currentUser.userMail]);

  const handleEditClick = (taskId) => {
    setIsEditing(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditInput(taskToEdit.userInput);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleSave = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, userInput: editInput };
      }
      return task;
    });

    setTasks(updatedTasks);
    setIsEditing(null);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    const newTask = {
      id: uuidv4(),
      currentUserMail: currentUser.userMail,
      userInput,
      date: date.toISOString().split("T")[0], // Format the date to a string
      isChecked: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setUserInput("");
    setDate(new Date());
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDateChange = (e) => {
    setDate(new Date(e.target.value));
  };

  return (
    <div>
      <div className="todo">
        <nav>
          <h3>Welcome {currentUser.userName}</h3>
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
            onChange={handleInputChange}
          />
          <input
            type="date"
            className="dateview"
            value={date.toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
          <button className="add" onClick={addTask}>
            +
          </button>
        </div>

        <div className="tasks">
          {tasks.map((task, index) => (
            <div
              className="tasks-box"
              key={task.id}
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
                    value={editInput}
                    onChange={handleEditInputChange}
                  />
                  <FaCheck
                    onClick={() => handleSave(task.id)}
                    className="facheck"
                  />
                </div>
              ) : (
                <div className="task-box">{task.userInput}</div>
              )}
              <div className="editdlt">
                <div className="edit">
                  <FaEdit onClick={() => handleEditClick(task.id)} />
                </div>
                <div className="delete">
                  <FaTrash onClick={() => deleteTask(index)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
