// src/HomePage.jsx
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter ,FaRupeeSign } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { useUserAuth } from '../Brand/UserAuthContext';



const HomePage = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL; 
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
        console.error('Failed to fetch campaigns');
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestParticipation = async (campaignId) => {
    setLoading(true);

    try {
      const token = await refreshAccessToken('creator');
      console.log("tokennn",token);
      const response = await fetch(`${baseUrl}/api/campaign/${campaignId}/request`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        alert('Participation request sent successfully!');
      } else {
        alert('Failed to send participation request. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending participation request:', error);
      alert('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  
  const getImageUrl = (path) => {
   
    return `${baseUrl}/${path.replace(/\\/g, '/')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
    <h1 className='text-3xl font-bold'>Brand Collaborations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        {campaigns.map((campaign, index) => (
                   <div key={campaign._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                   <div className="relative h-64">
                     <img
                       className="w-full h-full object-cover"
                       src={getImageUrl(campaign.campaignImage)}
                       alt="Performance"
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
                         onClick={() =>handleRequestParticipation(campaign._id)}
                         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                       >
                         Request
                       </button>
                       <span
                         onClick={() => navigate('/collab-details', { state: { campaign} })}
                         className="bg-white text-black p-2 rounded-full shadow-lg cursor-pointer"
                       >
                         View &gt;
                       </span>
                     </div>
                   </div>
                 </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
