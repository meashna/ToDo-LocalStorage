import React from 'react'
import './Todo.css'
import { useNavigate } from 'react-router-dom'

const Todo = () => {
  const navigate = useNavigate()
  const logout=()=>{
    navigate('/register')
  }
  return (
    <div>
        <div className="todo">
            <h1>Sucessfully Logined!</h1>
            <button onClick={logout}>Logout</button>
        </div>
    </div>
  )
}

export default Todo