
import Slider from 'react-slick';

import Image1 from "../../assets/influencer/—Pngtree—instagram post frame template vector_6492066.png"
import Image2 from "../../assets/influencer/png-clipart-social-media-marketing-influencer-marketing-social-media-company-text-thumbnail-removebg-preview.png"
import Image3 from "../../assets/influencer/png-transparent-target-market-target-audience-influencer-marketing-advertising-audience-company-content-marketing-service-thumbnail-removebg-preview.png"
import Image4 from "../../assets/brand/png-transparent-social-media-marketing-influencer-marketing-business-social-media-text-friendship-logo-removebg-preview.png"
import Image5 from "../../assets/brand/180758.png"

const images = [
  Image2,
  Image3,
  Image4,
  Image5
];

const BrandHeroSection = ({title,buttonName}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between p-8 bg-gradient-to-r from-purple-100 to-purple-200">
      <div className="text-left md:w-1/2 space-y-4 z-10">
        <h1 className="text-4xl font-bold">Drive with Creators & Influencers</h1>
        <p className="text-lg text-gray-600">
          The all-in-one platform to scale influencer and affiliate marketing campaigns.
        </p>
        <button className="px-6 py-2 mt-4 text-white bg-black rounded-lg" onClick={{}}>
          {buttonName}
        </button>
      </div>
      <div className="relative mt-8 md:mt-0 md:w-1/2 z-10">
        <img src={Image1} alt="Instagram Post" className="w-full h-auto" />
        <div className="absolute top-[110px] left-[115px] right-[15px] bottom-[55px]">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="w-full h-full">
                <img src={image} alt={`Slide ${index}`} className="w-1/2 h-full object-cover" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="absolute inset-0 bg-purple-100 md:bg-gradient-to-r md:from-purple-100 md:to-purple-200"></div>
      <div className="absolute right-16 top-32 w-64 h-64 bg-blue-300 rounded-full opacity-50"></div>
    </div>
  );
};

export default BrandHeroSection;
