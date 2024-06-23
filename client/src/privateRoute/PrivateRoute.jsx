import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/useAuth";
import ScaleLoader from "react-spinners/ScaleLoader";
import useUser from "../hooks/useUser";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ScaleLoader height={30} width={3} color="#F2A227" />
      </div>
    );
  }
  if (user) return children;

  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default PrivateRoute;
