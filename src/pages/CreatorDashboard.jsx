import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUserAuth } from '../components/Brand/UserAuthContext';
import HomePage from '../components/Creator/HomePage';

import BrandHeroSection from '../components/Brand/BrandHeroSection';
import Header from '../components/Creator/Header';
import CreatorNotification from '../components/Creator/CreatorNotification';
import CreatorProfile from '../components/Creator/CreatorProfile';


const CreatorDashboard = () => {
  const { creatorUser, loading, checkTokens } = useUserAuth();
  const token = localStorage.getItem('creatorRefreshToken');
  console.log("Tokenss:", token);

  useEffect(() => {
    checkTokens('creator');
  }, [checkTokens]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!creatorUser) {
    return null;
  }

  return (
    <div>
      <main className={`flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0`}>
        <Header title="creator/dashboard/notifications" userType="creator" />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className='my-[-10]'></div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Welcome, {creatorUser?.name}!</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  This is your dashboard where you can manage your profile, view statistics, and more.
                </p>
                <BrandHeroSection title="Creator" buttonName="Collab" />
                <HomePage />
              
              </div>
            }
          />
          <Route path="/creator-profile" element={<CreatorProfile />} />
          <Route path="/notifications" element={<CreatorNotification />} />
        </Routes>
      </main>
    </div>
  );
};

export default CreatorDashboard;
