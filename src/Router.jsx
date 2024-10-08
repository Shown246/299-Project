import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./AuthContextProvider";
import Error from "./Error";
import Root from "./Components/Root";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";


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
      ],
    },
    
  ]);
  return <RouterProvider router={router} />;
};

export default Router;