import styles from "./Button.module.css";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      className={`${styles.back} ${styles.btn}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </button>
  );
}

export default BackButton;
