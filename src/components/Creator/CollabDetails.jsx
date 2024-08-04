import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import toast from 'react-hot-toast';
import { Ring } from 'react-awesome-spinners';

const CollabDetails = () => {
  const location = useLocation();
  const { campaign } = location.state || {};
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [loading, setLoading] = useState(false);

  if (!campaign) {
    return <div>No campaign data</div>;
  }

  const { campaignName, description, campaignImage, incentives, platform, brandName } = campaign;

  const handleInterestClick = async () => {
    setLoading(true);
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Interest registered successfully!");
    } catch (error) {
      toast.error("Failed to register interest.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center p-4 bg-white">
        <main className="w-full max-w-5xl flex flex-col lg:flex-row items-start lg:space-x-8">
          <div className="flex-shrink-0 w-full lg:w-1/3 mb-4 lg:mb-10">
            <img
              src={`${baseUrl}/${campaignImage.replace(/\\/g, '/')}`}
              alt={campaignName}
              className="w-64 h-64 rounded-full mx-auto"
            />
            <div className="flex justify-center space-x-2 mt-10">
              <div className="text-5xl">🎥</div>
              <div className="text-5xl">📷</div>
            </div>
            <h1 className="text-2xl font-bold mt-4 text-center">{brandName} Calling All Tech and Marketing Influencers</h1>
            <div className="flex justify-center items-center space-x-2 mt-2">
              <div className="text-lg font-bold">{brandName} Inc.</div>
              <div className="text-gray-600">Collaboration proposals</div>
            </div>
            <div className="flex justify-center space-x-2 mt-2">
              <div>Channels:</div>
              <div className="flex space-x-2">
                <div className="text-2xl">📺</div>
                <div className="text-2xl">📸</div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
                onClick={handleInterestClick}
                disabled={loading}
              >
                I'm Interested
              </button>
            </div>
            {loading && <Ring className="mx-auto mt-4" />}
          </div>

          <div className="w-full lg:w-2/3 text-left">
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">What's present in this offer</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Paid offer</li>
                <li>Incentive: {incentives}</li>
              </ul>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Creator Requirements</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Any location</li>
                <li>Platform: {platform}</li>
                <li>Minimum Followers: 10K</li>
                <li>Minimum Engagement: 0.5%</li>
              </ul>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">About</h2>
              <div>
                <p className="mb-2">Category: Tech</p>
                <p className="mb-2">{description}</p>
                <p className="mb-2">Key Features:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Flexible Capacity: Holds up to 15 lbs of pet food or 20 lbs of rice when unfolded, and 7 lbs of pet food or 7 lbs of rice when folded.</li>
                  <li>Airtight and Moisture-Proof: Features a silicone seal, magnetic snap, and desiccant box to keep food fresh and protected from moisture and pests.</li>
                  <li>Versatile and Expandable: Suitable for storing pet food, rice, grains, nuts, legumes, snacks, and more. Collapsible and expandable to adjust capacity as needed.</li>
                  <li>Portable and User-Friendly: Designed for portability and compactness, perfect for use in your car or truck.</li>
                  <li>Space-saving: Design that is able to be separated when stored, ideal for small apartments or homes.</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CollabDetails;
