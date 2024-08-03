
import ReviewCard from '../Products/ReviewCard';
const reviews = [
    {
      avatar: 'https://via.placeholder.com/150',
      name: 'John Doe',
      date: 'May 20, 2024',
      rating: 4.5,
      text: 'This is an amazing product! I really enjoyed using it and would definitely recommend it to others.',
    },
    {
      avatar: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      date: 'April 15, 2024',
      rating: 5,
      text: 'Great quality and fast shipping. Exceeded my expectations!',
    },
    // Add more reviews as needed
  ];

const Creator = () => {
    return (
        <div className='container overflow-hidden rounded-3xl min-h-[550px] 
        sm:min-h-[650px] justify-center items-center
        hero-bg-color'>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Creator's Reviews</h1>
          <div className="flex flex-wrap justify-center">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      );
}

export default Creator