import React, { useState } from "react";
import Swal from "sweetalert2";
import DataTable from "./DataTable";
import * as Icons from "react-icons/fa6";
import "./DataTable.css";

const users = [
  { id: 1, username: "Ali", name: "M Ali", email: "ali@gmail.com", phone: "0333123456", gender: "Male" },
  { id: 2, username: "Ahmed", name: "M Ahmed", email: "ahmed@gmail.com", phone: "0333123456", gender: "Male" },
  { id: 3, username: "Hamza", name: "M Hamza", email: "hamza@gmail.com", phone: "0333123456", gender: "Male" },
];

const userColumns = [
  { label: "Username", key: "username" },
  { label: "Email", key: "email" },
];

const handleDelete = (user) => {
  Swal.fire({
    title: `Are you sure you want to delete ${user.username}?`,
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", `${user.username} has been deleted.`, "success");
    }
  });
};

function UsersPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleView = (user) => {
    setSelectedUser(user);
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
            <h3 style={{fontSize:'1.3rem', marginBottom:15}}>User Profile</h3>
            <p className="profile-attributes" ><strong>Name:</strong> {selectedUser.name}</p>
            <p className="profile-attributes"><strong>Username:</strong> {selectedUser.username}</p>
            <p className="profile-attributes"><strong>Email:</strong> {selectedUser.email}</p>
            <p className="profile-attributes"><strong>Phone:</strong> {selectedUser.phone}</p>
            <p className="profile-attributes"><strong>Gender:</strong> {selectedUser.gender}</p>
            <div className="modal-buttons">
              <button style={{marginLeft:100, marginTop:15}} onClick={() => setSelectedUser(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UsersPage;
