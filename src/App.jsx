import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import OpenSourceChat from './pages/Open-Source-Chat';
import MentorShip from './pages/MentorShip';
import MentorDashoard from './pages/Mentor/MentorDashboard';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
 {
  path: '/chat',
  element: <OpenSourceChat />,
 },
 {
  path: '/mentorship',
  element: <MentorShip/> ,
 },  {
  path: '/dashboard',
  element: <MentorDashoard/> ,
 }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;