// src/App.js
import React, { useState } from "react";
import "./App.css"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Upload from "./components/Upload";
import Files from "./components/Files";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div className="div">
        <nav>
          <ul >
            {!token ? (
              <header className="header1">
              
                <li>
                  <Link className="register" to="/register">registration</Link>
                </li>
                <li>
                  <Link className="login" to="/login">Login</Link>
                </li>
              </header>
            ) : (
              <header className="headerupload">
                <li>
                  <Link className="upload" to="/upload">Upload</Link>
                </li>
                <li>
                  <Link className ="files" to="/files">Files</Link>
                </li>
                <li>
                  <button className="logout" onClick={() => setToken(null)}>Logout</button>
                </li>
              </header>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/upload"
            element={
              token ? <Upload token={token} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/files"
            element={token ? <Files token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={
              token ? <Navigate to="/upload" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
