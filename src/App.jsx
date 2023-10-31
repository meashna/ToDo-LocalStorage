import React from "react";
import { BrowserRouter, Routes, Route ,Outlet,Navigate} from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Todo from "./components/Todo/Todo";

// function isAuthenticated() {
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   return isLoggedIn === "true";
// }

// function ProtectedLayout() {
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" />;
//   }
//   return <Outlet />;
// }

function ProtectedLayout() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<ProtectedLayout />}>
          <Route path="todo" element={<Todo />} />
        </Route>
        {/* <Route path="/todo" element={<Todo />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
