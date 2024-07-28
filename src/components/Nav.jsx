// import React, { useState } from "react";
// import {
//   FaRegPaperPlane,
//   FaMoon,
//   FaSun,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// function Nav() {
//   const [toggleMenu, setToggleMenu] = useState(false);

//   return (
//     <div className="app">
//       <nav className="bg-customLightBlue shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <Link
//                 to="/"
//                 className="flex items-center gap-2 font-bold text-customBlue"
//               >
//                 <FaRegPaperPlane className="h-6 w-6 text-customGold" />
//                 <span>Paper.io</span>
//               </Link>
//               <div className="hidden lg:flex ml-10 space-x-8">
//                 <Link
//                   to="/"
//                   className="text-customBlue hover:text-customRed transition duration-300"
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   to="/unblure"
//                   className="text-customBlue hover:text-customRed transition duration-300"
//                 >
//                   Emails
//                 </Link>
//                 <Link
//                   to="/payment"
//                   className="text-customBlue hover:text-customRed transition duration-300"
//                 >
//                   Price
//                 </Link>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <div className="hidden xs:flex items-center gap-10">
//                 <div className="hidden lg:flex items-center gap-2">
//                   <FaMoon className="h-6 w-6 text-customBlue" />
//                   <FaSun className="h-6 w-6 text-customBlue" />
//                 </div>
//                 <button className="rounded-full border-2 border-customBlue py-2 px-4 hover:bg-customBlue hover:text-customLightBlue transition duration-300">
//                   Free Trial
//                 </button>
//               </div>
//               <div className="lg:hidden flex items-center">
//                 <button onClick={() => setToggleMenu(!toggleMenu)}>
//                   {toggleMenu ? (
//                     <FaTimes className="h-6 w-6 text-customBlue" />
//                   ) : (
//                     <FaBars className="h-6 w-6 text-customBlue" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {toggleMenu && (
//           <div className="lg:hidden sticky z-40 w-full bg-customLightBlue overflow-hidden flex flex-col gap-12 origin-top duration-700">
//             <div className="px-8 py-4">
//               <div className="flex flex-col gap-8 font-bold tracking-wider">
//                 <Link to="/" className="border-l-4 border-customGold pl-2">
//                   Home
//                 </Link>
//                 <Link
//                   to="/unblure"
//                   className="pl-2 border-l-4 border-transparent hover:border-customGold transition duration-300"
//                 >
//                   Emails
//                 </Link>
//                 <Link
//                   to="/payment"
//                   className="pl-2 border-l-4 border-transparent hover:border-customGold transition duration-300"
//                 >
//                   Price
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// }

// export default Nav;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Logo from "../assets/react.svg";
import {
  FaRegPaperPlane,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const generateRandomAnimation = () => {
  const animationDuration = `${Math.random() * 5 + 3}s`;
  const animationDelay = `${Math.random()}s`;
  const translateX = `${(Math.random() * window.innerWidth) / 2}px`; // Half the viewport width
  const translateY = `${(Math.random() * window.innerHeight) / 2}px`; // Half the viewport height
  const rotate = `${Math.random() * 360}deg`;

  return {
    "--float-translate-x": translateX,
    "--float-translate-y": translateY,
    "--float-rotate": rotate,
    animationDuration,
    animationDelay,
  };
};

const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="app">
      <header className="fixed inset-x-0 z-10 top-0 w-full rounded-2xl border-x-4 border-y-2 border-orange bg-lightgray py-3 shadow-lg backdrop-blur-lg transition-all duration-500 hover:shadow-2xl hover:bg-gray-300">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
              {/* <Link aria-current="page" className="flex items-center" to="/">
                <img className="h-10" src={Logo} alt="Website Logo" />
                <p className="sr-only">Website Title</p>
              </Link> */}
              <Link
                to="/"
                className="flex items-center gap-2 font-bold text-customBlue"
              >
                <FaRegPaperPlane className="h-6 w-6 text-customGold" />
                <span>Paper.io</span>
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
              <Link
                to="/"
                className={`inline-block rounded-lg px-3 py-1 text-sm font-medium transition-all duration-200 hover:bg-orange hover:bg-opacity-20 ${
                  currentPath === "/"
                    ? "bg-orange bg-opacity-80 text-white hover:text-orange"
                    : "text-black"
                }`}
              >
                Home
              </Link>
              <Link
                to="/unblure"
                className={`inline-block rounded-lg px-3 py-1 text-sm font-medium transition-all duration-200 hover:bg-orange hover:bg-opacity-20 ${
                  currentPath === "/unblure"
                    ? "bg-orange bg-opacity-80 text-white hover:text-orange"
                    : "text-black"
                }`}
              >
                Emails
              </Link>
              <Link
                to="/payment"
                className={`inline-block rounded-lg px-3 py-1 text-sm font-medium transition-all duration-200 hover:bg-orange hover:bg-opacity-20 ${
                  currentPath === "/payment"
                    ? "bg-orange bg-opacity-80 text-white hover:text-orange"
                    : "text-black"
                }`}
              >
                Price
              </Link>
            </div>
            <div className="flex items-center justify-end gap-3">
              <SignedOut>
                <SignInButton
                  mode="modal"
                  redirectUrl="/"
                  className="inline-flex items-center justify-center rounded-xl bg-orange px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Login
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton className="text-black bg-orange hover:bg-black rounded-full px-4 py-2 transition duration-300 ease-in-out" />
              </SignedIn>
              <button
                className="md:hidden p-2"
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                {toggleMenu ? (
                  <FaTimes className="h-6 w-6 text-black" />
                ) : (
                  <FaBars className="h-6 w-6 text-black" />
                )}
              </button>
            </div>
          </div>
        </div>
        {toggleMenu && (
          <div className="md:hidden px-8 pt-2 pb-4 space-y-2 bg-gray-300 rounded-b-lg">
            <Link
              to="/"
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-orange hover:bg-opacity-20 ${
                currentPath === "/"
                  ? "bg-orange bg-opacity-80 text-white hover:text-orange"
                  : "text-black"
              }`}
              onClick={() => setToggleMenu(false)}
            >
              Home
            </Link>
            <Link
              to="/unblure"
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-orange hover:bg-opacity-20 ${
                currentPath === "/unblure"
                  ? "bg-orange bg-opacity-80 text-white hover:text-orange"
                  : "text-black"
              }`}
              onClick={() => setToggleMenu(false)}
            >
              Emails
            </Link>
            <Link
              to="/payment"
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-orange hover:bg-opacity-20 ${
                currentPath === "/payment"
                  ? "bg-orange bg-opacity-80 text-white hover:text-orange"
                  : "text-black"
              }`}
              onClick={() => setToggleMenu(false)}
            >
              Price
            </Link>
          </div>
        )}
      </header>
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-4">
          {[...Array(30)].map((_, index) => (
            <div
              key={index}
              className="absolute w-3 h-3 bg-orange rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                ...generateRandomAnimation(),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nav;
