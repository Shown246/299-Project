import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import { IoMdAddCircle } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";

const AdminSide = () => {
  const navigate = useNavigate();
  const { user, LogOutUser } = useContext(AuthContext);
  const activeStyle =
    "flex items-center p-2 rounded-lg lg:text-base text-sm  bg-flamingo text-accentGold dark:hover:bg-gray-700 group";
  const navLists = (
    <>
      <li className="mb-3 lg:mb-0">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive
              ? activeStyle
              : "flex items-center p-2 rounded-lg lg:text-base text-sm text-white  hover:bg-flamingo hover:text-white"
          }
        >
          <FaHouseUser size={30} />
          <span className="flex-1 lg:ms-3 lg:text-base text-sm whitespace-nowrap">My Profile</span>
        </NavLink>
      </li>
      <li className="mb-3 lg:mb-0">
        <NavLink
          to="/dashboard/addPackage"
          className={({ isActive }) =>
            isActive
              ? activeStyle
              : "flex items-center p-2 rounded-lg text-white  hover:bg-flamingo hover:text-accentGold"
          }
        >
          <IoMdAddCircle size={30} />
          <span className="flex-1 ms-3 whitespace-nowrap">Add Package</span>
        </NavLink>
      </li>
      <li className="mb-3 lg:mb-0">
        <NavLink
          to="/dashboard/manageUsers"
          className={({ isActive }) =>
            isActive
              ? activeStyle
              : "flex items-center p-2 rounded-lg text-white  hover:bg-flamingo hover:text-accentGold"
          }
        >
          <MdManageAccounts size={30} />
          <span className="flex-1 ms-3 whitespace-nowrap">Manage Users</span>
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 lg:w-64 w-24 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-genoa flex flex-col justify-between">
          <ul className="space-y-2 lg:font-medium font-lightlg:text-base text-sm">
            <li className="mb-8">
              <button
                onClick={() => navigate("/")}
                className="text-3xl text-white font-bold hidden lg:block animate__animated animate__fadeIn duration-300"
              >
                Travel<span className="text-flamingo">BD</span>
              </button>
            </li>
            {navLists}
            {/* Log out  */}
            <li>
              <button
                onClick={() => {
                  LogOutUser();
                  navigate("/logIn");
                }}
                className="flex items-center p-2 rounded-lg text-white hover:bg-flamingo hover:text-accentGold dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
              </button>
            </li>
          </ul>
          <div className="flex items-center lg:gap-6">
            <img src={user.photoURL} alt={user.displayName} className="lg:h-20 h-8 object-cover" />
            <p className="text-accentGold lg:text-xllg:text-base text-sm  font-semibold">{user.displayName}</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AdminSide;
