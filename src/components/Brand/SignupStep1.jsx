/* eslint-disable react/prop-types */
import { useState } from 'react';
import SignupStep from './SignupStep.jsx';

const SignupStep1 = ({ nextStep }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({}); // State for error messages

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' }); // Clear error on change
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleNext = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      nextStep(formData); // Call nextStep with verified data
    }
  };

  return (
    <SignupStep title="Step 1: Basic Info" nextStep={handleNext}>
      {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
      <label htmlFor="name" className="block mb-2 text-sm font-medium">
        Full Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={formData.name}
        onChange={handleChange}
        required
      />
      {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
      <label htmlFor="email" className="block mt-4 text-sm font-medium">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
      <label htmlFor="password" className="block mt-4 text-sm font-medium">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={formData.password}
        onChange={handleChange}
        required
      />
       <p className="text-center mt-4 text-sm">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </SignupStep>
  );
};

export default SignupStep1;
