import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";


const EventsModal = ({ isOpen, onRequestClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/notification/school', {
        title,
        message: description,
      });

      if (response?.data?.success) {
        console.log("Notification created successfully");
        SuccessToast("Notification Send Successfully.");
        onRequestClose(); 
      }
    } catch (err) {
      console.error("Error creating notification:", err);
      setError("Failed to create notification. Please try again.");
      ErrorToast("Error Sending Notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full lg:w-[532.47px] lg:h-[350px] relative">
        <button
          onClick={onRequestClose}
          className="absolute top-8 right-6 text-gray-600 hover:text-gray-900 transition"
        >
          <IoMdClose size={20} />
        </button>

        <h2 className="text-xl font-medium text-gray-800 mb-4">Notification</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 bg-[#F9FAFB] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 bg-[#F9FAFB] border border-gray-200 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-gray-400"
        ></textarea>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleSubmit}
          className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={loading} 
        >
          {loading ? 'Creating...' : 'Submit'}
        </button>
      </div>
    </Modal>
  );
};

export default EventsModal;
