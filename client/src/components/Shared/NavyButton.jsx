import React from 'react';

const NavyButton = ({label}) => {
    return (
        <div>
            <button className="w-full px-6 py-3 text-base font-semibold tracking-wide  capitalize transition-colors duration-300 transform bg-navy rounded-sm hover:bg-yellow text-white hover:text-black focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            {label}
            </button>
        </div>
    );
};

export default NavyButton;