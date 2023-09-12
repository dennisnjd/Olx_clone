import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config";


// const [authUser, setAuthUser] =  useState(null);


//To check if the user is logged in  or not
export const listenToAuthChanges = (auth, setAuthUser) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user.displayName); // Set the authenticated user
        console.log("User logged in already",user);
    console.log("current user is ",auth.currentUser.displayName);
      } else {
        setAuthUser(null); // User is not authenticated
        console.log("User not logged in already");
      }
    });
  };

  export function userSignOut() {
    signOut(auth).then(() => {
        console.log("User Logged out succesfully");
    }).catch(error => console.log(error));
}

