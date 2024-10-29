import React, { useState, useEffect } from "react";
import axios from '../../axios'; 
import NotificationsModal from "../../components/Notifications/NotificationsModal";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";


const Notifications = () => {
  const [activeTab, setActiveTab] = useState("send");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sentNotifications, setSentNotifications] = useState([]);
  const [receivedNotifications, setReceivedNotifications] = useState([]);
  const [loadingSent, setLoadingSent] = useState(true);
  const [loadingReceived, setLoadingReceived] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleClearSuccess = () => {
    window.location.reload();
    SuccessToast("Notifications Cleared Successfully");
  };

  const fetchSentNotifications = async () => {
    try {
      const response = await axios.get('/notification/schoolSent');
      if (response?.data?.success) {
        const notifications = response?.data?.data?.map(notification => ({
          id: notification?._id,
          heading: notification?.title,
          message: notification?.message,
          time: new Date(notification?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }));
        setSentNotifications(notifications);
      }
    } catch (error) {
      console.error("Error fetching sent notifications:", error);
    } finally {
      setLoadingSent(false);
    }
  };

  const fetchReceivedNotifications = async () => {
    try {
      const response = await axios.get('/notification/school'); 
      if (response?.data?.success) {
        const notifications = response?.data?.data?.map(notification => ({
          id: notification?.id, 
          heading: notification?.title,
          message: notification?.message,
          time: new Date(notification?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }));
        setReceivedNotifications(notifications);
      }
    } catch (error) {
      console.error("Error fetching received notifications:", error);
    } finally {
      setLoadingReceived(false); 
    }
  };

  useEffect(() => {
    fetchSentNotifications();
    fetchReceivedNotifications(); 
  }, []);

  return (
    <div className="w-full h-auto p-6 bg-gray-100 overflow-auto">
      <div className="flex items-center mb-6">
        <h3 className="text-[24px] font-bold text-black">Notifications</h3>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <div className="flex mb-6 items-center">
          <div className="flex-grow border-b border-[#E4E4E4] max-w-[90%]">
            <div className="flex">
              <button
                className={`mr-4 pb-2 text-[16px] font-semibold ${
                  activeTab === "send" ? "text-black border-black" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("send")}
              >
                Sent
              </button>
              <button
                className={`pb-2 text-[16px] font-semibold ${
                  activeTab === "appointments" ? "text-black border-black" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("appointments")}
              >
                Received
              </button>
            </div>
          </div>
          <button onClick={openModal} className="bg-black text-white px-4 py-2 rounded-md ml-4">
            Clear All
          </button>
        </div>

        <div>
          {loadingSent || loadingReceived ? (
            <div className="flex justify-center items-center h-32">
              <span className="text-gray-500">Loading notifications...</span>
            </div>
          ) : (
            (activeTab === "send" ? sentNotifications : receivedNotifications).map((notification) => (
              <div
                key={notification?.id}
                className="mb-4 pb-4 flex justify-between items-start"
              >
                <div className="flex-grow border-b border-[#E4E4E4] max-w-[90%]">
                  <div className="flex justify-between">
                    <strong className="text-black">{notification?.heading}</strong>
                    <span className="text-gray-500 text-sm">
                      {notification?.time}
                    </span>
                  </div>
                  <p className="list-disc text-[14px] text-[#858585] mb-2">
                    {notification?.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <NotificationsModal isOpen={isModalOpen} onRequestClose={closeModal}  onClearSuccess={handleClearSuccess} 
 />
    </div>
  );
};

export default Notifications;
