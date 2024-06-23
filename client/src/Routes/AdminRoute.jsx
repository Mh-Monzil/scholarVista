import { Navigate } from 'react-router-dom'
import useUser from '../hooks/useUser'
import ScaleLoader from "react-spinners/ScaleLoader";
import UseAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const {user, loading} = UseAuth();
  const [role, isLoading] = useUser();

  if (isLoading || loading) return <ScaleLoader className="h-screen flex items-center justify-center" height={30} width={3} color="#F2A227" />;
  if (role === 'admin') return children;
  return <Navigate to='/dashboard/my-profile' />;
}


export default AdminRoute;

