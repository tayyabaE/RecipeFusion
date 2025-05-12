import React, { useState } from "react";
import "./Login.css";
import * as Icons from "react-icons/fa6";
import loginImage from "../../assets/Images/login.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        { email, password },
        { withCredentials: true } 
      );

      const { role, username, gender, phone, userId, message, email: returnedEmail } = res.data;

      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", returnedEmail);
      localStorage.setItem("phone", phone);
      localStorage.setItem("gender", gender);
      localStorage.setItem("role", role);

      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: message || "You are now logged in",
        showConfirmButton: false,
        timer: 1500,
      });

      if (role === 1) {
        navigate("/admindashboard");
      } else {
        navigate("/userdashboard");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    }
  };

  return (
    <div id="logsign" className="login-signup-container">
      <header className="navbar">
        <h1 className="nav-heading">
          <span>Recipe</span>Fusion
        </h1>
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
              <Icons.FaEnvelope className="icons-colored" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-container">
              <Icons.FaLockOpen className="icons-colored" />
              <input
                type="password"
                placeholder="Password"
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
