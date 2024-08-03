import { useEffect } from 'react';
import {Routes, Route, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../components/Brand/UserAuthContext';
import CampaignSettingsForm from '../components/Brand/CompaignSettingForm';
import BrandProfile from '../components/Brand/BrandProfile';
import CampaignNotification from '../components/Brand/CampaignNotification';
import BrandHeroSection from '../components/Brand/BrandHeroSection';
import BrandTimeline from '../components/Brand/BrandTimeline';
import Header from '../components/Creator/Header';

const BrandDashBoard = () => {
  const navigate = useNavigate();
  const {brandUser, loading, checkTokens } = useUserAuth();

  useEffect(() => {
    checkTokens('brand');
  }, [checkTokens]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!brandUser) {
    console.log("nahi jai")
    return null;
  }

  return (
    <div className="container mx-auto p-2 relative">
   
       
        <main className={`flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0 `}>
            <Header title="brand/dashboard/notifications" userType='brand'/>
         
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <div className='my-[-10]'>
                
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Welcome, {brandUser.brandName}!</h2>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    This is your dashboard where you can manage your profile, view statistics, and more.
                  </p>
                  <BrandHeroSection title="Brands" buttonName="Get Started"/>
                  <BrandTimeline />
                </div>
              }
            />
            <Route path="/campaign-setting" element={<CampaignSettingsForm />} />
            <Route path="/brand-profile" element={<BrandProfile />} />
            <Route path="/notifications" element={<CampaignNotification />} />
            
          </Routes>
        </main>
      </div>
  
  );
};

export default BrandDashBoard;
