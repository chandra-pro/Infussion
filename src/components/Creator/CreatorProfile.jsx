import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdLocationOn, MdRefresh } from 'react-icons/md';

const CreatorProfile = () => {
  const [creatorProfileData, setCreatorProfileData] = useState({
    name: '',
    bio: '',
    city: '',
    phone: '',
    tags: [],
    profilePicture: ''
  });
  const [availableTags] = useState(['Tech', 'Marketing', 'Lifestyle', 'Travel', 'Food']);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreatorProfileData({
      ...creatorProfileData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('creatorToken');
    try {
      const response = await axios.put(`${baseUrl}/api/creator/profile`, creatorProfileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Profile updated successfully:', response.data);
      setIsEditing(false);
      // Optionally, fetch the profile again to update the state with the latest data
      // fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const toggleTag = (tag) => {
    const newTags = creatorProfileData.tags.includes(tag)
      ? creatorProfileData.tags.filter((t) => t !== tag)
      : [...creatorProfileData.tags, tag];
    setCreatorProfileData({
      ...creatorProfileData,
      tags: newTags,
    });
  };

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

              <button className="text-orange-500 mt-2">Update photo</button>
              <div className="mt-4 text-center">
                <h2 className="text-xl font-bold">{creatorProfileData.name}</h2>
                <p className="text-gray-600 flex items-center justify-center">
                  <MdLocationOn className="mr-1" />
                  {creatorProfileData.city}
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <MdRefresh className="text-gray-500" />
                <button className="text-gray-500 text-sm" onClick={()=>fetchProfile}>Last update: Invalid date. Click to refresh</button>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="bg-white p-4 rounded shadow relative">
              {!isEditing && (
                <FaEdit
                  onClick={handleEdit}
                  className="text-blue-500 text-xl cursor-pointer absolute top-4 right-4"
                />
              )}
              <form onSubmit={handleSave}>
                <div className="mb-4">
                  <label className="block font-bold mb-1">Profile Name</label>
                  <input
                    type="text"
                    name="name"
                    value={creatorProfileData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="border-b-2 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-1">Bio</label>
                  <input
                    type="text"
                    name="bio"
                    value={creatorProfileData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="border-b-2 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-1">Profile Tags</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full ${
                          creatorProfileData.tags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        } ${!isEditing && 'cursor-not-allowed'}`}
                        disabled={!isEditing}
                      >
                        {tag}
                      </button>
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
                  <input
                    type="text"
                    name="city"
                    value={creatorProfileData.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="border-b-2 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-1">Phone (Only visible to users you are negotiating collaborations with)</label>
                  <input
                    type="text"
                    name="phone"
                    value={creatorProfileData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="border-b-2 p-2 w-full"
                  />
                </div>
                {isEditing && (
                  <div className="flex items-center justify-center mt-4">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                      Save
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorProfile;



