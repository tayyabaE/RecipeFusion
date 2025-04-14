import React, { useState } from "react"
import "./Login.css"
import * as Icons from 'react-icons/fa6'
import loginImage from "../../assets/Images/login.svg"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      navigate("/admin");
    }
    else if (username === "user" && password === "user123") {
      navigate("/userhome");
    }
    else {
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div id="logsign" className="login-signup-container">
      
      <header className="navbar">
        <h1 className="nav-heading"><span>Recipe</span>Fusion</h1>
        <div className="nav-buttons">
        <button className="btn-login" onClick={() => navigate("/home")}>
            Home
          </button>
        </div>
      </header>

      <div className="auth-container">
        <div className="leftSection">
          <h2 className="section-title">Welcome Back</h2>
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <Icons.FaUser className="icons-colored" />
              <input
                type="text"
                placeholder="Username (Optional)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            
            <div className="input-container">
              <Icons.FaLockOpen className="icons-colored" />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-login">
              Login
            </button>
          </form>

          <p className="form-text">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>

        <div className="rightSection">
          <div className="logo-container">
            <h1 className="section-title">Recipe Fusion</h1>
          </div>
          <img src={loginImage} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
