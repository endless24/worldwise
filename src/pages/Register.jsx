import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../component/PageNav";
import btnStyles from "../component/Button.module.css";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doCreateUserWithEmailAndPasword } from "../firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmpassword, setConfirmPassword] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmpassword) {
        if (!isRegistering) {
          setIsRegistering(true);

          await doCreateUserWithEmailAndPasword(email, password);

          toast.success("User registered Successfull!!", {
            position: "top-center",
          });

          navigate("/login");

          setEmail("");

          setPassword("");

          setConfirmPassword("");
        }
      } else {
        toast.success("Password dosen't not match", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.success(error.message, {
        position: "top-center",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleRegister}>
        <h1>REGISTER</h1>
        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="confirmpassword">Confirm password</label>
          <input
            type="password"
            id="confirmpassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmpassword}
          />
        </div>

        <div>
          <button className={`${btnStyles.primary} ${btnStyles.btn}`}>
            Register
          </button>
          <Link
            to="/login"
            style={{
              float: "right",
              fontSize: "1.5rem",
              color: "lightblue",
              textDecoration: "none",
            }}
          >
            Have an account login
          </Link>
        </div>
      </form>
    </main>
  );
}
