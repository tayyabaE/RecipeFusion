import React from "react";
import "./DataTable.css";
import Sidebar from "./Sidebar";
function DataTable({ title, data, columns, actions }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Sidebar />
    <div className="user-table">
      <h3 className="table-header">{title}</h3>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.key === "image" ? (
                      <img src={item[col.key]} alt={item.name} className="table-image" />
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
                <td>
                  {actions.map((action, actionIndex) => (
                    <button key={actionIndex} className="btn-1" onClick={() => action.onClick(item)}>
                      {action.icon} {action.label}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default DataTable;
