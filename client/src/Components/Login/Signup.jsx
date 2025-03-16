import React from "react";
import "./Login.css";
import signupImage from "../../assets/Images/signup.svg";
import { FaUser, FaEnvelope, FaPhone, FaVenusMars } from "react-icons/fa"; // Import icons

const Signup = () => {
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
        <div className="rightSection">
          <div className="logo-container">
            <h1 className="section-title">Recipe Fusion</h1>
          </div>
          <img src={signupImage} alt="Signup Illustration" />
        </div>

        <div className="leftSection">
          <h2 className="section-title">Create an Account</h2>
          <form>
            <div className="input-container">
              <FaUser className="icons-colored" />
              <input type="text" placeholder="Username" required />
            </div>
            <div className="input-container">
              <FaEnvelope className="icons-colored" />
              <input
                type="email"
                placeholder="Email"
                required
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                title="Enter a valid email (e.g., user@example.com)"
              />
            </div>
            <div className="input-container">
              <FaPhone className="icons-colored" />
              <input
                type="tel"
                placeholder="Phone"
                required
                pattern="^\+?[0-9]{10,15}$"
                title="Enter a valid phone number (e.g., +923001234567 or 03001234567)"
              />
            </div>
            <div className="input-container">
              <FaVenusMars className="icons-colored" />
              <select required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn-login">
              Sign Up
            </button>
          </form>

          <p className="form-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
