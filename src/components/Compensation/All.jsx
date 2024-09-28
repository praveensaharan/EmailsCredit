import React, { useState, useEffect } from "react";

const All = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let debounceTimeout = null;

  // Function to fetch data from API (with optional pattern for search)
  const fetchData = (pattern = "") => {
    setIsLoading(true);
    fetch(`https://pricemailbackend.vercel.app/search-all/${pattern}`)
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

  // Fetch data when component mounts (no search pattern)
  useEffect(() => {
    fetchData();
  }, []);

  // Debounced search
  const handleSearch = (e) => {
    const pattern = e.target.value.toLowerCase();
    setSearchTerm(pattern);

    // Clear previous debounce timeout if the user keeps typing
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to fetch data after 2 seconds
    debounceTimeout = setTimeout(() => {
      fetchData(pattern);
    }, 2000);
  };

  // Function to format date like "8th May 2021"
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
    const month = monthNames[date.getMonth()]; // Get the short month name
    const year = date.getFullYear();

    const suffix = (day) => {
      if (day > 3 && day < 21) return "th"; // covers 11th to 19th
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

  // Function to format salary in lakhs and crores
  const formatSalary = (salary) => {
    const salaryNum = Number(salary);

    if (salaryNum >= 10000000) {
      // Crores
      return `₹${(salaryNum / 10000000).toFixed(2)} Cr`;
    } else if (salaryNum >= 100000) {
      // Lakhs
      return `₹${(salaryNum / 100000).toFixed(2)} L`;
    } else {
      return `₹${salaryNum.toLocaleString()}`; // Format as normal if below lakh
    }
  };

  return (
    <div>
      <h1>Company Salary Data</h1>
      <input
        type="text"
        placeholder="Search by company name..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          marginBottom: "20px",
          padding: "10px",
          fontSize: "16px",
          width: "300px",
        }}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Date</th>
              <th>Total Salary</th>
              <th>Base Salary</th>
              <th>Experience</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.company}</td>
                  <td>{item.role}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>{formatSalary(item.total_salary)}</td>
                  <td>{formatSalary(item.base_salary)}</td>
                  <td>{item.experience}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default All;
