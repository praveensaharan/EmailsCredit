import React from "react";
import {
  FaMoneyCheckAlt,
  FaCreditCard,
  FaMobileAlt,
  FaRegClock,
} from "react-icons/fa";

const PaymentOptions = () => {
  return (
    <div className="container mx-auto mt-20 flex flex-col items-center justify-center text-center bg-gradient-to-br from-green-400 to-blue-500 p-10 rounded-lg shadow-xl">
      <div className="mb-6 animate-pulse">
        <FaMoneyCheckAlt className="text-white text-6xl" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">Payment Options</h1>
      <p className="text-lg text-white mb-6">
        We will be coming soon with UPI and other payment methods.
      </p>
      <div className="flex justify-center space-x-6">
        <FaCreditCard className="text-white text-4xl transform transition-transform hover:scale-110" />
        <FaMobileAlt className="text-white text-4xl transform transition-transform hover:scale-110" />
        <FaRegClock className="text-white text-4xl transform transition-transform hover:scale-110" />
      </div>
    </div>
  );
};

export default PaymentOptions;
