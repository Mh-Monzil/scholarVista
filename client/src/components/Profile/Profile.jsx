import { useState } from "react";
import UseAuth from "../../hooks/useAuth";
import avatarImg from '../../assets/placeholder.jpg'
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logOut } = UseAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            {/* Avatar */}
            <img
              className="rounded-full w-10 h-10 object-cover"
              referrerPolicy="no-referrer"
              src={user && user.photoURL ? user.photoURL : avatarImg}
              alt="profile"
            />
          </div>
        </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-16 text-sm">
          <div>
            {user ? (
                <div
                  onClick={logOut}
                  className=" px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                >
                  Logout
                </div>
            ) : (
              <>
                hello
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
