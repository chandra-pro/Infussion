/* eslint-disable no-unused-vars */
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import BrandHome from './pages/BrandHome';
import BrandLogin from './pages/BrandLogin';
import BrandSignup from './pages/BrandSignup';
import CreatorDashboard from './pages/CreatorDashboard';
import BrandDashBoard from './pages/BrandDashboard';
import { UserAuthContextProvider } from './components/Brand/UserAuthContext';
import Collaborate from './pages/Collaborate';
import CreatorSignupForm from './pages/CreatorSignup';
import CollabDetails from './components/Creator/CollabDetails';
import CreatorLogin from './pages/CreatorLogin';
import CreatorDetails from './components/Creator/CreatorDetails';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      
      <UserAuthContextProvider>
        <Toaster />
      <Routes>
          <Route path="/" element={<BrandHome/>} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/creator/dashboard/*" element={<CreatorDashboard/>} />
          <Route path="/brand/dashboard/*" element={<BrandDashBoard/>} />
          <Route path="/brand/login" element={<BrandLogin/>} />
          <Route path="/brand/signup" element={<BrandSignup/>} />
          <Route path="/creator/signup" element={<CreatorSignupForm/>} />
          <Route path="/creator/login" element={<CreatorLogin/>} />
          <Route path="/collaborate" element={<Collaborate />}/>
          <Route path='/collab-details' element={<CollabDetails />}/>
          <Route path='/creator-details' element={<CreatorDetails/>}/>
          
        </Routes>
        </UserAuthContextProvider>
     
    </div>
    // </Router>
  )
}

export default App
