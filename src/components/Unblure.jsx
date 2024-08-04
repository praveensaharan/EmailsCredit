// useEffect(() => {
//   const fetchData = async () => {
//     if (session) {
//       try {
//         const token = await session.getToken();
//         const response = await axios.get(
//           "http://localhost:3000/companies-by-ids",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   fetchData();
// }, [session]);

// const fetchCredits = async () => {
//   if (session) {
//     try {
//       const token = await session.getToken();
//       const response = await axios.get("http://localhost:3000/credits", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.status === 200) {
//         setCredits(response.data.credits);
//       } else {
//         throw new Error("Failed to fetch credits");
//       }
//     } catch (error) {
//       console.error("Error fetching credits:", error);
//     }
//   }
// };
// import React, { useEffect, useState } from "react";
// import UnblureCard from "./UnblureCard";
// import axios from "axios";

// import { Link } from "react-router-dom";
// import { useSession } from "@clerk/clerk-react";
// import { useApi } from "../ContextApi/CreditsContext";

// const backgroundImageUrl =
//   "https://images.unsplash.com/photo-1627618998627-70a92a874cc2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// const Unblure = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { session } = useSession();
//   const { credits, unlockData, verifyEmails } = useApi();
//   setData(unlockData);
//   const handleVerify = async (id, emailCount) => {
//     if (session) {
//       try {
//         if (credits >= emailCount) {
//           const response = await verifyEmails(id);
//           console.log(response.data);
//           setData((prevData) =>
//             prevData
//               .map((company) =>
//                 company.id === id
//                   ? response
//                     ? { ...company, ...response }
//                     : null
//                   : company
//               )
//               .filter((company) => company !== null)
//           );
//         } else {
//           alert("Insufficient balance to verify emails.");
//         }
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto p-4">
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 mt-20">
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div
//               key={index}
//               className="relative p-4 sm:p-6 bg-white shadow-md rounded-lg transform transition-transform hover:scale-105 duration-300 ease-in-out border border-gray-200 flex flex-col"
//             >
//               <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-customGold via-customBlue to-customRed"></div>
//               <div className="animate-pulse flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//                 <div>
//                   <div className="h-6 bg-slate-200 rounded w-24 mb-2 wave-bg"></div>
//                   <div className="h-4 bg-slate-200 rounded w-32 wave-bg"></div>
//                 </div>
//                 <div className="shrink-0 mt-4 sm:mt-0 rounded-full bg-slate-200 h-16 w-16 wave-bg"></div>
//               </div>
//               <dl className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 flex-grow">
//                 <div>
//                   <div className="h-4 bg-slate-200 rounded w-20 mb-2 wave-bg"></div>
//                   <div className="space-y-2">
//                     <div className="h-3 bg-slate-200 rounded wave-bg"></div>
//                     <div className="h-3 bg-slate-200 rounded w-3/4 wave-bg"></div>
//                   </div>
//                 </div>
//                 <div className="flex justify-center items-center sm:justify-end">
//                   <div className="h-8 bg-slate-200 rounded w-24 wave-bg"></div>
//                 </div>
//               </dl>
//               <div className="flex flex-col sm:flex-row sm:justify-between mt-auto pt-4">
//                 <div className="h-4 bg-slate-200 rounded w-16 mb-2 sm:mb-0 wave-bg"></div>
//                 <div className="h-4 bg-slate-200 rounded w-16 wave-bg"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (data.length === 0 && error) {
//     return (
//       <div
//         className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${backgroundImageUrl})` }}
//       >
//         <div className="bg-white bg-opacity-75 shadow-lg rounded-lg p-10 text-center transform transition-transform hover:scale-105 duration-300 ease-in-out border border-gray-200 max-w-lg mx-4">
//           <h2 className="text-4xl font-bold text-gray-800 mb-4">
//             No Unlocks Yet!
//           </h2>
//           <p className="text-gray-600 mb-4">
//             It seems you haven't unlocked anything till now.
//           </p>
//           <p className="text-gray-500 mb-6">
//             Explore and unlock amazing features to see them here.
//           </p>
//           <Link
//             to="/"
//             className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Discover Emails
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 mt-20">
//         {data.map((item) => (
//           <UnblureCard
//             key={item.id}
//             id={item.id}
//             companyName={item.companyName}
//             companyDomain={item.companyDomain}
//             emails={item.emails}
//             creationDate={item.creationDate}
//             lastVerificationDate={item.lastVerificationDate}
//             onVerify={handleVerify}
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
import { Link } from "react-router-dom";
import { useSession } from "@clerk/clerk-react";
import { useApi } from "../ContextApi/CreditsContext";

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1627618998627-70a92a874cc2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Unblure = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { session } = useSession();
  const { credits, unlockdata, verifyEmails } = useApi();

  // Update data when unlockData or session changes
  useEffect(() => {
    if (unlockdata) {
      setData(unlockdata);
      setLoading(false);
    }
  }, [unlockdata]);

  const handleVerify = async (id, emailCount) => {
    if (session) {
      try {
        if (credits >= emailCount) {
          const response = await verifyEmails(id);
          if (response) {
            setData((prevData) =>
              prevData
                .map((company) =>
                  company.id === id
                    ? response
                      ? { ...company, ...response }
                      : null
                    : company
                )
                .filter((company) => company !== null)
            );
          } else {
            console.error("Failed to verify emails");
          }
        } else {
          alert("Insufficient balance to verify emails.");
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 mt-20">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="relative p-4 sm:p-6 bg-white shadow-md rounded-lg transform transition-transform hover:scale-105 duration-300 ease-in-out border border-gray-200 flex flex-col"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-customGold via-customBlue to-customRed"></div>
              <div className="animate-pulse flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <div className="h-6 bg-slate-200 rounded w-24 mb-2 wave-bg"></div>
                  <div className="h-4 bg-slate-200 rounded w-32 wave-bg"></div>
                </div>
                <div className="shrink-0 mt-4 sm:mt-0 rounded-full bg-slate-200 h-16 w-16 wave-bg"></div>
              </div>
              <dl className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 flex-grow">
                <div>
                  <div className="h-4 bg-slate-200 rounded w-20 mb-2 wave-bg"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded wave-bg"></div>
                    <div className="h-3 bg-slate-200 rounded w-3/4 wave-bg"></div>
                  </div>
                </div>
                <div className="flex justify-center items-center sm:justify-end">
                  <div className="h-8 bg-slate-200 rounded w-24 wave-bg"></div>
                </div>
              </dl>
              <div className="flex flex-col sm:flex-row sm:justify-between mt-auto pt-4">
                <div className="h-4 bg-slate-200 rounded w-16 mb-2 sm:mb-0 wave-bg"></div>
                <div className="h-4 bg-slate-200 rounded w-16 wave-bg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (unlockdata.length === 0 || error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="bg-white bg-opacity-75 shadow-lg rounded-lg p-10 text-center transform transition-transform hover:scale-105 duration-300 ease-in-out border border-gray-200 max-w-lg mx-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            No Unlocks Yet!
          </h2>
          <p className="text-gray-600 mb-4">
            It seems you haven't unlocked anything yet.
          </p>
          <p className="text-gray-500 mb-6">
            Explore and unlock amazing features to see them here.
          </p>
          <Link
            to="/"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Discover Emails
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 mt-20">
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
