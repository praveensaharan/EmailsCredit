import React, { useEffect, useState } from "react";
import { useApi } from "../ContextApi/CreditsContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Spin } from "antd";
import moment from "moment";

const Insights = () => {
  const { loading, insights } = useApi();
  const [chartData, setChartData] = useState([]);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalEmails, setTotalEmails] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalRedemptions, setTotalRedemptions] = useState(0);

  useEffect(() => {
    if (insights && insights.daily_verification_counts) {
      const formattedData = insights.daily_verification_counts.map((item) => ({
        date: moment(item.date).format("YYYY-MM-DD"),
        emailcount: parseInt(item.emailcount, 10),
      }));
      setChartData(formattedData);

      const animateCount = (setter, value) => {
        let count = 0;
        const increment = value / 100;
        const interval = setInterval(() => {
          count += increment;
          if (count >= value) {
            count = value;
            clearInterval(interval);
          }
          setter(Math.floor(count));
        }, 20);
      };

      animateCount(setTotalCompanies, insights.total_companies || 0);
      animateCount(setTotalEmails, insights.total_emails || 0);
      animateCount(setTotalTransactions, insights.total_transactions || 0);
      animateCount(setTotalRedemptions, insights.total_redemptions || 0);
    }
  }, [insights]);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <Spin size="large" />
          <p className="ml-3 text-lg text-gray-700">Loading insights...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Total Companies</p>
              <p className="text-3xl font-semibold text-green-600">
                {totalCompanies}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Total Emails</p>
              <p className="text-3xl font-semibold text-blue-600">
                {totalEmails}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="text-3xl font-semibold text-red-600">
                {totalTransactions}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Total Redemptions</p>
              <p className="text-3xl font-semibold text-yellow-600">
                {totalRedemptions}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Verification Trends</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="emailcount"
                  stroke="#1890ff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Insights;
