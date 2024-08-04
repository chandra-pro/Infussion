import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaRupeeSign } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { useUserAuth } from '../components/Brand/UserAuthContext';
import toast from 'react-hot-toast';
import { Ring } from 'react-awesome-spinners'; // Import the spinner component
import Navbar from '../components/Navbar/Navbar';

const baseUrl = import.meta.env.VITE_BASE_URL; 

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const { refreshAccessToken } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/campaign`);
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.campaigns);
      } else {
        toast.error('Failed to fetch campaigns');
      }
    } catch (error) {
      toast.error('Error fetching campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestParticipation = async (campaignId) => {
    setLoading(true);
    const token = await refreshAccessToken('creator');
    if (token) {
      try {
        const response = await fetch(`${baseUrl}/api/campaign/${campaignId}/request`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });

        if (response.ok) {
          toast.success('Participation request sent successfully!');
        } else {
          toast.error('Failed to send participation request. Please try again later.');
        }
      } catch (error) {
        toast.error('An unexpected error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Failed to send participation request. You are not signed up as a creator.');
      navigate('/creator/signup');
    }
  };

  const getImageUrl = (path) => {
    return `${baseUrl}/${path.replace(/\\/g, '/')}`;
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Campaigns</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Ring color="#000" size={60} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  className="w-full h-full object-cover"
                  src={getImageUrl(campaign.campaignImage)}
                  alt="Campaign"
                />
                <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
                <span className="absolute top-2 right-2 bg-white text-black p-1 rounded-full shadow-lg">
                  <IconContext.Provider value={{ className: 'text-blue-600' }}>
                    {campaign.platform === 'Facebook' && <FaFacebookF />}
                    {campaign.platform === 'Instagram' && <FaInstagram />}
                    {campaign.platform === 'Twitter' && <FaTwitter />}
                  </IconContext.Provider>
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-red-500">Infusion</h3>
                <h2 className="text-xl font-bold text-gray-900">{campaign.campaignName}</h2>
                <p className="text-gray-600">{campaign.brandName}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-gray-700 flex items-center">
                    <FaRupeeSign className="w-5 h-5 mr-1" />
                    {campaign.incentives}
                  </div>
                  <button
                    onClick={() => handleRequestParticipation(campaign._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Request Participation
                  </button>
                  <span
                    onClick={() => navigate('/collab-details', { state: { campaign } })}
                    className="bg-white text-black p-2 rounded-full shadow-lg cursor-pointer"
                  >
                    View More &gt;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;
