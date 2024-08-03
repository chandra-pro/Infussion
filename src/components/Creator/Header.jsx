import React, { useState } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Brand/UserAuthContext';

const Header = ({ title, userType }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {logOut} =useUserAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const bellNotification = () => {
    navigate(`/${title}`);
  };

  const handleLogout = async () => {
    try {
      await logOut('creator');
      navigate('creator/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className="text-xl font-bold cursor-pointer" onClick={()=>{
        navigate('/');
      }}>Infussion</h1>
      <div className="flex items-center space-x-4">
        <FaBell className="h-6 w-6 cursor-pointer" onClick={bellNotification} />
        <div className="relative">
          <FaUser className="h-6 w-6 cursor-pointer" onClick={toggleMenu} />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
              <Link to={`/${userType}/dashboard/${userType}-profile`} className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                Profile
              </Link>

              {userType === 'brand' && (
                <>
                  <Link to={`/${userType}/dashboard/campaign-setting`} className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                    Campaign Setting
                  </Link>
                 
                </>
              )}
               <Link to={`/${userType}/dashboard/notifications`} className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                    Notification
                  </Link>
                  <button
                className="block w-full px-4 py-2 text-gray-800 bg-red-500 hover:bg-red-600"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
