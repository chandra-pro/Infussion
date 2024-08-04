import React, { useEffect, useState } from 'react';
import { useUserAuth } from './UserAuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Ring } from 'react-awesome-spinners';

const CampaignNotification = () => {
  const { brandUser, refreshAccessToken } = useUserAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const token = await refreshAccessToken('brand');
        const response = await fetch(`${baseUrl}/api/campaign/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (response.ok) {
          setNotifications(data.campaigns);
        } else {
          setError(data.message);
          toast.error(data.message);
        }
      } catch (error) {
        setError('Failed to fetch notifications');
        toast.error('Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [baseUrl, refreshAccessToken]);

  const sendEmail = async (creatorEmail) => {
    try {
      await fetch(`${baseUrl}/api/campaign/send-order-confirmation-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customerEmail: creatorEmail })
      });
      toast.success('Email sent successfully!');
    } catch (error) {
      setError('Failed to send email');
      toast.error('Failed to send email');
    }
  };

  const handleApprove = async (campaignId, influencerId, creatorEmail) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/campaign/${campaignId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('brandToken')}`
        },
        body: JSON.stringify({ influencerId })
      });
      const data = await response.json();
      await sendEmail(creatorEmail);

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((campaign) =>
            campaign._id === campaignId
              ? {
                  ...campaign,
                  requestedCreators: campaign.requestedCreators.filter((creator) => creator._id !== influencerId)
                }
              : campaign
          )
        );
        toast.success('Influencer approved successfully!');
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      setError('Failed to approve influencer');
      toast.error('Failed to approve influencer');
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async (campaignId, influencerId) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/campaign/${campaignId}/decline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('brandToken')}`
        },
        body: JSON.stringify({ influencerId })
      });
      const data = await response.json();

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((campaign) =>
            campaign._id === campaignId
              ? {
                  ...campaign,
                  requestedCreators: campaign.requestedCreators.filter((creator) => creator._id !== influencerId)
                }
              : campaign
          )
        );
        toast.success('Influencer declined successfully!');
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      setError('Failed to decline influencer');
      toast.error('Failed to decline influencer');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (creator) => {
    navigate('/creator-details', { state: { creator } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Ring color="#000" size={60} />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className='z-50 flex flex-col min-h-screen p-4'>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="mt-4 text-gray-600 dark:text-gray-400">No new notifications</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {notifications.map((campaign) => (
            <li key={campaign._id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{campaign.campaignName}</h3>
              <p className="text-gray-600 dark:text-gray-400">Requested by:</p>
              <ul className="ml-4 mt-2 space-y-2">
                {campaign.requestedCreators.map((creator) => (
                  <li key={creator._id} className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">{creator.name}</span>
                    <button
                      onClick={() => handleViewDetails(creator)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md"
                    >
                      View More
                    </button>
                    <button
                      onClick={() => handleApprove(campaign._id, creator._id, creator.email)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(campaign._id, creator._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Decline
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CampaignNotification;
