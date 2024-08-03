import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdLocationOn, MdRefresh } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const CreatorDetails = () => {
  const location = useLocation();
  const { creator } = location.state || {};

 

  const [creatorProfileData, setCreatorProfileData] = useState({
    name: '',
    bio: '',
    city: '',
    phone: '',
    tags: [],
    profilePicture: ''
  });
  const [availableTags] = useState(['Tech', 'Marketing', 'Lifestyle', 'Travel', 'Food']);
  const baseUrl = import.meta.env.VITE_BASE_URL; 

  const fetchProfile = async () => {
    const token = localStorage.getItem('creatorToken');
    try {
      const response = await axios.get(`${baseUrl}/api/creator/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCreatorProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!creator) {
    return <div>No creator data available</div>;
  }

  return (
    <div className="p-4 bg-white">
      <main className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="md:w-1/3 bg-gray-100 p-4 rounded">
            <div className="flex flex-col items-center">
              <img
                src={`${baseUrl}/${creatorProfileData.profilePicture}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <button className="text-orange-500 mt-2" disabled>Update photo</button>
              <div className="mt-4 text-center">
                <h2 className="text-xl font-bold">{creatorProfileData.name}</h2>
                <p className="text-gray-600 flex items-center justify-center">
                  <MdLocationOn className="mr-1" />
                  {creatorProfileData.city}
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <MdRefresh className="text-gray-500" />
                <button className="text-gray-500 text-sm" onClick={fetchProfile}>Last update: {new Date().toLocaleDateString()}</button>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="bg-white p-4 rounded shadow relative">
              <form>
                <div className="mb-4">
                  <label className="block font-bold mb-1">Profile Name</label>
                  <p className="border-b-2 p-2 w-full">{creatorProfileData.name}</p>
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-1">Bio</label>
                  <p className="border-b-2 p-2 w-full">{creatorProfileData.bio}</p>
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-1">Profile Tags</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {availableTags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-4 py-2 rounded-full ${
                          creatorProfileData.tags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <label className="block font-bold mb-1">Selected Tags</label>
                  <div className="mt-2">
                    {creatorProfileData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-1">Location (city)</label>
                  <p className="border-b-2 p-2 w-full">{creatorProfileData.city}</p>
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-1">Phone (Only visible to users you are negotiating collaborations with)</label>
                  <p className="border-b-2 p-2 w-full">{creatorProfileData.phone}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorDetails;
