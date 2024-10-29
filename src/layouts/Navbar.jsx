import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { GlobalContext } from "../contexts/GlobalContext";
import NotificationDropdown from "../components/Notifications/NotificationDropdown";
import axios from "../axios";

const Navbar = () => {
  const { navigate } = useContext(GlobalContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/school');
        if (response?.data?.success) {
          setUserProfile(response?.data?.data);
        }
      } catch (err) {
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="w-full h-[60px] bg-black flex justify-end items-center px-4 relative">
      <div className="flex items-center gap-6 py-4 font-normal text-gray-900">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-[29px] h-[29px] rounded-lg flex items-center justify-center bg-[#252525] p-1 relative"
          >
            <IoNotificationsOutline className="text-white w-full h-full" />
            <GoDotFill className="w-[20px] h-[20px] text-[#F44237] absolute -top-2 -right-1" />
          </button>

          {isDropdownOpen && <NotificationDropdown />}
        </div>

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 relative"
        >
          {loading ? (
            <div className="animate-pulse flex items-center gap-2">
              <div className="w-[28px] h-[28px] rounded-full bg-gray-600"></div>
              <div className="flex flex-col justify-start items-start">
                <p className="text-[11px] font-normal text-white/50 bg-gray-600 h-[10px] w-[100px] rounded"></p>
                <p className="text-[11px] font-medium text-white bg-gray-600 h-[10px] w-[60px] rounded"></p>
              </div>
            </div>
          ) : (
            <>
              <img
                src={userProfile?.profilePicture || `https://i.pravatar.cc/40?img=3`}
                alt="Profile"
                className="w-[28px] h-[28px] rounded-full cursor-pointer"
              />
              <div className="w-auto flex flex-col justify-start items-start">
                <p className="text-[11px] font-normal text-white/50">
                  Welcome back,
                </p>
                <p className="text-[11px] font-medium text-white">
                  {userProfile?.adminName}
                </p>
              </div>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
