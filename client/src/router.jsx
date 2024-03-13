import { Navigate } from "react-router-dom";

//Import layouts
import BaseLayout from "./components/Layouts/BaseLayout";
import AppbarLayout from "./components/Layouts/AppbarLayout";

//Import components
import AuthDialog from "./pages/Auth";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";
import Play from "./pages/Play";
import Achievements from "./pages/Achievements";

// Fake authentication function
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
    //Todo: If not authenticated, redirect to Sign in/Sign up
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

// Protected Route Component
const ProtectedRoute = ({ element, ...rest }) => {
  return fakeAuth.isAuthenticated ? element : <Navigate to="signin" replace />;
};

const routes = [
  {
    path: "",
    element: <AppbarLayout />,
    children: [
      {
        path: "",
        element: <Challenges />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "play",
        element: <Play />,
      },
      {
        path: "achievements",
        element: <Achievements />,
      },
      {
        path: "signin",
        element: <AuthDialog />,
      },
    ],
  },
];

export default routes;
