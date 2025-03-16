import React from "react";
import "./UserDashboard.css";

const UserDashboard = () => {
  const user = {
    name: "M. Ali",
    lastLogin: "March 12, 2025",
    totalUsers: 120,
    savedRecipes: 35,
    searches: 78,
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Message */}
      <div className="welcome-section">
        <h2>WELCOME BACK, {user.name}!</h2>
        <p>Your last login: {user.lastLogin}</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>{user.savedRecipes}</h3>
          <p>Saved Recipes</p>
        </div>
        <div className="stat-card">
          <h3>{user.searches}</h3>
          <p>Searches Made</p>
        </div>
        
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
         <li>New recipe saved: "Kohlrabi Fries"</li>
          <li>Password changed successfully</li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
