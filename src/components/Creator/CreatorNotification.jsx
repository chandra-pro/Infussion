import { useEffect, useState } from 'react';
import { useUserAuth } from '../Brand/UserAuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Ring } from 'react-awesome-spinners';

const CreatorNotification = () => {
  const { refreshAccessToken } = useUserAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const token = await refreshAccessToken('creator');
        console.log("Token refresh:", token);

        const response = await fetch(`${baseUrl}/api/creator/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Notifications:", data);

        setNotifications(data.notifications); // Ensure data structure is correct
        toast.success('Notifications fetched successfully');
      } catch (error) {
        toast.error('Error fetching notifications');
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [refreshAccessToken, baseUrl]);

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {loading ? (
        <Ring />
      ) : notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification._id} className="p-4 border rounded-lg shadow-sm">
              <p className="text-lg font-semibold">
                {notification.type === 'approval' ? 'Approved' : 'Rejected'}
              </p>
              <p>{notification.message}</p>
              <span className="text-sm text-gray-500">{new Date(notification.date).toLocaleString()}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No notifications found</p>
      )}
    </div>
  );
};

export default CreatorNotification;
