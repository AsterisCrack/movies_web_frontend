import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ListPage from './ListPage.jsx'
import LoginPage from './Login.jsx'
import RegisterPage from './Register.jsx'
import ContactInfo from './ContactInfo.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [{
    path: "",
    element: <ListPage/>,
  },{
    path: "contactInfo",
    element: <ContactInfo/>,
  },{
    path: "login",
    element: <LoginPage/>,
  },{
    path: "register",
    element: <RegisterPage/>,
  }
],
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
