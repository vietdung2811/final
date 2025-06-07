import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Authorization/UserProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    login_name: "",
    password: "",
  });

  const onChanged = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //"http://localhost:8081/admin/login"
  const onLogin = () => {
    axios
      .post("https://ntnmm6-8081.csb.app/admin/login", user)
      .then((response) => {
        setCurrentUser(response.data);
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        navigate("/users");
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
      });
  };

  return (
    <div
      style={{
        maxWidth: 300,
        margin: "50px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2>Login</h2>
      <input
        type="text"
        name="login_name"
        placeholder="Enter login name"
        value={user.login_name}
        onChange={onChanged}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={user.password}
        onChange={onChanged}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <button
        style={{
          width: "100%",
          padding: 8,
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
        }}
        onClick={onLogin}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
