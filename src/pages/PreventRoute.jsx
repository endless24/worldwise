import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PreventRoute({ children }) {
  const { userLoggedIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) navigate("/app/cities");
  }, [navigate, userLoggedIn]);
  return userLoggedIn ? children : null;
}

export default PreventRoute;
