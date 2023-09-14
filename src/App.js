import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import router from './PageRouter';  
import Post from './store/PostContext';

/**
 * ?  =====Import Components=====
 */

function App() {
  return (
    <div>
          <Post>

          <RouterProvider router={router} />
          
          </Post>
    </div>
  );
}

export default App;
  