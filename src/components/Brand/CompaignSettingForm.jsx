import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';

const CampaignSettingForm = () => {
  const [formData, setFormData] = useState({
    campaignName: '',
    brandName: '',
    interest: '',
    platform: '',
    minFollowers: '',
    maxFollowers: '',
    incentives: '',
    description: '',
    campaignImage: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { refreshAccessToken } = useUserAuth();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const history = useNavigate();

  const interests = ['Technology', 'Fashion', 'Health', 'Travel'];
  const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, campaignImage: e.target.files[0] });
  };

  const validate = () => {
    let tempErrors = {};
    for (let key in formData) {
      if (!formData[key] && key !== 'campaignImage') {
        tempErrors[key] = 'This field is required';
      }
    }
    if (!formData.campaignImage) {
      tempErrors.campaignImage = 'Campaign image is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    setLoading(true);

    try {
      const token = await refreshAccessToken('brand');
      const response = await fetch(`${baseUrl}/api/campaign/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        history('/brand/dashboard'); // Redirect to the dashboard or another page
      } else {
        setErrors({ server: data.message || 'Something went wrong' });
      }
    } catch (error) {
      setLoading(false);
      setErrors({ server: 'Server error' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-4xl font-bold opacity-80 mb-5">Campaign Form</h1>
        {errors.server && <p className="text-red-500">{errors.server}</p>}
        <div>
          <label className="block text-gray-700 font-bold">Campaign Name</label>
          <input
            type="text"
            name="campaignName"
            value={formData.campaignName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.campaignName && <p className="text-red-500">{errors.campaignName}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Brand Name</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.brandName && <p className="text-red-500">{errors.brandName}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Interest</label>
          <select
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Interest</option>
            {interests.map((interest, index) => (
              <option key={index} value={interest}>
                {interest}
              </option>
            ))}
          </select>
          {errors.interest && <p className="text-red-500">{errors.interest}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Platform</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Platform</option>
            {platforms.map((platform, index) => (
              <option key={index} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          {errors.platform && <p className="text-red-500">{errors.platform}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Min Followers</label>
          <select
            name="minFollowers"
            value={formData.minFollowers}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Min Followers</option>
            {[...Array(10).keys()].map((i) => (
              <option key={i} value={(i + 1) * 1000}>
                {(i + 1) * 1000}
              </option>
            ))}
          </select>
          {errors.minFollowers && <p className="text-red-500">{errors.minFollowers}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Max Followers</label>
          <select
            name="maxFollowers"
            value={formData.maxFollowers}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Max Followers</option>
            {[...Array(10).keys()].map((i) => (
              <option key={i} value={(i + 1) * 20000}>
                {(i + 1) * 20000}
              </option>
            ))}
          </select>
          {errors.maxFollowers && <p className="text-red-500">{errors.maxFollowers}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Incentives</label>
          <input
            type="text"
            name="incentives"
            value={formData.incentives}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.incentives && <p className="text-red-500">{errors.incentives}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Short Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Campaign Image</label>
          <input
            type="file"
            name="campaignImage"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.campaignImage && <p className="text-red-500">{errors.campaignImage}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignSettingForm;
