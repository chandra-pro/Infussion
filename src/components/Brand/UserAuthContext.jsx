import { createContext, useContext, useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const userAuthContext = createContext();
const baseUrl = import.meta.env.VITE_BASE_URL;

export function UserAuthContextProvider({ children }) {
  const [brandUser, setBrandUser] = useState(() => {
    const savedUser = localStorage.getItem('brandUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [creatorUser, setCreatorUser] = useState(() => {
    const savedUser = localStorage.getItem('creatorUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);


  const navigate=useNavigate();

  // Function to refresh the access token using the refresh token
  const refreshAccessToken = async (userType) => {
    const refreshToken = localStorage.getItem(`${userType}RefreshToken`);
    console.log("refresh token",refreshToken);
    if (!refreshToken){
   console.log("bhkkk")
   return null;
    } 


    try {
      const response = await fetch(`${baseUrl}/api/${userType}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken }),
      });
      const data = await response.json();
      console.log("dtataa",data);

      if (response.ok) {
        localStorage.setItem(`${userType}Token`, data.accessToken);
        return data.accessToken;
      } else {
        navigate(`/${userType}/dashboard`);  
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      navigate(`/${userType}/signup`);
    }
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     if (currentUser) {
  //       const savedUser = localStorage.getItem('user');
  //       if (savedUser) {
  //         setUser(JSON.parse(savedUser));
  //       } else {
  //         setUser(currentUser);
  //       }
        
  //       // Check if access token is expired and refresh it if necessary
  //       const token = localStorage.getItem('token');
  //       if (token) {
  //         try {
  //           const decodedToken = jwt.decode(token);
  //           const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  //           const currentTime = Date.now();

  //           if (expirationTime - currentTime < 3600000) {
  //             // Token will expire in less than 5 minutes, refresh it
  //             await refreshAccessToken();
  //           }
  //         } catch (error) {
  //           console.error('Error decoding access token:', error);
  //         }
  //       }
  //     } else {
  //       setUser(null);
  //     }
  //     setLoading(false);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    const savedBrandUser = localStorage.getItem('brandUser');
    const savedCreatorUser = localStorage.getItem('creatorUser');
    if (savedBrandUser) {
      setBrandUser(JSON.parse(savedBrandUser));
    }
    if (savedCreatorUser) {
      setCreatorUser(JSON.parse(savedCreatorUser));
    }
    setLoading(false);
  }, []);

  const logOut = async (userType) => {
    localStorage.removeItem(`${userType}Token`);
    localStorage.removeItem(`${userType}RefreshToken`);
    localStorage.removeItem(`${userType}User`);
    return signOut(auth).then(() => {
      if (userType === 'brand') setBrandUser(null);
      if (userType === 'creator') setCreatorUser(null);
    });
  };


  // const setUpRecaptcha =async(number)=> {
  //   const recaptchaVerifier = new RecaptchaVerifier(auth,
  //      'recaptcha-container', {
  //       size: 'invisible',
  //       callback: () => {
  //         console.log('recaptcha resolved..');
  //       }
  //     }
  //   );
  //   recaptchaVerifier.render();
  //   console.log(recaptchaVerifier.render());
  //   return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  // }

  const setUpRecaptcha = async (number) => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA solved:', response);
        },
        'expired-callback': () => {
          console.error('reCAPTCHA expired');
        }
      });
      await recaptchaVerifier.render();
      console.log('reCAPTCHA rendered');
      return signInWithPhoneNumber(auth, number, recaptchaVerifier);
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      throw error;
    }
  };
// const setUpRecaptcha=async(number) =>{
//     const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//       'size': 'invisible',
//       'callback': (response) => {
//         console.log('recaptcha resolved..');
//       },
//       'expired-callback': () => {
//         console.error('reCAPTCHA expired');
//       }
//     }, auth);

//     return signInWithPhoneNumber(auth, number, recaptchaVerifier)
//       .then((confirmationResult) => {
//         console.log("confirmationResult:", confirmationResult);
//         return confirmationResult;
//       })
//       .catch((error) => {
//         console.error("Error during signInWithPhoneNumber:", error);
//         throw error;
//       });
//   }

  function isTokenExpired(token) {
    if (!token) return true;
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    return decoded.exp * 1000 < Date.now();
  }

  const checkTokens=async(userType)=> {
   
      const token = localStorage.getItem(`${userType}Token`);
      const refreshToken = localStorage.getItem(`${userType}RefreshToken`);
      console.log("refreshhh",token,refreshToken);
      console.log(isTokenExpired(token));
      console.log(isTokenExpired(refreshToken));

      if (isTokenExpired(token)) {
        if (isTokenExpired(refreshToken)) {
          // Both tokens are expired
          logOut(userType);
          navigate(`/${userType}/signup`); 
         
        } else {
          console.log("lo hm fir aa gye");
          await refreshAccessToken(userType); // Refresh the access token if only access token is expired
        }
      }
    
  }

  return (
    <userAuthContext.Provider
      value={{
        brandUser,
        creatorUser,
        setBrandUser,
        setCreatorUser,
        loading,
        setUpRecaptcha,
        logOut,
        refreshAccessToken,
        checkTokens
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

