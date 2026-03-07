import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Layout from "./Components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeroUIProvider } from "@heroui/react";
import AuthContextProvider from "./Context/AuthContext";
import Profile from "./Pages/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthProtectedRoutes from "./Components/AuthProtectedRoutes/AuthProtectedRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "/home", element: <ProtectedRoute><Home /></ProtectedRoute>},
      { path: "/login", element: <AuthProtectedRoutes><Login /></AuthProtectedRoutes> },
      { path: "/register", element: <AuthProtectedRoutes><Register /></AuthProtectedRoutes> },
      { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <HeroUIProvider>
          <ToastContainer />
          <RouterProvider router={routes} />
        </HeroUIProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
