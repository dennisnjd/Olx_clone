import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config";


//To check if the user is logged in  or not
export const listenToAuthChanges = (auth, setAuthUser) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user.displayName); // Set the authenticated user
        console.log("User logged in already",user);
    console.log("current user is ",auth.currentUser.displayName);
    const aa = auth.currentUser.displayName;
    return aa;
      } else {
        setAuthUser(null); // User is not authenticated
        console.log("User not logged in already");
        return null
      }
    });
  };

// export const listenToAuthChanges = (auth, setAuthUser) => {
//     return new Promise((resolve, reject) => {
//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           setAuthUser(user.displayName); // Set the authenticated user
//           console.log("current user is ::",user.displayName);
//           resolve(user.displayName); // Resolve with the user's name
//         } else {
//           setAuthUser(null); // User is not authenticated
//           resolve(null); // Resolve with null
//         }
//       });
//     });
//   };

  export function userSignOut() {
    signOut(auth).then(() => {
        console.log("User Logged out succesfully");
    }).catch(error => console.log(error));
}

