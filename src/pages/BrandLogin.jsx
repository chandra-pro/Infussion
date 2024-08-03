import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
// import BackgroundSlider from './components/BackgroundSlider'; // Import if needed

const BrandLogin = () => {
  // State for login form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    verificationCode: '',
  });

  // State for error messages
  const [errors, setErrors] = useState({});

  // State for verification loading indicator
  const [isVerifying, setIsVerifying] = useState(false);

  // Function to handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' }); // Clear error on change
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Function to simulate sending verification code (replace with actual backend logic)
  const sendVerificationCode = async () => {
    setIsVerifying(true);
    setErrors({ ...errors, verificationCode: '' }); // Clear error before sending

    try {
      // Simulate sending code to server (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      console.log(`Sent verification code to ${formData.phoneNumber}`); // Replace with actual sending
      setIsVerifying(false);
    } catch (error) {
      setIsVerifying(false);
      setErrors({ verificationCode: 'An error occurred while sending the code. Please try again.' });
    }
  };

  // Function to handle verification code submission (replace with actual verification logic)
  const handleVerify = () => {
    if (formData.verificationCode === '123456') { // Replace with actual verification logic
      // Login successful, redirect or display success message (replace with actual logic)
      console.log('Login successful');
    } else {
      setErrors({ verificationCode: 'Invalid verification code. Please try again.' });
    }
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const newErrors = {};
    let isValid = true;

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    // Validate phone number verification if phone number is provided
    if (formData.phoneNumber && !isVerifying && !formData.verificationCode) {
      newErrors.verificationCode = 'Please enter verification code or remove phone number';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // Perform actual login logic here (e.g., API call, authentication)
      console.log('Login data:', formData);
      // Redirect to dashboard or display success message (replace with actual logic)
    }
  };

  return (
    <div className="flex h-screen">
      {/* Include BackgroundSlider if needed */}
      <Navbar />
      <div className="flex-grow flex justify-center items-center px-4">
        <div className="bg-white p-8 rounded-md shadow-md mt-16 max-w-sm">
          <h2 className="text-2xl font-medium mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

            {formData.phoneNumber && (
              <>
                <button
                  type="button"
                  className="w-full bg-blue-500 text-white py-2 rounded-md mb-4"
                  onClick={sendVerificationCode}
                  disabled={isVerifying}
                >
                  {isVerifying ? 'Sending...' : 'Send Verification Code'}
                </button>

                <label htmlFor="verificationCode" className="block mb-2 text-sm font-medium">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  value={formData.verificationCode}
                  onChange={handleChange}
                />
                {errors.verificationCode && <p className="text-red-500 text-sm">{errors.verificationCode}</p>}

                <button
                  type="button"
                  className="w-full bg-blue-500 text-white py-2 rounded-md mb-4"
                  onClick={handleVerify}
                >
                  Verify Code
                </button>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Dont have an account?{' '}
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={()=>{}}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandLogin;

