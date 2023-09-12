import * as React from "react";
import {createBrowserRouter } from "react-router-dom"; 
import Home from "./Pages/Home"; 
import SignupPage from "./Pages/Signup"; 
import LoginPage from "./Pages/Login"; 


const router = createBrowserRouter([
    { 
      path: "/",
      element: <Home/> ,
    },
    {
      path: "/signup",
      element: <SignupPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
      }
  ]
  );

  export default router;   