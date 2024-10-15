import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";

const GuideSide = () => {
  const navigate = useNavigate();
  const { user, LogOutUser } = useContext(AuthContext);
  const activeStyle =
    "flex items-center p-2 rounded-lg  bg-flamingo text-accentGold dark:hover:bg-gray-700 group";
  const navLists = (
    <>
      <li className="mb-3 lg:mb-0">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) => (isActive ? activeStyle : "flex items-center p-2 rounded-lg text-white  hover:bg-flamingo hover:text-white")}
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
          </svg>
          <span className="flex-1 ms-3 whitespace-nowrap">My Profile</span>
        </NavLink>
      </li>
      <li className="mb-3 lg:mb-0">
        <NavLink
          to="/dashboard/tours"
          className={({ isActive }) => (isActive ? activeStyle : "flex items-center p-2 rounded-lg text-white  hover:bg-flamingo hover:text-accentGold")}
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
          </svg>
          <span className="flex-1 ms-3 whitespace-nowrap">
            My Assigned Tours
          </span>
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-genoa flex flex-col justify-between">
          <ul className="space-y-2 font-medium">
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
          <div className="flex items-center gap-4">
            <img src={user.photoURL} alt={user.displayName} className="h-20 object-cover" />
            <p className="text-white">{user.displayName}</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default GuideSide;
