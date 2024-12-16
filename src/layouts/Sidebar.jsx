import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../assets/export";
import SidebarLink from "./SidebarLink";
import { RiLogoutCircleLine, RiMenuLine } from "react-icons/ri";
import { sidebarArr } from "../constants/sidebarArr";
import axios from '../axios'; // Your axios instance
import LogoutModal from "../components/onboarding/LogoutModal";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLogoutModalOpen = () => {
    setIsLogoutModalOpen(true); // Open the logout modal
  };

  const handleLogoutModalClose = () => {
    setIsLogoutModalOpen(false); // Close the logout modal
  };

  const handleLogoutSuccess = () => {
    navigate("/login"); // Redirect to login page after successful logout
  };

  return (
    <div>
      <button
        onClick={toggleDrawer}
        className="lg:hidden fixed top-4 left-4 z-50 text-white"
      >
        <RiMenuLine size={24} />
      </button>

      <div
        className={`fixed lg:static top-0 left-0 w-[280px] bg-black py-4 px-6 flex flex-col justify-start items-start transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 z-40 h-screen overflow-y-auto`}
      >
        <Link to="/" className="mt-8">
          <img src={Logo} alt="perfectboat_logo" className="h-24" />
        </Link>

        <div className="w-full mt-20 flex flex-col justify-start items-start gap-2">
          {sidebarArr?.map((link, index) => (
            <SidebarLink
              key={index}
              link={link}
              onCloseDrawer={handleCloseDrawer}
            />
          ))}
          <button
            onClick={() => {
              handleLogoutModalOpen(); // Open logout confirmation modal
              handleCloseDrawer();
            }}
            className="w-full h-[46px] outline-none rounded-[12px] bg-transparent text-white/50 font-medium flex items-center justify-start transition-all duration-500 hover:bg-[#D0FCB3] hover:text-black px-3 gap-2"
          >
            <span className="text-2xl">
              <RiLogoutCircleLine />
            </span>
            <span className="capitalize text-[13px] font-normal">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay when drawer is open */}
      {isDrawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
        ></div>
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onRequestClose={handleLogoutModalClose}
        onLogoutSuccess={handleLogoutSuccess} // Pass the logout success handler
      />
    </div>
  );
};

export default Sidebar;
