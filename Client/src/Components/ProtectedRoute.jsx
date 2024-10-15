import { useContext } from "react"
import { AuthContext } from "../AuthContextProvider"
import { Navigate,useLocation  } from "react-router-dom";
const ProtectedRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/logIn" state={{ from: location.pathname }} />;
}

import PropTypes from 'prop-types';

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute