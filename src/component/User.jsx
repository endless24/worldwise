import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
import { doSignOut } from "../firebase/auth";
import styles from "./User.module.css";
import { useAuth } from "../contexts/AuthContext";

const FAKE_USER = {
  //   name: "Jack",
  //   email: "jack@example.com",
  //   password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function User() {
  // const { currentUser } = useAuth;
  const { userEmail } = useAuth();
  const user = FAKE_USER;
  // console.log(user);

  const navigate = useNavigate();

  function handleClick() {
    doSignOut().then(() => {
      navigate("/");
    });
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.displayName} />
      <span>Welcome, {userEmail}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`❌
2) In the `Login.jsx` page, call `login()` from context❌
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`❌
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`❌
5) Handle logout button by calling `logout()` and navigating back to `/`❌
*/
