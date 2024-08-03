
import Slider from "react-slick";
import brand1 from "../../assets/brand/br-1.png";
import brand2 from "../../assets/brand/br-2.png";
import brand3 from "../../assets/brand/br-3.png";
import brand4 from "../../assets/brand/br-4.png";
import brand5 from "../../assets/brand/br-5.png";

const Brand = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      data-aos="zoom-out"
      className="py-8 mt-24 bg-gray-200 dark:bg-white/10"
    >
      <div className="container mx-auto">
        <Slider {...settings} className="opacity-50">
          <div className="flex justify-center">
            <img src={brand1} alt="brand" className="w-[80px] dark:invert" />
          </div>
          <div className="flex justify-center">
            <img src={brand2} alt="brand" className="w-[80px] dark:invert" />
          </div>
          <div className="flex justify-center">
            <img src={brand3} alt="brand" className="w-[80px] dark:invert" />
          </div>
          <div className="flex justify-center">
            <img src={brand4} alt="brand" className="w-[80px] dark:invert" />
          </div>
          <div className="flex justify-center">
            <img src={brand5} alt="brand" className="w-[80px] dark:invert" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Brand;
