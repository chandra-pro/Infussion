
import Image1 from "../../assets/product/4f8135af-81e7-4685-9dce-7c237a64bfe2.jpg";
import Image2 from "../../assets/product/images.jpg";
import Image3 from "../../assets/product/Screenshot 2024-08-03 151426.png";
import Image4 from "../../assets/product/9c14fa79-4eb9-4336-84bd-6b3ed2e96426.jpg";
import Image5 from "../../assets/product/7c2689b5-2ee0-4fa7-9eac-45de87583782.jpg";
import Button from "../Shared/Button";

const Category = () => {
  return (
    <div className="py-8">
      <h1 className="text-4xl xl:text-5xl font-bold opacity-80 mb-5">Brands Products</h1>
      <div className="container">
        <div className="grid grid-cols-1 gap-8">
          {/* First Row */}
          <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-between  text-gray shadow-md rounded-lg p-6">
            <img src={Image1} alt="Earphone" className="w-[320px] lg:w-1/2 mb-4 lg:mb-0" />
            <div className="lg:w-1/2 lg:ml-8 text-center lg:text-left">
              {/* <p className="mb-[2px] text-gray-400">Enjoy</p> */}
              <p className="text-3xl xl:text-4xl font-bold opacity-100 mb-2">Brand Collaboration</p>
              {/* <p className="text-4xl xl:text-5xl font-bold opacity-100 mb-2">Collaboration -  </p> */}
              <p className="text-gray-800 dark:text-white-400 mb-4">
             Collab with your preffered brands.
              Get Invited to the collab - We assist brands in finding you. You'll also receive invitations to Collab.
              </p>
              <Button text="Browse" bgColor={"bg-brandYellow"} textColor={"gray"} />
            </div>
          </div>
          {/* Second Row */}
          <div className="flex flex-col lg:flex-row-reverse items-center lg:items-center lg:justify-between text-gray shadow-md rounded-lg p-6">
            <img src={Image2} alt="Gadget" className="w-[320px] lg:w-1/2 mb-4 lg:mb-0" />
            <div className="lg:w-1/2 lg:mr-8 text-center lg:text-left">
              {/* <p className="mb-[2px] text-gray-400">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p> */}
              <p className="text-3xl xl:text-4xl font-bold opacity-100 mb-2">Get invitations to collab</p>
              <p className="text-gray-800 dark:text-white-400 mb-4">
               Send direct messages to brands and look into potential new collaborations.
              </p>
              <Button text="Browse" bgColor={"bg-brandYellow"} textColor={"gray"} />
            </div>
          </div>
          {/* Third Row */}
          <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-between  text-gray shadow-md rounded-lg p-6">
            <img src={Image3} alt="Laptop" className="w-[320px] lg:w-1/2 mb-4 lg:mb-0" />
            <div className="lg:w-1/2 lg:ml-8 text-center lg:text-left">
              {/* <p className="mb-[2px] text-gray-400">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p> */}
              <p className="text-3xl xl:text-4xl font-bold opacity-100 mb-2">Engage with brands directly</p>
              <p className="text-gray-800 dark:text-white-400 mb-4">
             List your campaign offer on Infussion's marketplace, sit back and wait for creators to knock on your door as per their niches.
              </p>
              <Button text="Browse" bgColor={"bg-brandBlue"} textColor={"gray"} />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row-reverse items-center lg:items-center lg:justify-between  text-gray shadow-md rounded-lg p-6">
            <img src={Image4} alt="Laptop" className="w-[320px] lg:w-1/2 mb-4 lg:mb-0" />
            <div className="lg:w-1/2 lg:ml-8 text-center lg:text-left">
              {/* <p className="mb-[2px] text-gray-400">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p> */}
              <p className="text-3xl xl:text-4xl font-bold opacity-100 mb-2"> Organise and Manage easily</p>
              <p className="text-gray-800 dark:text-white-400 mb-4">
              Enjoy hassle free collaborations and seamless campaign management.
              </p>
              <Button text="Browse" bgColor={"bg-brandBlue"} textColor={"gray"} />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-between  text-gray shadow-md rounded-lg p-6">
            <img src={Image5} alt="Laptop" className="w-[320px] lg:w-1/2 mb-4 lg:mb-0" />
            <div className="lg:w-1/2 lg:ml-8 text-center lg:text-left">
              {/* <p className="mb-[2px] text-gray-400">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p> */}
              <p className="text-3xl xl:text-4xl font-bold opacity-100 mb-2">  In Depth Reportin</p>
              <p className="text-gray-800 dark:text-white-400 mb-4">
             Understand traffic, media statistics, and sales impacts, allowing for informed future strategies.
              </p>
              <Button text="Browse" bgColor={"bg-brandBlue"} textColor={"gray"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
