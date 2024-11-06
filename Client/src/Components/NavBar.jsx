import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContextProvider";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, LogOutUser } = useContext(AuthContext);
  const role = user?.role;
  console.log(role);
  const [, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const handleThemeChange = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };
  const handleDashboard = () => {
    if(role === "Client"){
      navigate("/userDashboard");
    }
    else if(role === "Serviceman"){
      navigate("/serDashboard");
    }
  };
  // const activeStyle =
  //   "text-accentGold text-lg underline underline-offset-8 font-semibold rounded-lg p-3 bg-flamingo";
  // const navLists = (
  //   <>
  //     <li className="mb-3 un lg:mb-0">
  //       <NavLink
  //         to="/"
  //         className={({ isActive }) => (isActive ? activeStyle : "p-3")}
  //       >
  //         Home
  //       </NavLink>
  //     </li>
  //     <li className="mb-3 lg:mb-0">
  //       <NavLink
  //         to="/community"
  //         className={({ isActive }) => (isActive ? activeStyle : "p-3")}
  //       >
  //         Community
  //       </NavLink>
  //     </li>
  //     <li className="mb-3 lg:mb-0">
  //       <NavLink
  //         to="/blogs"
  //         className={({ isActive }) => (isActive ? activeStyle : "p-3")}
  //       >
  //         Blogs
  //       </NavLink>
  //     </li>
  //     <li className="mb-3 lg:mb-0">
  //       <NavLink
  //         to="/about"
  //         className={({ isActive }) => (isActive ? activeStyle : "p-3")}
  //       >
  //         About Us
  //       </NavLink>
  //     </li>
  //     <li className="mb-3 lg:mb-0">
  //       <NavLink
  //         to="/contact"
  //         className={({ isActive }) => (isActive ? activeStyle : "p-3")}
  //       >
  //         Contact Us
  //       </NavLink>
  //     </li>
  //   </>
  // );
  return (
    <div className="bg-genoa">
      <header className="container90">
        <nav>
          <div className="navbar">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className=" menu-sm dropdown-content mt-3 z-40 pt-6 p-2 shadow rounded-box w-52 bg-genoa text-white"
                >
                  {/* {navLists} */}
                </ul>
              </div>
              <button
                onClick={() => navigate("/")}
              >
                <img src="assets/2.png" alt="logo" className="w-[88px]"/>
              </button>
            </div>
            <div className="flex lg:justify-between justify-end w-full">
              <div className="navbar-center hidden lg:flex">
                <ul className="menu-horizontal px-1 space-x-5 text-white">
                  {/* {navLists} */}
                </ul>
              </div>
              <div className="flex items-center gap-4">
                {user && (
                  <>
                    <a
                      data-tooltip-id="my-tooltip-multiline"
                      data-tooltip-offset={10}
                    >
                      <div className="w-12 h-12">
                        <img
                          className="lg:w-full lg:h-full md:w-full md:h-full w-3/4 h-3/4 rounded-full object-cover"
                          src={user.photoURL}
                          alt="Your image"
                        />
                      </div>
                    </a>
                    <Tooltip
                      id="my-tooltip-multiline"
                      openOnClick="true"
                      clickable="true"
                      className="z-50"
                    >
                      <div className="p-2 text-lg">
                        <p className="mb-1">{user.displayName}</p>
                        <p className="mb-1">{user.email}</p>
                        <button
                          onClick={handleDashboard}
                          className="hover:text-red-600 hover:underline cursor-pointer mb-1"
                        >
                          Dashboard
                        </button>
                        <br />
                        <button
                          className="bg-flamingo text-white px-4 rounded-md  cursor-pointer"
                          onClick={() => {
                            LogOutUser();
                            navigate("/logIn");
                          }}
                        >
                          Log Out
                        </button>
                      </div>
                    </Tooltip>
                  </>
                )}
                {!user && (
                  <>
                    <button onClick={() => {
                        navigate("/serSignUp");
                      }}>Become a Serviceman</button>
                    <button
                      className="org-btn"
                      onClick={() => {
                        navigate("/logIn");
                      }}
                    >
                      Log In
                    </button>
                  </>
                )}
                <div>
                  <label className="cursor-pointer grid place-items-center">
                    <input
                      type="checkbox"
                      value="dark"
                      onChange={(e) => {
                        handleThemeChange(e);
                      }}
                      defaultChecked={localStorage.getItem("theme") === "dark"}
                      className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
                    />
                    <svg
                      className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <svg
                      className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
