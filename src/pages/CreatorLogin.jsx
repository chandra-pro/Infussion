import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // or 'react-router' depending on your version
import { Toaster, toast } from 'react-hot-toast';

const CreatorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL; 
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Replace the URL with your login API endpoint
      const response = await axios.post(`${baseUrl}/api/creator/login`, { email, password });

      const { accessToken, refreshToken, Creator } = response.data;

      if (accessToken && refreshToken && Creator) {
        localStorage.setItem('creatorUser', JSON.stringify(Creator));
        localStorage.setItem('creatorToken', accessToken);
        localStorage.setItem('creatorRefreshToken', refreshToken);



        toast.success('Login successful');
        navigate('/creator/dashboard'); // Redirect to dashboard or any other page
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.data.message === 'Redirect to SignUP') {
        toast.error('User not found. Redirecting to signup...');
        navigate('/creator/signup'); // Redirect to signup page
      } else {
        toast.error('Invalid credentials or server error.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
         
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm mr-2"></span>
            ) : null}
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatorLogin;
