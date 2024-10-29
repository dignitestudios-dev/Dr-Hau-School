import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "../../axios"; 

const NotificationDropdown = ({ isOpen, setIsOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/notification/unread");
        if (response.data.success) {
          setNotifications(response.data.data.notifications);
          setUnreadCount(response.data.data.unreadCount);
        } else {
          setError("Failed to fetch notifications.");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Error fetching notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchUnreadNotifications();
  }, []);

  const handleNotificationClick = () => {
    setIsOpen(false); 
    navigate("/notifications"); 
  };

  if (loading) {
    return (
      <div className="absolute w-[210px] right-0 mt-2 lg:w-[480px] bg-white shadow-lg rounded-lg p-4">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute w-[210px] right-0 mt-2 lg:w-[480px] bg-white shadow-lg rounded-lg p-4">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="absolute w-[210px] right-0 mt-2 lg:w-[480px] bg-white shadow-lg rounded-lg p-4 max-h-[300px] overflow-y-auto">
      <h3 className="font-medium text-lg">Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications.</p>
      ) : (
        notifications.slice(0, 5).map((notification) => {
          const { title, message, date } = notification.notificationId;
          const formattedDate = new Date(date).toLocaleString();

          return (
            <div
              key={notification.id} 
              className="flex justify-between items-start border-b py-3 cursor-pointer"
              onClick={handleNotificationClick}
            >
              <div className="flex flex-col">
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-sm text-gray-500">{message}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xs text-gray-400">
                  <span>{formattedDate}</span>
                </p>
                {!notification.isRead && (
                  <span className="text-xs text-white bg-red-500 rounded-full px-2 py-1">
                    {unreadCount} 
                  </span>
                )}
              </div>
            </div>
          );
        })
      )}
      {notifications.length > 5 && (
        <div className="text-center mt-2 text-sm text-blue-500 cursor-pointer" onClick={handleNotificationClick}>
          View All Notifications
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
