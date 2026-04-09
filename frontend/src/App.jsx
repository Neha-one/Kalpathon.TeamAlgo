import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./pages/navbar";
import Register from "./auth/resgister";

import Login from "./auth/login";
import VerifyPage from "./auth/verify";
import VerifyPage_1 from "./auth/verify_1";
import UserProfile from "./auth/UserProfile";
import WorkersCard from "./pages/Cards/WorkersCard";
import WorkersList from "./pages/Cards/WorkersList";
import About from "./pages/about";
import Notice from "./pages/notice";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <WorkersList></WorkersList>
        </>
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/verify/:token",
      element: <VerifyPage_1 />,
    },
    {
      path: "/verify-email/:token",
      element: <VerifyPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/me",
      element: (
        <>
      
          <UserProfile />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <About />
        </>
      ),
    },
    {
      path: "/notice",
      element: (
        <>
          <Navbar />
          <Notice />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
