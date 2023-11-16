import React, { useState, useEffect } from "react";
import styles from  "./Todo.module.css";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import bg from '../../images/bg.jpg';


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
      <img src={bg} alt="bg" className={styles.bg} />
      <div className={styles.todo}>
        <nav>
          <h1>Welcome {currentUser.userName}</h1>
          <button className={styles.btnlogout} onClick={logout}>
            Logout
          </button>
        </nav>

        <div className={styles.todoheading}>
          <h1>To-Do List</h1>
        </div>

        <div className={styles.todoform}>
          <input
            className={styles.addtodoinput}
            type="text"
            placeholder="Enter task"
            value={userInput}
            onChange={handleInputChange}
          />
          <input
            type="date"
            className={styles.dateview}
            value={date.toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
          <button className={styles.add} onClick={addTask}>
            add task
          </button>
        </div>

        <div className={styles.tasks}>
          {tasks.map((task, index) => (
            <div
              className={styles.tasksbox}
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

              <div className={styles.taskdate}>{task.date}</div>

              {isEditing === task.id ? (
                <div className={styles.taskeditinput}>
                  <input
                    type="text"
                    value={editInput}
                    onChange={handleEditInputChange}
                  />
                  <FaCheck
                    onClick={() => handleSave(task.id)}
                    className={styles.facheck}
                  />
                </div>
              ) : (
                <div className={styles.taskbox}>{task.userInput}</div>
              )}
              <div className={styles.editdlt}>
                <div className={styles.edit}>
                  <FaEdit onClick={() => handleEditClick(task.id)} />
                </div>
                <div className={styles.delete}>
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
