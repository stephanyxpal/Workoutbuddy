import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/Notfound";
import Activity from "./pages/activity";
import FitnessGoals from "./pages/FitnessGoals";
import Profile from "./pages/Profile";
import auth from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: auth.loggedIn() ? <Home /> : <Navigate to='/login' replace />,
      },
      {
        path: "/activity",
        element: <Activity />,
      },
      {
        path: "/FitnessGoals",
        element: <FitnessGoals />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
} else {
  console.log("No root element");
}
