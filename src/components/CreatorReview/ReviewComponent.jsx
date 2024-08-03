import React from 'react';
import CreatorReview from './CreatorReview';

const testimonials = [
  {
    image: 'https://via.placeholder.com/150',  
    username: 'Nilarnab',
    text: 'The platform has been a game-changer for me as a content creator. It’s incredibly user-friendly, and the opportunities to collaborate with reputable brands are endless. The matching algorithm is spot-on, connecting me with brands that align perfectly with my style and audience. The communication tools are seamless, making it easy to negotiate terms and deliverables. Plus, the support team is always quick to help with any issues. My engagement and reach have significantly increased since joining, and the financial rewards are a fantastic bonus. Highly recommend it to any creator looking to grow and monetize their influence!'
  },
  {
    image: 'https://via.placeholder.com/150',  
    username: 'Akhilesh',
    text: 'I’ve been using this platform for a few months, and it’s been fantastic. The interface is clean and intuitive, making it easy to navigate and find brand collaboration opportunities. I love how the platform suggests brands that match my niche, saving me a lot of time. The contracts and payment process are transparent and straightforward, which is a huge plus. The community features are also great, providing a space to connect with other creators and share tips. Overall, it’s a valuable resource for any creator looking to expand their brand partnerships and make meaningful connections.'
  },
  {
    image: 'https://via.placeholder.com/150',  
    username: 'Vishnu',
    text: 'Infussion has truly elevated my content creation journey. The variety of brands available for collaboration is impressive, ranging from well-known companies to emerging startups. The process of applying for collaborations is smooth and hassle-free. I appreciate the detailed analytics and feedback provided, which help me understand my performance and improve my content. The earnings potential is substantial, and I’ve been able to secure several lucrative deals. Additionally, the educational resources offered have been instrumental in refining my approach and strategy. It’s a must-have platform for any serious creator aiming to grow their brand.'
  }
];

const ReviewComponent = () => {
  return (
    <div className="flex items-center container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        {testimonials.map((testimonial, index) => (
          <CreatorReview 
            key={index}
            image={testimonial.image}
            username={testimonial.username}
            text={testimonial.text}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewComponent;
