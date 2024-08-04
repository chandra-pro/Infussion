import React, { useState } from 'react';
import BackgroundSlider from '../components/Brand/BackgroundSlider';
import SignupStep1 from '../components/Brand/SignupStep1';
import SignupStep2 from '../components/Brand/SignupStep2';
import SignupStep3 from '../components/Brand/SignupStep3';
import Navbar from '../components/Navbar/Navbar';

const BrandSignup = () => {
  const [currentStep, setCurrentStep] = useState(1); // Initial step
  const [formData, setFormData] = useState({}); // State to store signup data

  const handleNext = (stepData) => {
    setFormData({ ...formData, ...stepData }); // Update data with each step
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const getSignupStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SignupStep1
            nextStep={(data) => handleNext(data)}
          />
        );
      case 2:
        return (
          <SignupStep2
            formData={formData}
            nextStep={handleNext}
            prevStep={handlePrev}
          />
        );
      case 3:
        return (
          <SignupStep3
            formData={formData}
            nextStep={() => { /* Final callback (e.g., redirect) */ }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
    <div className="flex flex-col h-screen overflow-y-auto">
      <BackgroundSlider />
      <div className="flex-grow flex justify-center items-start px-4 z-10" style={{ marginTop: '-10vh' }}>
        <div className="w-full max-w-md bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
          {getSignupStep()}
        </div>
      </div>
    </div>
    </div>
  );
};

export default BrandSignup;
