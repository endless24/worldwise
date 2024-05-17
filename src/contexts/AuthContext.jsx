import { onAuthStateChanged } from "firebase/auth";
import propTypes from "prop-types";
import { auth } from "../firebase/firebase";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState("");

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, initializeUser);
    return unsubcribe;
  }, []);

  //checking if the user is loggedin
  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserId(user.uid);
      setUserEmail(user.email);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);

      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    userId,
    setUserId,
    userEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext has been used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };

AuthProvider.propTypes = {
  children: propTypes.object.isRequired,
};
