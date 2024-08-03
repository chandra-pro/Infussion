
const CreatorReview = ({ image, username, text }) => {
  return (
    <div className="bg-purple-100 p-6 rounded-lg shadow-lg text-center">
      <img 
        className="w-16 h-16 rounded-full mx-auto border-2 border-green-400"
        src={image} 
        alt={username} 
      />
      <h3 className="text-lg font-bold mt-4">@{username}</h3>
      <p className="text-gray-600 mt-2">{text}</p>
    </div>
  );
};

export default CreatorReview;
