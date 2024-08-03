/* eslint-disable react/prop-types */
import { useState } from 'react';
import SignupStep from './SignupStep';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useUserAuth } from "./UserAuthContext";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const baseUrl = import.meta.env.VITE_BASE_URL;

const SignupStep2 = ({ formData, nextStep, prevStep }) => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptcha } = useUserAuth();
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState(''); // State for verification error
  const [isVerified, setIsVerified] = useState(false); // State to track if phone number is verified
  const defaultCountry = "IN";

  const handlePhoneNumberChange = (e) => {
    const phoneNumber = parsePhoneNumberFromString(e.target.value, defaultCountry);
    setNumber(e.target.value);
  };






  const sendVerificationCode = async () => {
    setIsVerifying(true);
    setVerificationError(''); // Clear error before sending
    
    if (number === "" || number === undefined) {
      setVerificationError("Please enter a valid phone number!");
      setIsVerifying(false);
      return;
    }

    try {
      const phoneNumber = "+91" + number;
      const response = await setUpRecaptcha(phoneNumber);
      console.log("response of otp",response);
      setResult(response);
      console.log(`Sent verification code to ${phoneNumber}`); // Replace with actual sending
      setIsVerifying(false);
    } catch (error) {
      console.log("msg", error.message);
      setIsVerifying(false);
      setVerificationError('An error occurred while sending the code. Please try again.',error.message);
    }
  };

  const handleVerify = async () => {
    if (verificationCode !== '' || verificationCode === null) {
      try {
        await result.confirm(verificationCode);
        const response = await fetch( `${baseUrl}/auth/numberVerification?phone=${number}`, { method: 'POST' });
        const data = await response.json();
        setIsVerified(true); // Set verified to true
        nextStep({ ...formData, phone: number });
      } catch (err) {
        setVerificationError(err.message);
      }
    } else {
      setVerificationError('Invalid verification code. Please try again.');
    }
  };

  return (
    <SignupStep
      title="Phone Verification"
      prevStep={prevStep}
      nextStep={handleVerify}
      // Disable Next button until verified
    >
      <label htmlFor="phone-number" className="block mb-2 text-sm font-medium">
        Phone Number
      </label>
      <input
        type="tel"
        id="phone-number"
        name="phone-number"
        className="w-1/2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={number}
        onChange={handlePhoneNumberChange}
        required
      />
      {verificationError && <p className="text-red-500 text-sm mb-2">{verificationError}</p>}
      <button
        type="button"
        className="btn btn-primary mt-4 w-full"
        disabled={isVerifying}
        onClick={sendVerificationCode}
      >
        {isVerifying ? 'Sending...' : 'Send Verification Code'}
      </button>
      <label htmlFor="verification-code" className="block mt-4 text-sm font-medium">
        Verification Code
      </label>
      <input
        type="text"
        id="verification-code"
        name="verification-code"
        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={verificationCode}
        onChange={(event) => setVerificationCode(event.target.value)}
        required
        disabled={!number} // Disable verification code input if phone number is empty
      />
      <div id="recaptcha-container"></div>
    </SignupStep>
  );
};

export default SignupStep2;
