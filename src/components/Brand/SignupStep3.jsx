import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupStep from './SignupStep';
import { useUserAuth } from './UserAuthContext';
import toast from 'react-hot-toast';
import { Ring } from 'react-awesome-spinners';

const SignupStep3 = ({ formData, setFormData }) => {
  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState(null);
  const [companyType, setCompanyType] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setBrandUser } = useUserAuth();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async () => {
    const newErrors = {};

    if (!brandName.trim()) {
      newErrors.brandName = 'Brand Name is required';
    }
    if (!brandLogo) {
      newErrors.brandLogo = 'Brand Logo is required';
    }
    if (!companyType) {
      newErrors.companyType = 'Company Type is required';
    }
    if (!gstNo.trim()) {
      newErrors.gstNo = 'GST Number is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedFormData = { ...formData, brandName, companyType, gstNo };
    const formDataToSend = new FormData();
    for (const key in updatedFormData) {
      if (Object.prototype.hasOwnProperty.call(updatedFormData, key)) {
        formDataToSend.append(key, updatedFormData[key]);
      }
    }
    formDataToSend.append('brandLogo', brandLogo);

    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/brand/signup`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success('Signup complete');
        localStorage.setItem('brandToken', data.accessToken);
        localStorage.setItem('brandRefreshToken', data.refreshToken);
        localStorage.setItem('brandUser', JSON.stringify(data.user));
        setBrandUser(data.user);
        navigate('/brand/dashboard');
      } else {
        setErrors({ server: data.message || 'Something went wrong' });
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setLoading(false);
      setErrors({ server: 'Server error' });
      toast.error('Server error');
    }
  };

  return (
    <SignupStep title="Additional Info" nextStep={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="brandName" className="block text-sm font-medium mb-1">
          Brand Name
        </label>
        <input
          type="text"
          id="brandName"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        {errors.brandName && <p className="text-red-500 text-sm">{errors.brandName}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="brandLogo" className="block text-sm font-medium mb-1">
          Brand Logo
        </label>
        <input
          type="file"
          id="brandLogo"
          className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setBrandLogo(e.target.files[0])}
        />
        {errors.brandLogo && <p className="text-red-500 text-sm">{errors.brandLogo}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="companyType" className="block text-sm font-medium mb-1">
          Company Type
        </label>
        <select
          id="companyType"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={companyType}
          onChange={(e) => setCompanyType(e.target.value)}
        >
          <option value="">Select Company Type</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
          <option value="LLP">LLP</option>
          <option value="Sole Proprietorship">Sole Proprietorship</option>
        </select>
        {errors.companyType && <p className="text-red-500 text-sm">{errors.companyType}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="gstNo" className="block text-sm font-medium mb-1">
          GST Number
        </label>
        <input
          type="text"
          id="gstNo"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={gstNo}
          onChange={(e) => setGstNo(e.target.value)}
        />
        {errors.gstNo && <p className="text-red-500 text-sm">{errors.gstNo}</p>}
      </div>

      {loading && <Ring className="mx-auto" />}
      {errors.server && <p className="text-red-500 text-sm">{errors.server}</p>}
    </SignupStep>
  );
};

export default SignupStep3;
