/* eslint-disable react/prop-types */

const SignupStep = ({ title, children, nextStep, prevStep }) => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md mt-16 max-w-sm">
      <h2 className="text-2xl font-medium mb-4">{title}</h2>
      {children}
      <div className="flex justify-center mt-4">
        {prevStep && (
          <button type="button" className="btn btn-secondary" onClick={prevStep}>
            Back
          </button>
        )}
        <button
          type="button"
          className="bg-primary text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full z-10"
          onClick={nextStep}
         
        >
          {title === 'Phone Verification' ? 'Verify' : title === 'Additional Info' ? 'Complete Signup' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default SignupStep;
