// src/components/Register.js
import React, { useState } from "react";
import axios from "axios";
import "./register.css"

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log(username , password)
    e.preventDefault();
    try {
      await axios.post("http://localhost:4200/register", {
        username,
        password,
      });
      alert("Registration successful");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <p className="para2">please do registration here </p>
      <input className="B"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input className="B"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button2" type="submit">registration</button>
    </form>
  );
}

export default Register;
