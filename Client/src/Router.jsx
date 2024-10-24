import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./AuthContextProvider";
import Error from "./Error";
import Root from "./Components/Root";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import SerSignUp from "./Components/SerSignUp";
import SerLogIn from "./Components/SerLogIn";
import SerDashboard from "./Components/SerDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import JobPost from "./Components/JobPost";
import UserDashboard from "./Components/UserDashboard";

const Router = () => {
  // const { user } = useContext(AuthContext);
  // const role = user?.role;
  // const guideRoutes = [
    
  // ];

  // const touristRoutes = [
    
  // ];

  // const adminRoutes = [
    
  // ];

  // let childrenRoutes = [];

  // if (role === "Guide") {
  //   childrenRoutes = guideRoutes;
  // } else if (role === "Tourist") {
  //   childrenRoutes = touristRoutes;
  // } else if (role === "Admin") {
  //   childrenRoutes = adminRoutes;
  // }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/logIn",
          element: <LogIn />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
        {
          path: "/serlogIn",
          element: <SerLogIn />,
        },
        {
          path: "/sersignUp",
          element: <SerSignUp />,
        },
        {
          path: "/jobPost",
          element: <ProtectedRoute><JobPost /></ProtectedRoute>,
        }
      ],
    },
    {
      path: "/userDashboard",
      element: <UserDashboard />,
    },
    {
      path: "/serDashboard",
      element: <SerDashboard />,
    }
    
  ]);
  return <RouterProvider router={router} />;
};

export default Router;