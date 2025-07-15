import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/LandingPage/Home";
import OpenChat from "./pages/ChatPage/OpenChat";
import Mentor from "./pages/MentorPage/MentorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/> ,
  },
  {
    path: "/chat", 
    element: <OpenChat/> ,
  },
  { path: "/mentor", element: <Mentor/> },
  { path: "/dashboard", element: <Dashboard/> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
