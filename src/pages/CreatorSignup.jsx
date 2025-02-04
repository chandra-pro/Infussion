import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../components/Brand/UserAuthContext';
import Navbar from '../components/Navbar/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import { Ring } from 'react-awesome-spinners';

const socialMediaOptions = ['Instagram', 'YouTube', 'TikTok', 'Twitter', 'Facebook'];

const CreatorSignupForm = () => {
  const { setCreatorUser } = useUserAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    niche: '',
    socialMediaHandles: [],
    profilePicture: null,
  });
  const [newSocialMediaHandle, setNewSocialMediaHandle] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(socialMediaOptions[0]);
  const [loding, setloding] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddSocialMediaHandle = () => {
    if (newSocialMediaHandle.trim() !== '') {
      setFormData((prevData) => ({
        ...prevData,
        socialMediaHandles: [...prevData.socialMediaHandles, { platform: selectedPlatform, handle: newSocialMediaHandle.trim() }],
      }));
      setNewSocialMediaHandle('');
    }
  };

  const handleOtpRequest = async (e) => {
    e.preventDefault();
    setloding(true);

    try {
      const response = await fetch(`${baseUrl}/api/creator/request-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      setloding(false);
      if (response.ok) {
        setIsOtpSent(true);
        toast.success('OTP sent successfully!');
      } else {
        toast.error(`OTP request failed: ${data.message}`);
      }
    } catch (error) {
      toast.error('Error during OTP request');
      console.error('Error during OTP request:', error);
    } finally {
      setloding(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setloding(true);

    try {
      const response = await fetch(`${baseUrl}/api/creator/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const data = await response.json();
      setloding(false);
      if (response.ok) {
        setOtpVerified(true);
        toast.success('OTP verified successfully!');
      } else {
        toast.error(`OTP verification failed: ${data.message}`);
      }
    } catch (error) {
      toast.error('Error during OTP verification');
      console.error('Error during OTP verification:', error);
    } finally {
      setloding(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      toast.error('Please verify OTP before submitting');
      return;
    }
    setloding(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('niche', formData.niche);
    formDataToSend.append('profilePicture', formData.profilePicture);
    formDataToSend.append('socialMediaHandles', JSON.stringify(formData.socialMediaHandles));

    try {
      const response = await fetch(`${baseUrl}/api/creator/signup`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      setloding(false);
      if (response.ok) {
        localStorage.setItem('creatorUser', JSON.stringify(data.Creator));
        localStorage.setItem('creatorToken', data.accessToken);
        localStorage.setItem('creatorRefreshToken', data.refreshToken);
        await setCreatorUser(data.Creator);
        navigate('/creator/dashboard');
        toast.success('Signup successful!');
      } else if (response.status === 409) {
        navigate('/creator/login');
        toast.error('Email already exists, please login');
      } else {
        toast.error(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      toast.error('Error during signup');
      console.error('Error during signup:', error);
    } finally {
      setloding(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Creator Signup</h1>
      
      {!isOtpSent ? (
        <form onSubmit={handleOtpRequest}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-3/4 md:w-1/2 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loding}
            >
              {loding ? <Ring /> : 'Request OTP'}
            </button>
          </div>
        </form>
      ) : !otpVerified ? (
        <form onSubmit={handleOtpVerification}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
              OTP
            </label>
            <input
              type="text"
              name="otp"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="shadow appearance-none border rounded w-3/4 md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loding}
            >
              {loding ? <Ring /> : 'Verify OTP'}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-3/4 md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-3/4 md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-3/4 md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="niche">
              Niche
            </label>
            <input
              type="text"
              name="niche"
              id="niche"
              value={formData.niche}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-3/4 md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 md:ml-80">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="socialMediaHandles">
              Social Media Handles
            </label>
            <div className="flex mb-2 md:w-3/4 w-full">
              <select
                name="platform"
                id="platform"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 md:w-1/10 w-1/20"
              >
                <option value="" disabled>Select Platform</option>
                {socialMediaOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="newSocialMediaHandle"
                id="newSocialMediaHandle"
                value={newSocialMediaHandle}
                onChange={(e) => setNewSocialMediaHandle(e.target.value)}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1 w-3/4"
              />
              <button
                type="button"
                onClick={handleAddSocialMediaHandle}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              >
                Add
              </button>
            </div>
            <ul>
              {formData.socialMediaHandles.map((handle, index) => (
                <li key={index} className="mb-2">
                  <span className="font-bold">{handle.platform}:</span> {handle.handle}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePicture"
              id="profilePicture"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-3/4 md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loding}
            >
              {loding ? <Ring /> : 'Sign Up'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreatorSignupForm;
