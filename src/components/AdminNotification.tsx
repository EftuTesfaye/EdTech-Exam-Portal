import React, { useEffect, useState } from "react";
import {
  AdminNotificationDto,
  fetchAdminNotifications,
  resetAdminNotifications,
} from "../DataService/adminNotification.service";

export default function AdminNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotificationDto[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminNotificationsFromServer();
  }, []);

  const fetchAdminNotificationsFromServer = async () => {
    const data = await fetchAdminNotifications();
    if (data.length === 0) {
      setMessage("No new notifications");
      return;
    }
    setNotifications(data);
  };

  const handleNotificationClick = async () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      if (notifications.length > 0) {
        // Filter out undefined values
        const ids = notifications
          .map((n) => n._id)
          .filter((id): id is string => id !== undefined); // Type guard to ensure only strings are in ids
        await resetAdminNotifications(ids);
        setNotifications([]);
      }
    }
  };

  return (
    <div className="relative">
      <div
        onClick={handleNotificationClick}
        className="cursor-pointer relative p-3 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-600 transition"
      >
        <i className="far fa-bell text-lg"></i>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </div>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-96 md:w-1/4 lg:w-1/6 bg-gray-900 text-white border shadow-lg rounded-lg p-3 transition ease-in-out duration-200 z-50`}>
          <h2 className="text-lg font-semibold mb-2">New Notifications</h2>
          <div className="max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="py-2 px-3 mb-2 border-b last:border-none flex justify-between items-center text-sm"
                >
                  <div>
                    <h4 className="font-semibold">{notification?.clerkId?.username || "System Admin"}</h4>
                    <p className="text-gray-300">{`Inserted ${notification.count} questions`}</p>
                  </div>
                  <div className="text-gray-400">•</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 text-center mt-4">No new notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}