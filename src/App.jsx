import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/LandingPage/Home";
import OpenChat from "./pages/ChatPage/OpenChat";
import Mentor from "./pages/MentorPage/MentorPage";
import Pricing from "./pages/Pricing/Pricing";
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
  {
    path: "/pricing",
    element:  <Pricing/> 
  }, 
  { path: "/dashboard", element: <Dashboard/> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
