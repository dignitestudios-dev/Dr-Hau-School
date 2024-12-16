import React from 'react';
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import { FaExclamation } from "react-icons/fa";
import axios from "../../axios"; // Your axios instance

const LogoutModal = ({ isOpen, onRequestClose, onLogoutSuccess }) => {

  const handleLogout = async () => {
    try {
      const response = await axios.post('/auth/logout');
      if (response.data.success) {
        localStorage.clear(); // Clear local storage on successful logout
        onLogoutSuccess(); // Trigger the success action (e.g., redirect to login)
        onRequestClose(); // Close the modal
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-[266px] h-[148px] text-left">
        <h2 className="text-2xl text-black font-semibold mb-2 text-[19px] text-red-500">Logout</h2>
        <p className="text-gray-600 mb-6 text-[12px]">
          Are you sure you want to Logout?
        </p>
        <div className="flex justify-end w-full mt-8"> 
          <button
            onClick={onRequestClose}
            className="mr-4 text-black text-[12px] font-semibold rounded-full hover:text-[#C00000] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout} 
            className="text-black text-[12px] font-semibold rounded-full hover:text-[#C00000] transition"
          >
            Logout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
