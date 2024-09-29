import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { InformationCircleIcon } from "@heroicons/react/solid";

const Iit = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let debounceTimeout = null;

  const fetchData = (pattern = "") => {
    setIsLoading(true);
    fetch(`https://pricemailbackend.vercel.app/search-iit/${pattern}`)
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

  const handleSearch = (e) => {
    const pattern = e.target.value.toLowerCase();
    setSearchTerm(pattern);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      fetchData(pattern);
    }, 2000);
  };

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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const formatDescription = (description) => {
    if (!description) return "";

    let formatted = description
      // Use strong tags for emphasis on important sections
      .replace(/<Important>/g, "<strong>Important:</strong>")
      .replace(/<Job Summary>/g, "<strong>Job Summary:</strong>")
      .replace(
        /<Concrete Description>/g,
        "<strong>Concrete Description:</strong>"
      )
      .replace(/<MUST>/g, "<strong>MUST:</strong>")
      .replace(/<WANT>/g, "<strong>WANT:</strong>")

      // Handle line breaks and slashes
      .replace(/\\n/g, "<br>") // Converts line breaks
      .replace(/\\\\/g, "") // Remove escaped backslashes

      // Handle bullet points and special characters
      .replace(/\\u30fb/g, "•") // Convert unicode bullet point to HTML bullet
      .replace(/\\uff1a/g, ":") // Convert unicode colon to normal colon

      // Format markdown-like emphasis (*word*) to HTML <em>
      .replace(/\*([^\*]+)\*/g, "<em>$1</em>")

      // Handle table syntax for better structure
      .replace(/---\|---/g, "</td></tr><tr><td>")
      .replace(
        /Items\s+\|\s+Condition/g,
        "<table><thead><tr><th>Condition</th></tr></thead><tbody><tr><td>"
      )
      .replace(/\|/g, "</table><table>")

      // Replace profile-related tags with strong tags for headings
      .replace(/<Profile>/g, "<strong>Profile:</strong>")
      .replace(/<Items>/g, "<strong>Items:</strong>")
      .replace(/<Condition>/g, "<strong>Condition:</strong>")
      .replace(
        /<Options after 3 years>/g,
        "<strong>Options after 3 years:</strong>"
      )
      .replace(/<Working Location>/g, "<strong>Working Location:</strong>")
      .replace(/<Salary>/g, "<strong>Salary:</strong>")
      .replace(
        /<Welfare and Benefits>/g,
        "<strong>Welfare and Benefits:</strong>"
      )
      .replace(/<Other Conditions>/g, "<strong>Other Conditions:</strong>");

    // Ensure the table is properly closed
    if (formatted.includes("<table>") && !formatted.endsWith("</table>")) {
      formatted += "</td></tr></tbody></table>";
    }

    return formatted;
  };

  const formatSalary = (salary) => {
    const salaryNum = Number(salary);

    if (salaryNum >= 10000000) {
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
        IIT Compensations Insights
      </h1>

      <div className="max-w-xl mx-auto mb-8 relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-4 bg-gray-100 border-[hsl(210,50%,40%)] rounded-full text-orange-500 placeholder-[hsl(200,50%,30%)] focus:ring-2 focus:ring-[#4056a1]"
        />
      </div>

      {isLoading ? (
        <p className="text-center text-orange-500">Loading data...</p>
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
                  "Description",
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
                      <Button
                        type="link"
                        className="text-[#d79922] flex items-center"
                        onClick={showModal}
                      >
                        <InformationCircleIcon className="h-6 w-6 text-[#d79922]" />{" "}
                      </Button>
                      <Modal
                        title="Company Description"
                        open={isModalVisible}
                        onCancel={handleClose}
                        footer={null}
                        width="800px"
                        bodyStyle={{ maxHeight: "350px", overflowY: "auto" }}
                      >
                        <div
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: formatDescription(item.description),
                          }}
                        ></div>

                        <div className="mt-4 flex justify-end">
                          <Button type="primary" onClick={handleClose}>
                            Close
                          </Button>
                        </div>
                      </Modal>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-orange-400 font-bold"
                  >
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

export default Iit;
