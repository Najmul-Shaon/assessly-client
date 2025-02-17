import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Spinner from "../shared/spinner/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    console.log(loading);
    return <Spinner />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
