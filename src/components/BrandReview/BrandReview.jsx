
import ReviewComponent from './ReviewComponent';

const testimonials = [
  {
    image: 'https://via.placeholder.com/150', // Update with actual image paths
    name: 'Diana Danoff',
    date: 'Feb 27, 2024',
    text: 'Infussion has been a remarkable tool for our brand. We’ve had the pleasure of collaborating with numerous talented creators who perfectly align with our brand values and target audience. The platform’s matching algorithm is precise and efficient, saving us a lot of time in finding the right influencers. The communication and project management tools are top-notch, making the collaboration process smooth and hassle-free.',
    platformLogo: 'https://via.placeholder.com/150', // Update with actual platform logo paths
    rating: 5,
  },
  {
    image: 'https://via.placeholder.com/150', // Update with actual image paths
    name: 'Sandro C.',
    date: 'June 19, 2024',
    text: 'We’ve had an excellent experience using Infussion for our influencer marketing campaigns. The platform offers a wide range of talented creators, making it easy to find the perfect match for our brand. The collaboration process is seamless, from initial contact to project completion. We appreciate the clear and transparent payment system.',
    platformLogo: 'https://via.placeholder.com/150', // Update with actual platform logo paths
    rating: 5,
  },
];

const BrandReview = () => {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center container">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Brands love us</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        The leading Influencer marketing platform for challenger brands and micro influencers
      </p>
   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {testimonials.map((testimonial, index) => (
          <ReviewComponent 
            key={index}
            image={testimonial.image}
            name={testimonial.name}
            date={testimonial.date}
            text={testimonial.text}
            platformLogo={testimonial.platformLogo}
            rating={testimonial.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandReview;
