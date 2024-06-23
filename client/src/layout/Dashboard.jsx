import ScaleLoader from "react-spinners/ScaleLoader";
import Sidebar from "../components/Sidebar/Sidebar";
import UseAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
    const {user, loading }= UseAuth();


    // if (loading)
    //     return (
    //       <div className="h-screen flex items-center justify-center">
    //         <ScaleLoader className=" " height={30} width={3} color="#F2A227" />
    //       </div>
    //     );

    return (
        <div className="relative min-h-screen md:flex">
      {/* sidebar  */}
      <div>
        <Sidebar />
      </div>
      {/* outlet --> dynamic content  */}
      <div className="flex-1 md:ml-72">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
    );
};

export default Dashboard;