import { FaArrowRight } from "react-icons/fa6";

const WhiteButton = ({label}) => {
    return (
        <div>
            <button className='btn flex items-center gap-3 bg-white text-black py-2 px-6 text-lg rounded-sm font-semibold hover:text-white hover:bg-transparent border border-white cursor-pointer transition-all duration-300 ease-in-out '>{label}
            <FaArrowRight />
            </button>
        </div>
    );
};

export default WhiteButton;