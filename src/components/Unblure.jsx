// import React from "react";
// import UnblureCard from "./UnblureCard";

// const data = [
//   {
//     id: 1,
//     companyName: "Company A",
//     companyDomain: "companya.com",
//     emails: ["contact@companya.com"],
//     creationDate: "2023-01-15T00:00:00Z",
//     lastVerificationDate: "2023-06-15T00:00:00Z",
//   },
//   {
//     id: 2,
//     companyName: "Company B",
//     companyDomain: "companyb.com",
//     emails: ["info@companyb.com", "inf3o@companyb.com", "info3@companyb.com"],
//     creationDate: "2022-11-20T00:00:00Z",
//     lastVerificationDate: "2023-05-31T00:00:00Z",
//   },
//   {
//     id: 3,
//     companyName: "Company C",
//     companyDomain: "companyc.com",
//     emails: ["support@companyc.com"],
//     creationDate: "2023-03-10T00:00:00Z",
//     lastVerificationDate: "2023-07-05T00:00:00Z",
//   },
//   {
//     id: 4,
//     companyName: "Company D",
//     companyDomain: "companyd.com",
//     emails: ["hello@companyd.com"],
//     creationDate: "2022-08-05T00:00:00Z",
//     lastVerificationDate: "2023-03-10T00:00:00Z",
//   },
// ];

// const Unblure = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
//         {data.map((item) => (
//           <UnblureCard
//             key={item.id}
//             companyName={item.companyName}
//             companyDomain={item.companyDomain}
//             emails={item.emails}
//             creationDate={item.creationDate}
//             lastVerificationDate={item.lastVerificationDate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Unblure;

import React, { useEffect, useState } from "react";
import UnblureCard from "./UnblureCard";
import axios from "axios";

const Unblure = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/companies-by-ids");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVerify = async (id) => {
    try {
      const response = await axios.post("http://localhost:3000/verify", {
        id,
      });
      console.log(response.data);
      setData((prevData) =>
        prevData
          .map((company) =>
            company.id === id
              ? response.data
                ? { ...company, ...response.data }
                : null
              : company
          )
          .filter((company) => company !== null)
      );
    } catch (error) {
      console.error("Error verifying emails:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="relative p-4 sm:p-6 bg-white shadow-md rounded-lg transform transition-transform hover:scale-105 duration-300 ease-in-out border border-gray-200 flex flex-col"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-customGold via-customBlue to-customRed"></div>
              <div className="animate-pulse flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <div className="h-6 bg-slate-200 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-32"></div>
                </div>
                <div className="shrink-0 mt-4 sm:mt-0 rounded-full bg-slate-200 h-16 w-16"></div>
              </div>
              <dl className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 flex-grow">
                <div>
                  <div className="h-4 bg-slate-200 rounded w-20 mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="flex justify-center items-center sm:justify-end">
                  <div className="h-8 bg-slate-200 rounded w-24"></div>
                </div>
              </dl>
              <div className="flex flex-col sm:flex-row sm:justify-between mt-auto pt-4">
                <div className="h-4 bg-slate-200 rounded w-16 mb-2 sm:mb-0"></div>
                <div className="h-4 bg-slate-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {data.map((item) => (
          <UnblureCard
            key={item.id}
            id={item.id}
            companyName={item.companyName}
            companyDomain={item.companyDomain}
            emails={item.emails}
            creationDate={item.creationDate}
            lastVerificationDate={item.lastVerificationDate}
            onVerify={handleVerify}
          />
        ))}
      </div>
    </div>
  );
};

export default Unblure;
