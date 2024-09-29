// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
 import "./login.css"

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log(username)
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4200/login", {
        username,
        password,
      });
      setToken(response.data.token);
      alert("Login successful");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="A">Login</h2>
      <p className="para">please enter your login details</p>
      
      <input className="B"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        
      />
      
      <div>
      <input className="B"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <button className="button1" type="submit">Login</button>
    </form>
  );
}

export default Login;
