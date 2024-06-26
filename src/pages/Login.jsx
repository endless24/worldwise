import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../component/PageNav";
import btnStyles from "../component/Button.module.css";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useAuth } from "../contexts/AuthContext";
import { dosignInWithEmailAndPassword } from "../firebase/auth";

export default function Login() {
  // const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isSigningIn, setIsSigningIn] = useState(false);

  const navigate = useNavigate();

  //handlesSubmit function for email and password
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isSigningIn) {
        setIsSigningIn(true);

        await dosignInWithEmailAndPassword(email, password);

        toast.success("User login succefully", {
          position: "top-center",
        });

        navigate("/app/cities");
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <div>
          <button className={`${btnStyles.primary} ${btnStyles.btn}`}>
            Add
          </button>
          <Link
            to="/Register"
            style={{
              float: "right",
              fontSize: "1.5rem",
              color: "lightblue",
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </div>
      </form>
    </main>
  );
}
