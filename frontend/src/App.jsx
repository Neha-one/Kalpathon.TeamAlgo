import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Navbar from "./pages/navbar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
       
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;