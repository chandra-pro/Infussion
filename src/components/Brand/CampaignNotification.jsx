import React, { useEffect, useState } from 'react';
import { useUserAuth } from './UserAuthContext';
import { useNavigate } from 'react-router-dom';

const CampaignNotification = () => {
  const { brandUser,refreshAccessToken } = useUserAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await refreshAccessToken('brand');
        console.log("tokennn",token);
        const response = await fetch(`${baseUrl}/api/campaign/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log("DAATaaaaaa",data);

        if (response.ok) {
          setNotifications(data.campaigns);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to fetch notifications');
      }
      setLoading(false);
    };


      fetchNotifications();
    
  }, []);


 

  const sendEmail=async (creatorEmail)=>{
    try{
      await fetch(`${baseUrl}/api/campaign/send-order-confirmation-email`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customerEmail: creatorEmail }) 
      })

      console.log("repp",creatorEmail);

    }
    catch (error) {
      setError('Failed to send email');
    }  }

  const handleApprove = async (campaignId, influencerId,creatorEmail) => {
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
        // Refresh notifications after approval
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
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to approve influencer');
    }
  };

  const handleDecline = async (campaignId, influencerId,creatorEmail) => {
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
        // Refresh notifications after approval
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
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to approve influencer');
    }
  };

  const handleViewDetails = (creator) => {
    navigate('/creator-details', { state: { creator } });
  };
//   if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='z-50 flex flex-col min-h-screen'>
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
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
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
