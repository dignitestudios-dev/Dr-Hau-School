import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from 'react-icons/io';
import { useHistory } from 'react-router-dom'; // or 'useNavigate' for react-router v6

const PasswordUpdateModal = ({ isOpen, onRequestClose }) => {
  const history = useHistory(); // or useNavigate for react-router v6

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        // Redirect to /login after 2 seconds
        history.push('/login'); // Or use `navigate('/login')` if you're using react-router v6
      }, 2000);

      // Cleanup the timer if the modal is closed before the timeout
      return () => clearTimeout(timer);
    }
  }, [isOpen, history]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
    >
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-lg w-full mx-4 md:w-[552px] h-auto md:h-[289px] flex flex-col justify-center items-center relative">
       
        <button
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-black hover:text-gray-600"
        >
          <IoMdClose className="text-2xl" />
        </button>

        <div className="flex justify-center items-center mb-4">
          <div className="rounded-full bg-[#000505] p-4 flex items-center justify-center">
            <FaCheck className="text-[#D0FCB3] text-4xl" />
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-[20px] md:text-[24px]">
          Password Updated Successfully
        </h2>
      </div>
    </Modal>
  );
};

export default PasswordUpdateModal;
