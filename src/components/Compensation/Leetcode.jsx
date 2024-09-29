import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { FaSearch } from "react-icons/fa"; // Importing FaSearch from react-icons

const Leetcode = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let debounceTimeout = null;

  // Fetch data function
  const fetchData = (pattern = "") => {
    setIsLoading(true);
    fetch(`https://pricemailbackend.vercel.app/search-leetcode/${pattern}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.companies);
        setFilteredData(data.companies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Debounced search function
  const handleSearch = (e) => {
    const pattern = e.target.value.toLowerCase();
    setSearchTerm(pattern);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => {
      fetchData(pattern);
    }, 1000);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const suffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${suffix(day)} ${month} ${year}`;
  };

  // Format salary in lakhs/crores with conditional color for crores
  const formatSalary = (salary) => {
    const salaryNum = Number(salary);
    if (salaryNum >= 10000000) {
      // Return salary in crores with gold color
      return (
        <span style={{ color: "gold" }}>
          ₹{(salaryNum / 10000000).toFixed(2)} Cr
        </span>
      );
    } else if (salaryNum >= 100000) {
      return `₹${(salaryNum / 100000).toFixed(2)} L`;
    } else {
      return `₹${salaryNum.toLocaleString()}`;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[hsl(180,100%,90%)] p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#d79922]">
        LeetCode Salary Insights
      </h1>

      <div className="max-w-xl mx-auto mb-8 relative">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-4 bg-gray-100 border-[hsl(210,50%,40%)] rounded-full text-orange-500 placeholder-[hsl(200,50%,30%)] focus:ring-2 focus:ring-[#4056a1]"
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[hsl(200,50%,30%)] h-6 w-6" />
      </div>

      {isLoading ? (
        <p className="text-center text-[hsl(180,100%,90%)]">Loading data...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[hsl(210,50%,40%)]">
          <table className="w-full border-collapse">
            <thead className="bg-[hsl(203,23%,30%)]">
              <tr>
                {[
                  "Company",
                  "Role",
                  "Date",
                  "Total Salary",
                  "Base Salary",
                  "Experience",
                ].map((header) => (
                  <th
                    key={header}
                    className="p-4 text-left text-sm font-semibold tracking-wide cursor-pointer hover:bg-[hsl(200,50%,30%)] transition-colors duration-150"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-[hsl(200,50%,30%)] transition-colors duration-150 ${
                      index % 2 === 0
                        ? "bg-[hsl(210,100%,12%)]"
                        : "bg-[hsl(210,100%,6%)]"
                    }`}
                  >
                    <td className="p-4 text-[#efe2ba] font-medium">
                      {item.company}
                    </td>
                    <td className="p-4 text-[hsl(180,100%,90%)]">
                      {item.role}
                    </td>
                    <td className="p-4 text-[hsl(180,100%,90%)]">
                      {formatDate(item.date)}
                    </td>
                    <td className="p-4 text-[#f13c20] font-semibold">
                      {formatSalary(item.total_salary)}
                    </td>
                    <td className="p-4 text-[#c5cbe3]">
                      {formatSalary(item.base_salary)}
                    </td>
                    <td className="p-4 text-[hsl(180,100%,90%)]">
                      {item.experience}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-orange-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leetcode;
