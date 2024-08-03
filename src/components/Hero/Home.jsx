

const Home = () => {
 
  return (
    <div className="flex flex-col items-center container">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Welcome to Our Platform</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl">
        Our platform connects brands and creators, making collaborations seamless and beneficial for both. Brands can reach new audiences, and creators can monetize their content effectively.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.04 0 2.042.263 2.915.74m-1.83-1.172A4.988 4.988 0 0012 8c-1.04 0-2.042.263-2.915.74m.505-2.486A5.985 5.985 0 0112 7c1.474 0 2.835.401 4.005 1.094m-.832-1.797A6.965 6.965 0 0112 5c-1.474 0-2.835.401-4.005 1.094M9.08 8.74c-.787.476-1.492 1.076-2.045 1.762M7.29 9.462c-.787.476-1.492 1.076-2.045 1.762M12 8c-1.04 0-2.042.263-2.915.74M8.785 10.502c-.787.476-1.492 1.076-2.045 1.762M7.29 9.462c-.787.476-1.492 1.076-2.045 1.762M5.62 10.21c-.74.55-1.382 1.177-1.91 1.864M4.86 10.846c-.74.55-1.382 1.177-1.91 1.864M6.775 12.64c-.668.628-1.228 1.345-1.69 2.112M6.085 13.082c-.668.628-1.228 1.345-1.69 2.112M10 14h.01M12 14c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M10 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M10 18h.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M14 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M14 18v.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M16 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M16 18v.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M18 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M18 18v.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M20 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M20 18v.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M22 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M22 18v.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785"></path></svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">For Brands</h3>
          <p className="text-gray-600 mb-4">
            Discover how brands can collaborate with creators to enhance visibility and drive engagement.
          </p>
          <a href="/brand/dashboard" className="text-indigo-600 hover:text-indigo-800">Learn More</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 bg-teal-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.04 0 2.042.263 2.915.74m-1.83-1.172A4.988 4.988 0 0012 8c-1.04 0-2.042.263-2.915.74m.505-2.486A5.985 5.985 0 0112 7c1.474 0 2.835.401 4.005 1.094m-.832-1.797A6.965 6.965 0 0112 5c-1.474 0-2.835.401-4.005 1.094M9.08 8.74c-.787.476-1.492 1.076-2.045 1.762M7.29 9.462c-.787.476-1.492 1.076-2.045 1.762M12 8c-1.04 0-2.042.263-2.915.74M8.785 10.502c-.787.476-1.492 1.076-2.045 1.762M7.29 9.462c-.787.476-1.492 1.076-2.045 1.762M5.62 10.21c-.74.55-1.382 1.177-1.91 1.864M4.86 10.846c-.74.55-1.382 1.177-1.91 1.864M6.775 12.64c-.668.628-1.228 1.345-1.69 2.112M6.085 13.082c-.668.628-1.228 1.345-1.69 2.112M10 14h.01M12 14c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M10 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M10 18h.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M14 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M14 18v.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M16 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M16 18v.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M18 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M18 18v.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M20 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M20 18v.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M22 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M22 18v.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M24 16v.01M12 16c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785M24 18v.01M12 18c1.494 0 2.938-.269 4.285-.785m-2.57 2.57c-1.346-.516-2.79-.785-4.285-.785"></path></svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">For Creators</h3>
          <p className="text-gray-600 mb-4">
            Explore opportunities for creators to connect with brands, showcase their talents, and earn revenue.
          </p>
          <a href="/creator/dashboard" className="text-teal-600 hover:text-teal-800">Learn More</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
