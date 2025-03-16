import React, { useState } from "react";
import "./UserDashboard.css";
import profileimg from "../../assets/Images/profile.svg";
import * as Icons from "react-icons/fa6";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Ali",
    username: "ali",
    email: "ali@gmail.com",
    gender: "Male",
    phone: "0333123456",
  });

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(user);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    setUser(editData);
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-card">
        <img src={profileimg} alt="Profile" className="profile-img" />
        
        <div className="profile-info">
          <p><Icons.FaUser className="icons-colored" /> <strong>Name:</strong> {user.name}</p>
          <p><Icons.FaUser className="icons-colored" /> <strong>Username:</strong> {user.username}</p>
          <p><Icons.FaEnvelope className="icons-colored" /> <strong>Email:</strong> {user.email}</p>
          <p><Icons.FaPhone className="icons-colored" /> <strong>Phone:</strong> {user.phone}</p>
          <p><Icons.FaMars className="icons-colored" /> <strong>Gender:</strong> {user.gender}</p>
        </div>

        <button className="btn-explore" onClick={() => setEditMode(true)}>
           Edit Profile
        </button>
      </div>

      {editMode && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Profile</h3>
            <label>Name:</label>
            <input type="text" name="name" value={editData.name} onChange={handleChange} />
            
            <label>Username:</label>
            <input type="text" name="username" value={editData.username} onChange={handleChange} />
            
            <label>Email:</label>
            <input type="email" name="email" value={editData.email} onChange={handleChange} />

            <label>Phone Number:</label>
            <input type="phone" name="phone" value={editData.phone} onChange={handleChange} />
            
            <label>Gender:</label>
            <select name="gender" value={editData.gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <div className="modal-buttons">
              <button className="save-btn" onClick={saveChanges}>Save</button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
