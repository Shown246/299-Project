import { createContext } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../firebase.config";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const AuthContext = createContext(null);
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  // Password Validation
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  };

  const SignUpUser = (name, photoURL, email, password) => {
    return new Promise((resolve, reject) => {
      if (!validatePassword(password)) {
        toast.error(
          "Password must contain at least 6 characters, one uppercase letter and one lowercase letter"
        );
        return reject(
          "Password must contain at least 6 characters, one uppercase letter and one lowercase letter"
        );
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
          })
            .then(() => {
              setUser(res.user);
              resolve(res.user);
              toast.success("Sign Up successful");
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => reject(error.message));
    });
  };
  const LogInUser = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setUser(res.user);
          resolve(res.user);
          toast.success("Log In successful");
        })
        .catch((error) => {
          reject(error.message);
          toast.error("Invalid email or password");
        });
    });
  };
  const googleProvider = new GoogleAuthProvider();
  const GoogleSignUp = () => {
    return new Promise((resolve, reject) => {
      signInWithPopup(auth, googleProvider)
        .then((res) => {
          setUser(res.user);
          resolve(res.user);
          toast.success("Log In successful");
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  };
  const LogOutUser = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const UpdateUserProfile = (name, photoURL) => {
    return new Promise((resolve, reject) => {
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      })
        .then(() => {
          const updatedUser = auth.currentUser;
          setUser(updatedUser);
          toast.success("Profile updated successfully");
          resolve(updatedUser);
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("Failed to update profile");
          reject(error.message);
        });
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      const loggedUser = { email: currentUser?.email || user?.email };
      if (currentUser) {
        try {
          const email = currentUser.email;
          const roleResponse = await axios.get(`https://ph-assignment12-server.vercel.app/userRole?email=${email}`);
          const role = roleResponse.data;
          
          const updatedUser = { ...currentUser, role };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          await axios.post("https://ph-assignment12-server.vercel.app/jwt", loggedUser, { withCredentials: true });
        } catch (error) {
          console.error('Error during authentication state change:', error);
        }
      } else {
        axios.post("https://ph-assignment12-server.vercel.app/logout", loggedUser, { withCredentials: true });
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.email]);

  const authInfo = {
    loading,
    user,
    setUser,
    SignUpUser,
    LogInUser,
    GoogleSignUp,
    LogOutUser,
    UpdateUserProfile,
  };
  return (
    <>
      <AuthContext.Provider value={authInfo}>
        {!loading && children}
      </AuthContext.Provider>
      <ToastContainer />
    </>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
