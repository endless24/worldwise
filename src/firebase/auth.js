import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // GoogleAuthProvider,
  // signInWithPopup,
  // sendPasswordResetEmail,
  // updatePassword,
} from "firebase/auth";

//function to create email and password
export const doCreateUserWithEmailAndPasword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//function to sign in
export const dosignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

//function to sign in with google
// export const doSignInWithGoogle = async () => {
//   const provider = GoogleAuthProvider();
//   const result = await signInWithPopup(auth, provider);
//   // to get details of user you can use-> result.user.email
//   return result;
// };

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return doSendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };
