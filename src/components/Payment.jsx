import React from "react";
import { CreditCardOutlined, HistoryOutlined } from "@ant-design/icons";

const transactions = [
  {
    id: 1,
    date: "2024-07-01",
    time: "14:30",
    amount: "-1",
    description: "Nected emails",
    status: "Completed",
    transactionId: "TXN12345",
    notes: "Monthly subscription fee",
  },
  {
    id: 2,
    date: "2024-07-10",
    time: "09:15",
    amount: "-1",
    description: "Clear emails",
    status: "Completed",
    transactionId: "TXN12346",
    notes: "Service charge for clearing emails",
  },
  {
    id: 5,
    date: "2024-07-10",
    time: "16:45",
    amount: "-3",
    description: "Clear:Email Verify",
    status: "Pending",
    transactionId: "TXN12347",
    notes: "Email verification service fee",
  },
  {
    id: 3,
    date: "2024-07-20",
    time: "11:00",
    amount: "-1",
    description: "FatakPay emails",
    status: "Completed",
    transactionId: "TXN12348",
    notes: "Payment for FatakPay service",
  },
  {
    id: 4,
    date: "2024-06-30",
    time: "20:00",
    amount: "+10",
    description: "Signup Bonus",
    status: "Completed",
    transactionId: "TXN12349",
    notes: "Bonus for signing up",
  },
];

const Payment = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        {/* Current Credits Section */}
        <div className="mb-8 p-6 bg-indigo-50 border border-indigo-200 rounded-lg flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <CreditCardOutlined className="text-indigo-600 text-3xl mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Current Credits
              </h2>
              <p className="text-xl font-bold text-gray-900">7 Credits</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            Buy More Credits
          </button>
        </div>

        {/* Recent Transactions Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <HistoryOutlined className="text-gray-600 text-lg mr-2" />
            Recent Transactions
          </h2>
          <ul className="space-y-4">
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-transform transform hover:scale-105 duration-300 ease-in-out"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-600">
                      {transaction.date} {transaction.time}
                    </p>
                    <p className="font-medium text-gray-800">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      Transaction ID: {transaction.transactionId}
                    </p>
                    {transaction.notes && (
                      <p className="text-xs text-gray-500 mt-1">
                        Notes: {transaction.notes}
                      </p>
                    )}
                  </div>
                  <span
                    className={`font-bold ${
                      transaction.amount.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.amount}
                  </span>
                </div>
                <p
                  className={`text-xs font-medium mt-1 ${
                    transaction.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  Status: {transaction.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payment;
