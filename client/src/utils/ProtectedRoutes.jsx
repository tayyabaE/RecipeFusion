import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const resp = await axios.post(
        "http://localhost:5000/api/fetchuser",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (resp.data.success) {
        setUser(resp.data.data);
      } else {
        console.log("Invalid token or user fetch failed");
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

  if ( user && user.role !==2 ) {
    return <Navigate to="/admindashboard" />;
  }
  

  return children;
};

export default ProtectedRoute;
