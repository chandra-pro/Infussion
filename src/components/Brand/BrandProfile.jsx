import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';

const BrandProfile = () => {
  const [brandProfileData, setBrandProfileData] = useState({
    brandName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchProfile = async () => {
    const token = localStorage.getItem('brandToken');
    try {
      const response = await axios.get(`${baseUrl}/api/brand/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBrandProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrandProfileData({
      ...brandProfileData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('brandToken');
    try {
      const response = await axios.put(`${baseUrl}/api/brand/profile`, brandProfileData, {
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

  return (
    <div className="p-4 bg-white">
      <main className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="md:w-1/3 bg-gray-100 p-4 rounded">
            <div className="flex flex-col items-center">
            <img
                  src={`${baseUrl}/${brandProfileData.brandLogo}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              <button className="text-orange-500 mt-2">Update photo</button>
              <div className="mt-4 text-center">
                <h2 className="text-xl font-bold">{brandProfileData.brandName}</h2>
                <p className="text-gray-600">{brandProfileData.email}</p>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <MdRefresh className="text-gray-500" />
                <button className="text-gray-500 text-sm" onClick={fetchProfile}>
                  Last update: Invalid date. Click to refresh
                </button>
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
                  <label className="block font-bold mb-1">Brand Name</label>
                  <input
                    type="text"
                    name="brandName"
                    value={brandProfileData.brandName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="border-b-2 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={brandProfileData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="border-b-2 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={brandProfileData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="border-b-2 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-1">Address</label>
                  <textarea
                    name="address"
                    value={brandProfileData.address}
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

export default BrandProfile;
