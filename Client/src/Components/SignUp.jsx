import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContextProvider";
import { useContext, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { SignUpUser, GoogleSignUp } = useContext(AuthContext);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const newUser = { name, photoURL, role: "Client", email, password };
    SignUpUser(name, photoURL, email, password)
      .then((user) => {
        if (user !== null) {
          axios
            .post("http://localhost:5000/users", newUser)
            .then(() => {
              navigate("/");
            })
            .catch((error) => {
              toast.error(error.message);
            });
        }
      })
      .catch((error) => {
        if (error === "Firebase: Error (auth/email-already-in-use).") {
          toast.error("This Email is already in use");
        }
      });
  }
  const handleToggle = () => {
    if (type === "password") {
      setIcon(true);
      setType("text");
    } else {
      setIcon(false);
      setType("password");
    }
  };
  return (
    <>
      <div className="flex h-screen">
        <div className="hidden lg:flex items-center justify-center flex-1 text-black">
          <div className="max-w-md text-center">
            <img src="./assets/20944201.jpg" alt="" />
          </div>
        </div>
        <div className="w-full  lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6  text-center">
              Sign Up
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-center">
              Join with us and Get <span className="text-flamingo">Services</span>{" "}
            </h1>
            <div className="mt-4">
              <div className="w-full mb-2 lg:mb-0">
                <button
                  type="button"
                  className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                  onClick={() => {
                    GoogleSignUp()
                      .then((user) => {
                        if (user !== null) {
                          const newUser = { name: user.displayName, photoURL: user.photoURL, role: "Client", email :
                           user.email};
                          axios
                            .post("http://localhost:5000/users", newUser)
                            .then(() => {
                              navigate("/");
                            })
                            .catch((error) => {
                              toast.error(error.message);
                            });
                        }
                      })
                      .catch((error) => {
                        if (error === "Firebase: Error (auth/email-already-in-use).") {
                          toast.error("This Email is already in use");
                        }
                      });
                  }}
                >
                  <FcGoogle size={34} />
                  Sign Up with Google{" "}
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative z-0">
                <input
                  type="text"
                  name="name"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-base focus:border-black focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-100 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-100 peer-focus:text-black peer-focus:dark:text-black">
                  Your name
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  name="photoURL"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-base focus:border-black focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-100 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-100 peer-focus:text-black peer-focus:dark:text-black">
                  Photo URL
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="email"
                  name="email"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-base focus:border-black focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-100 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-100 peer-focus:text-black peer-focus:dark:text-black">
                  Your email
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type={type}
                  name="password"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-base focus:border-black focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <span
                  className="absolute top-3 right-6 cursor-pointer"
                  onClick={handleToggle}
                >
                  {icon ? <IoEye size={20} /> : <IoEyeOff size={20} />}
                </span>
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-100 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-100 peer-focus:text-black peer-focus:dark:text-black">
                  Your password
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-flamingo hover:underline font-semibold"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
