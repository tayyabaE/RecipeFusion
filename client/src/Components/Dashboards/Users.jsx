import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import DataTable from "./DataTable";
import * as Icons from "react-icons/fa6";
import "./DataTable.css";
import axios from "axios";

const userColumns = [
  { label: "Username", key: "username" },
  { label: "Email", key: "email" },
];

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/all-users", { withCredentials: true }) // Ensure cookies are sent
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        if (error.response && error.response.status === 401) {
         
          window.location.href = "/login";
        }
      });
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: `Are you sure you want to delete ${user.username}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:5000/api/delete-user/${user.username}`, { withCredentials: true }); // Ensure cookies are sent
          if (response.status === 200) {
            Swal.fire("Deleted!", response.data.message, "success");
            setUsers((prevUsers) => prevUsers.filter((u) => u.username !== user.username));
          } else {
            Swal.fire("Error", response.data.message || "Failed to delete user.", "error");
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Error", error.response?.data?.message || "Failed to delete user.", "error");
        }
      }
    });
  };

  return (
    <>
      <DataTable
        title="Users"
        data={users}
        columns={userColumns}
        actions={[
          { label: "View", icon: <Icons.FaEye />, onClick: handleView },
          { label: "Delete", icon: <Icons.FaTrash />, onClick: handleDelete },
        ]}
      />

      {selectedUser && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.3rem', marginBottom: 15 }}>User Profile</h3>
            <p className="profile-attributes"><strong>Username:</strong> {selectedUser.username}</p>
            <p className="profile-attributes"><strong>Email:</strong> {selectedUser.email}</p>
            <p className="profile-attributes"><strong>Phone:</strong> {selectedUser.phone}</p>
            <p className="profile-attributes"><strong>Gender:</strong> {selectedUser.gender}</p>
            <div className="modal-buttons">
              <button style={{ marginLeft: 100, marginTop: 15 }} onClick={() => setSelectedUser(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UsersPage;
