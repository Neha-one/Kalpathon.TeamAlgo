import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Navbar from "./pages/navbar";
import Register from "./auth/resgister";
import Verify from "./auth/verify";
import Login from "./auth/login";
import VerifyPage from "./auth/verify_1";
import VerifyPage_1 from "./auth/verify_1";
import WorkersCard from "./pages/Cards/WorkersCard";
import WorkersList from "./pages/Cards/WorkersList";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><WorkersList></WorkersList></>,
      
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
      path: "/login",
      element: <Login />,
      
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;