import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { FaCaretDown, FaBars } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const MenuLinks = [
  { id: 1, name: 'Home', link: '/' },
  { id: 2, name: 'Contacts', link: '/#contacts' },
  { id: 3, name: 'Collaborate', link: '/collaborate' },
];

const DropdownLinksBrand = [
  { id: 1, name: 'Home', link: '/brand/dashboard' },
  { id: 3, name: 'Sign Up/Login', link: '/brand/signup' },
  { id: 4, name: 'Contacts', link: '/#contacts' },
];

const DropdownLinksCreator = [
  { id: 1, name: 'Home', link: '/creator/dashboard' },
  { id: 3, name: 'Sign Up/Login', link: '/creator/signup' },
  { id: 4, name: 'Contacts', link: '/#contacts' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
        <div className="py-4">
          <div className="container flex justify-between gap-4">
            <div className="flex items-center gap-4 sm:justify-center">
              <Link to="/" className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl">
                Infussion
              </Link>
              <div className="hidden lg:block">
                <ul className="flex items-center gap-4">
                  {MenuLinks.map((data, index) => (
                    <li key={index}>
                      <Link to={data.link} className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200">
                        {data.name}
                      </Link>
                    </li>
                  ))}
                  <li className="relative cursor-pointer group">
                    <a className="flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2" href="#">
                      Brand
                      <span>
                        <FaCaretDown className="group-hover:rotate-180 duration-300" />
                      </span>
                    </a>
                    <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white">
                      <ul className="space-y-2">
                        {DropdownLinksBrand.map((data, index) => (
                          <li key={index}>
                            <Link to={data.link} className="text-gray-500 dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold">
                              {data.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li className="relative cursor-pointer group">
                    <a className="flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2" href="#">
                      Creator
                      <span>
                        <FaCaretDown className="group-hover:rotate-180 duration-300" />
                      </span>
                    </a>
                    <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white">
                      <ul className="space-y-2">
                        {DropdownLinksCreator.map((data, index) => (
                          <li key={index}>
                            <Link to={data.link} className="text-gray-500 dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold">
                              {data.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="relative group hidden sm:block">
                <input type="text" placeholder="search" className="search-bar" />
                <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
              </div>
              <div className="lg:hidden flex items-center">
                <button onClick={toggleMenu} aria-label="Toggle Menu">
                  <FaBars className="text-2xl text-gray-600 dark:text-gray-400 hover:text-primary duration-200" />
                </button>
              </div>
            </div>
          </div>
          {menuOpen && (
            <div className="lg:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 py-4 px-6 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-4">
                <div className="relative group w-full">
                  <input type="text" placeholder="search" className="search-bar" />
                  <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
                </div>
                <button onClick={toggleMenu} aria-label="Close Menu" className="text-gray-600 dark:text-gray-400 hover:text-primary duration-200">
                  <FaBars className="text-2xl" />
                </button>
              </div>
              <ul className="flex flex-col gap-4 items-center">
                {MenuLinks.map((data, index) => (
                  <li key={index}>
                    <Link to={data.link} className="block px-4 py-2 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200">
                      {data.name}
                    </Link>
                  </li>
                ))}
                   {/* <li className=""> */}
                   {/* <a className="flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2" href="#"> */}
                <li className="relative cursor-pointer group flex items-center gap-4">
                  <a className="flex items-center justify-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2" href="#">
                    Brands
                    <span>
                      <FaCaretDown className="group-hover:rotate-180 duration-300" />
                    </span>
                  </a>
                  <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white">
                      <ul className="space-y-2">
                        {DropdownLinksBrand.map((data, index) => (
                          <li key={index}>
                            <Link to={data.link} className="text-gray-500 dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold">
                              {data.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                </li>
                <li className="relative cursor-pointer group flex items-center gap-4">
                <a className="flex items-center justify-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2" href="#">
                    Creator
                    <span>
                      <FaCaretDown className="group-hover:rotate-180 duration-300" />
                    </span>
                  </a>
                  <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white">
                      <ul className="space-y-2">
                        {DropdownLinksCreator.map((data, index) => (
                          <li key={index}>
                            <Link to={data.link} className="text-gray-500 dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold">
                              {data.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
