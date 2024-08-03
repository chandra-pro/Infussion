import React from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const renderStars = () => {
    const fullStars = Math.floor(review.rating);
    const hasHalfStar = review.rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto my-4">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={review.avatar}
          alt={`${review.name}'s avatar`}
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{review.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{review.date}</p>
        </div>
      </div>
      <div className="mb-4">{renderStars()}</div>
      <p className="text-gray-800 dark:text-gray-200">{review.text}</p>
    </div>
  );
};

ReviewCard.propTypes = {
    review: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  };

export default ReviewCard;