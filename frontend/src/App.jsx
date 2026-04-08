import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Navbar from "./pages/navbar";
import Register from "./auth/resgister";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      
    },
    {
      path: "/register",
      element: <Register />,
      
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;