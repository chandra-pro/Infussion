// import React, { useState } from "react";
// import { BiSolidPhoneCall } from "react-icons/bi";
// import { BsFillShieldLockFill } from "react-icons/bs";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import OtpInput from "react-otp-input";
// import { auth } from "../../firebase"; // Ensure this import is correct
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { Toaster, toast } from "react-hot-toast";

// const SignUp = () => {
//   const [otp, setOtp] = useState("");
//   const [ph, setPh] = useState("");
//   const [showOtp, setShowOtp] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(false);

//   function onCaptchaVerify() {
//     if (!window.recaptchaVerifier) {
//       try {
//         window.recaptchaVerifier = new RecaptchaVerifier(  auth,
//              'recaptcha-container', {
//                 size: 'invisible',
//                 callback: (response) => {
//                   console.log('reCAPTCHA solved:', response);
//                 },
//                 'expired-callback': () => {
//                   console.error('reCAPTCHA expired');
//                 }
//               },
            
//         );
//         window.recaptchaVerifier.render();
//       } catch (error) {
//         console.error("Error initializing RecaptchaVerifier:", error);
//         toast.error("Error initializing Recaptcha. Please try again later.");
//       }
//     }
//   }

//   function onSignup(event) {
//     event.preventDefault();
//     setLoading(true);
//     onCaptchaVerify();
//     const appVerifier = window.recaptchaVerifier;
//     const phoneNumber = "+" + ph;

//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOtp(true);
//         toast.success("OTP Sent Successfully");
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.error("Error during signInWithPhoneNumber:", error);
//         toast.error(error.message);
//       });
//   }

//   function onOtpverify() {
//     setLoading(true);
//     window.confirmationResult
//       .confirm(otp)
//       .then(async (result) => {
//         const user = result.user;
//         setUser(user);
//         setLoading(false);
//         toast.success("User signed in successfully");
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.error("Error during OTP verification:", error);
//         toast.error(error.message);
//       });
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <Toaster toastOptions={{ duration: 4000 }} />
//       {!user ? (
//         <div className="bg-white p-8 rounded shadow-md w-96">
//           {showOtp ? (
//             <div className="text-center">
//               <BsFillShieldLockFill size={40} className="mx-auto" />
//               <h6 className="mt-3">Enter Your OTP</h6>
//               <OtpInput
//                 value={otp}
//                 onChange={setOtp}
//                 numInputs={6}
//                 shouldAutoFocus
//                 renderInput={(props) => (
//                   <input
//                     {...props}
//                     className="border border-gray-300 p-2 m-1 w-10 text-center rounded"
//                   />
//                 )}
//               />
//               <button
//                 className="btn btn-primary mt-3 w-full bg-blue-500 text-white py-2 rounded"
//                 onClick={onOtpverify}
//               >
//                 {loading && (
//                   <span
//                     className="spinner-border spinner-border-sm mr-2"
//                   ></span>
//                 )}
//                 Verify OTP
//               </button>
//             </div>
//           ) : (
//             <div className="text-center">
//               <BiSolidPhoneCall size={40} className="mx-auto" />
//               <h6 className="mt-3">Verify Your Phone Number</h6>
//               <PhoneInput
//                 country={"in"}
//                 value={ph}
//                 onChange={setPh}
//                 containerClass="mb-3"
//                 inputClass="w-full p-2 border border-gray-300 rounded"
//               />
//               <button
//                 className="btn btn-primary mt-3 w-full bg-blue-500 text-white py-2 rounded"
//                 onClick={onSignup}
//               >
//                 {loading && (
//                   <span
//                     className="spinner-border spinner-border-sm mr-2"
//                   ></span>
//                 )}
//                 Send OTP Via SMS
//               </button>
//               <div id="recaptcha-container" className="mt-6"></div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="text-center text-white">
//           <p className="mt-40">SignUp Successfully</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignUp;
