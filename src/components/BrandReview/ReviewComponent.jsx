import React from 'react';


const ReviewComponent = ({ image, name, date, text, platformLogo, rating }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-start space-y-4">
      <div className="flex items-center space-x-4">
        <img 
          className="w-12 h-12 rounded-full"
          src={image} 
          alt={name} 
        />
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <p className="text-gray-700">{text}</p>
      <div className="flex items-center justify-between w-full">
        <img className="w-6 h-6" src={platformLogo} alt="Platform logo" />
        <div className="text-yellow-500 flex space-x-1">
          {Array(rating).fill(0).map((_, i) => (
            <span key={i}>&#9733;</span> // Unicode star character
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
