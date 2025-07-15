import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/LandingPage/Home";
import OpenChat from "./pages/ChatPage/OpenChat";
import Mentor from "./pages/MentorPage/MentorPage";
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
