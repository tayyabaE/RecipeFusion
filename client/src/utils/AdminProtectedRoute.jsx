import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:5000/api/fetchuser",
        {},
        { withCredentials: true } 
      );

      if (resp.data.success) {
        setUser(resp.data.data);
      } else {
        console.log("User fetch failed");
      }
    } catch (err) {
      console.error("Axios error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) return null;

  if (!user) return <Navigate to="/login" />;

  if (user.role !== 1) {
    return <Navigate to="/userdashboard" />;
  }

  return children;
};

export default AdminProtectedRoute;
