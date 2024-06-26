import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { userLoggedIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) navigate("/");
  }, [userLoggedIn, navigate]);

  return userLoggedIn ? children : null;
}

export default ProtectedRoute;
