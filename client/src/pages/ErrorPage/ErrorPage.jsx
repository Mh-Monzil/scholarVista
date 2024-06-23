import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import notFound from '../../assets/errorpage.json';
import YellowButton from "../../components/Shared/YellowButton";


const ErrorPage = () => {
    return (
        <div className="text-center h-screen my-auto flex flex-col justify-center space-y-5 p-20 f
        ">
            <Lottie className="w-80 mx-auto" animationData={notFound} ></Lottie>
            <p className="text-4xl font-bold">Page Not Found?</p>
            <p className="font-semibold text-gray-500">Whoops, this is embracing.</p>
            <p className="font-semibold text-gray-500">Looks like the page you were looking for wasn't found.</p>
            <Link to='/' className="w-40 mx-auto" >
                <YellowButton label={"Back To Home"} />
            </Link>
        </div>
    );
};

export default ErrorPage;