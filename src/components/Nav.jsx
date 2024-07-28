import React, { useState } from "react";
import {
  FaRegPaperPlane,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Nav() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="app">
      <nav className="bg-customLightBlue shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2 font-bold text-customBlue"
              >
                <FaRegPaperPlane className="h-6 w-6 text-customGold" />
                <span>Paper.io</span>
              </Link>
              <div className="hidden lg:flex ml-10 space-x-8">
                <Link
                  to="/"
                  className="text-customBlue hover:text-customRed transition duration-300"
                >
                  Home
                </Link>
                <Link
                  to="/unblure"
                  className="text-customBlue hover:text-customRed transition duration-300"
                >
                  Emails
                </Link>
                <Link
                  to="/payment"
                  className="text-customBlue hover:text-customRed transition duration-300"
                >
                  Price
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden xs:flex items-center gap-10">
                <div className="hidden lg:flex items-center gap-2">
                  <FaMoon className="h-6 w-6 text-customBlue" />
                  <FaSun className="h-6 w-6 text-customBlue" />
                </div>
                <button className="rounded-full border-2 border-customBlue py-2 px-4 hover:bg-customBlue hover:text-customLightBlue transition duration-300">
                  Free Trial
                </button>
              </div>
              <div className="lg:hidden flex items-center">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  {toggleMenu ? (
                    <FaTimes className="h-6 w-6 text-customBlue" />
                  ) : (
                    <FaBars className="h-6 w-6 text-customBlue" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        {toggleMenu && (
          <div className="lg:hidden sticky z-40 w-full bg-customLightBlue overflow-hidden flex flex-col gap-12 origin-top duration-700">
            <div className="px-8 py-4">
              <div className="flex flex-col gap-8 font-bold tracking-wider">
                <Link to="/" className="border-l-4 border-customGold pl-2">
                  Home
                </Link>
                <Link
                  to="/unblure"
                  className="pl-2 border-l-4 border-transparent hover:border-customGold transition duration-300"
                >
                  Emails
                </Link>
                <Link
                  to="/payment"
                  className="pl-2 border-l-4 border-transparent hover:border-customGold transition duration-300"
                >
                  Price
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Nav;
