import React from 'react';
import image1 from '../../assets/category/gaming.png';
import image2 from '../../assets/category/macbook.png';
import image3 from '../../assets/category/smartwatch2-removebg-preview.png';

const BackgroundSlider = () => {
  const images = [image1, image2, image3];
  const [currentImage, setCurrentImage] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Adjust slide interval as needed

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center overflow-hidden z-0 relative">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute w-3/5 h-full bg-center bg-contain bg-no-repeat rounded-lg shadow-lg transition-opacity duration-1000 ${
            currentImage === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
};

export default BackgroundSlider;
