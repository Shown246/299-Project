import { Outlet } from "react-router-dom";
import GuideSide from "./GuideSide";
import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import TouristSide from "./TouristSide";
import AdminSide from "./AdminSide";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (user?.role === "Admin") {
    return (
      <div className="flex lg:text-xl">
        <AdminSide/>
        <div className="lg:ml-64 ml-28 w-full">
          <Outlet />
        </div>
      </div>
    );
  } else if(user?.role === "Guide") {
    return (
      <div className="flex">
      <GuideSide />
      <div className="lg:ml-64">
        <Outlet />
      </div>
    </div>
    );
  } else if(user?.role === "Tourist"){
    return (
      <div className="flex">
      <TouristSide />
      <div className="ml-64">
        <Outlet />
      </div>
    </div>
    );
  }
};

export default Dashboard;
