import React from "react";
import "./DataTable.css";
import Sidebar from "./Sidebar";

const getValueByKey = (obj, keyPath) => {
  return keyPath.split(".").reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : "";
  }, obj);
};

function DataTable({ title, data, columns, actions }) {
  if (!Array.isArray(data)) {
    return <p>No data to display.</p>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "row" }}>
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
                        <img
                          src={getValueByKey(item, col.key)}
                          alt={item.name || "Image"}
                          className="table-image"
                        />
                      ) : (
                        <>{getValueByKey(item, col.key)}</>  
                      )}
                    </td>
                  ))}
                  <td>
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        className="btn-1"
                        onClick={() => action.onClick(item)}
                      >
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
