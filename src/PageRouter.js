import * as React from "react";
import {createBrowserRouter } from "react-router-dom"; 
import Home from "./Pages/Home"; 
import SignupPage from "./Pages/Signup"; 
import LoginPage from "./Pages/Login"; 
import CreatePage from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";



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
      },
      {
        path: "/create",
        element: <CreatePage/>
      },
      {
        path: '/view',
        element: <ViewPost/>
      }
  ]
  );

  export default router;   