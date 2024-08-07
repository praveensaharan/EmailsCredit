import React, { useEffect, useState } from "react";
import { CreditCardOutlined, HistoryOutlined } from "@ant-design/icons";
import { useSession } from "@clerk/clerk-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useApi } from "../ContextApi/CreditsContext";
import Coupon from "./CouponCard";

const convertToIST = (utcDateString) => {
  const date = new Date(utcDateString);
  const indiaOffset = 0; // 5 hours 30 minutes in milliseconds
  return new Date(date.getTime() + indiaOffset);
};

const formatDateAndTime = (date) => {
  return {
    date: new Intl.DateTimeFormat("en-IN", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date),
    time: new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).format(date),
  };
};

const Payment = () => {
  const { credits, transactions, loading } = useApi();
  const [error, setError] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
        <div className="w-full sm:w-2/3 bg-white shadow-lg rounded-lg mt-14">
          <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 mt-4">
            <div className="mb-8 p-6 bg-indigo-100 border border-indigo-200 rounded-lg flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-16 h-16 bg-indigo-100 rounded-full mr-4 wave-bg"></div>
                <div>
                  <div className="w-48 h-6 bg-gray-300 mb-2 rounded wave-bg"></div>
                  <div className="w-24 h-8 bg-gray-300 rounded wave-bg"></div>
                </div>
              </div>
              <div className="w-32 h-10 bg-gray-300 rounded wave-bg"></div>
            </div>

            <div className="mb-8">
              <div className="text-lg font-semibold text-gray-800 mb-4 flex items-center wave-bg">
                <div className="w-8 h-8 bg-gray-300 rounded mr-2 wave-bg"></div>
                <div className="w-48 h-6 bg-gray-300 rounded wave-bg"></div>
              </div>
              <ul className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <li
                    key={index}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm wave-bg"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start">
                      <div className="flex flex-col w-full">
                        <div className="w-40 h-4 bg-gray-300 mb-2 rounded wave-bg"></div>
                        <div className="w-32 h-4 bg-gray-300 mb-2 rounded wave-bg"></div>
                        <div className="w-24 h-4 bg-gray-300 mb-2 rounded wave-bg"></div>
                        <div className="w-36 h-4 bg-gray-300 rounded wave-bg"></div>
                      </div>
                      <div className="w-24 h-6 bg-gray-300 rounded wave-bg mt-4 sm:mt-0"></div>
                    </div>
                    <div className="w-24 h-4 bg-gray-300 mt-2 rounded wave-bg"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/3 mt-8 sm:mt-0">
          <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-8 mt-4">
            <div className="w-full h-6 bg-gray-300 rounded wave-bg mb-4"></div>
            <div className="w-full h-4 bg-gray-300 rounded wave-bg mb-4"></div>
            <div className="w-full h-4 bg-gray-300 rounded wave-bg mb-4"></div>
            <div className="w-full h-4 bg-gray-300 rounded wave-bg mb-4"></div>
            <div className="w-full h-4 bg-gray-300 rounded wave-bg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 mt-16">
        <div className="w-full max-w-md bg-red-50 border border-red-500 text-red-600 rounded-lg p-4 shadow-md mt-6 mx-auto animate-fadeIn">
          <p className="text-center font-semibold text-lg">
            Oops! Something went wrong.
          </p>
          <p className="text-center mt-2">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col-reverse sm:flex-row bg-gray-100 py-12 px-4">
      <div className="w-full sm:w-2/3 bg-white shadow-lg rounded-lg mt-10">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 mt-4">
          <div className="mb-8 p-6 bg-indigo-50 border border-indigo-200 rounded-lg flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <CreditCardOutlined className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Current Credits
                </h2>
                <p className="text-xl font-bold text-gray-900">
                  {credits} Credits
                </p>
              </div>
            </div>
            <Link
              to="/credit"
              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              Buy More Credits
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <HistoryOutlined className="text-gray-600 text-lg mr-2" />
              Recent Transactions
            </h2>
            <ul className="space-y-6">
              {transactions.map((transaction) => {
                // Convert and format the date and time
                const localDate = convertToIST(transaction.transaction_date);
                const { date, time } = formatDateAndTime(localDate);

                return (
                  <li
                    key={transaction.transaction_id}
                    className="p-5 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start">
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Transaction ID:{" "}
                          <span className="font-mono text-gray-500">
                            TXPLAC{transaction.transaction_id}4C
                            {transaction.transaction_id}
                          </span>
                        </p>
                        {transaction.notes && (
                          <p className="text-xs text-gray-600 mt-1">
                            <span className="font-semibold">Notes:</span>{" "}
                            {transaction.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col text-right mt-4 sm:mt-0">
                        <span
                          className={`text-xl font-bold ${
                            transaction.amount > 0
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {transaction.amount}
                        </span>
                        <p className="text-sm text-gray-500 mt-2">{date}</p>
                        <p className="text-sm text-gray-500">
                          {time}
                          <span className="text-xs text-gray-500"> IST</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p
                        className={`text-xs font-semibold ${
                          transaction.status === "Completed"
                            ? "text-green-700"
                            : "text-yellow-600"
                        }`}
                      >
                        Status: {transaction.status}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/3 mt-0">
        <Coupon />
      </div>
    </div>
  );
};

export default Payment;
