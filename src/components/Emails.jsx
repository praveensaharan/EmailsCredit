// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Input, Tag, Button, Modal } from "antd";
// import {
//   LockTwoTone,
//   SyncOutlined,
//   CalendarOutlined,
//   ClockCircleOutlined,
//   ExclamationCircleOutlined,
// } from "@ant-design/icons";
// import moment from "moment";
// import "./Emails.css";

// const initialcredit = 0;

// const { confirm } = Modal;
// const Baseurl = "https://s3-to-emai.vercel.app";

// const initialData = [
//   {
//     id: 1,
//     company_name: "Company A",
//     company_domain: "companya.com",
//     creation_date: "2023-01-15T00:00:00Z",
//     last_verification_date: "2023-06-15T00:00:00Z",
//   },
//   {
//     id: 2,
//     company_name: "Company B",
//     company_domain: "companyb.com",
//     creation_date: "2022-11-20T00:00:00Z",
//     last_verification_date: "2023-05-31T00:00:00Z",
//   },
//   {
//     id: 3,
//     company_name: "Company C",
//     company_domain: "companyc.com",
//     creation_date: "2023-03-10T00:00:00Z",
//     last_verification_date: "2023-07-05T00:00:00Z",
//   },
//   {
//     id: 4,
//     company_name: "Company D",
//     company_domain: "companyd.com",
//     creation_date: "2022-08-05T00:00:00Z",
//     last_verification_date: "2023-03-10T00:00:00Z",
//   },
// ];

// const Emails = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [typingTimeout, setTypingTimeout] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setData(initialData); // Set initial data for testing
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching the data", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearch = (event) => {
//     const query = event.target.value;
//     setSearchQuery(query);

//     if (typingTimeout) {
//       clearTimeout(typingTimeout);
//     }

//     setTypingTimeout(
//       setTimeout(() => {
//         if (query) {
//           setSearchLoading(true);
//           const filteredResults = data.filter((item) =>
//             item.company_name.toLowerCase().includes(query.toLowerCase())
//           );
//           setSearchResults(filteredResults);
//           setSearchLoading(false);
//         } else {
//           setSearchResults(data);
//         }
//       }, 2000)
//     );
//   };

//   const calculateDaysSinceLastVerification = (lastVerificationDate) => {
//     const now = moment();
//     const lastVerificationMoment = moment(lastVerificationDate);
//     return now.diff(lastVerificationMoment, "days");
//   };

//   const showMoveConfirm = (record) => {
//     confirm({
//       title: "Are you sure you want to unlock these emails?",
//       icon: <ExclamationCircleOutlined />,
//       content: "This will charge your credits.",
//       onOk() {
//         if (initialcredit > 0) {
//           handleMove(record.id);
//         } else {
//           Modal.error({
//             title: "Error",
//             content: "Not enough credits to unlock emails",
//           });
//         }
//       },
//       onCancel() {
//         console.log("Cancel");
//       },
//     });
//   };

//   const handleMove = (id) => {
//     // Logic to handle move (unlock email) goes here
//     console.log("Unlock email for record id:", id);
//   };

//   const columns = [
//     {
//       title: "No.",
//       key: "index",
//       render: (text, record, index) => index + 1,
//       className: "text-center px-2 sm:px-4 py-2",
//     },
//     {
//       title: "Company Name",
//       dataIndex: "company_name",
//       key: "company_name",
//       className: "px-2 sm:px-4 py-2 text-center",
//       sorter: (a, b) => a.company_name.localeCompare(b.company_name),
//     },
//     {
//       title: "Company Domain",
//       dataIndex: "company_domain",
//       key: "company_domain",
//       className: "px-2 sm:px-4 py-2 text-center",
//       sorter: (a, b) => a.company_domain.localeCompare(b.company_domain),
//     },
//     {
//       title: "Emails",
//       key: "emails",
//       render: (text, record) => {
//         return (
//           <div className="relative flex items-center justify-center">
//             <Button type="default" onClick={() => showMoveConfirm(record)}>
//               <LockTwoTone
//                 twoToneColor="#f13c20"
//                 className="absolute z-10 text-xl"
//               />
//               <span
//                 className="blur-sm no-select no-copy"
//                 style={{ pointerEvents: "none" }}
//               >
//                 unblur@actual.com, unlockactual@mail.com
//               </span>
//             </Button>
//           </div>
//         );
//       },
//       className: "text-center px-2 sm:px-4 py-2",
//     },
//   ];

//   useEffect(() => {
//     const handleContextMenu = (e) => e.preventDefault();
//     const handleCopy = (e) => e.preventDefault();
//     document.addEventListener("contextmenu", handleContextMenu);
//     document.addEventListener("copy", handleCopy);

//     return () => {
//       document.removeEventListener("contextmenu", handleContextMenu);
//       document.removeEventListener("copy", handleCopy);
//     };
//   }, []);

//   const dataSource = searchQuery ? searchResults : data;

//   return (
//     <div className="container mx-auto p-2 sm:p-4 bg-customLightBlue rounded-xl shadow-lg">
//       <Input
//         placeholder="Search...(2s delay)"
//         className="w-52 mb-2 p-2 border-2 focus:border-customLightGold rounded-xl border-customRed transition duration-200"
//         onChange={handleSearch}
//       />
//       <p className="text-2xl font-semibold text-customGold mb-4 my-4">
//         Top 200 Data
//       </p>
//       {(loading || searchLoading) && <SyncOutlined spin />}
//       <Table
//         rowClassName={() => "rowClassName1"}
//         columns={columns}
//         expandable={{
//           expandedRowRender: (record) => (
//             <div className="p-4 bg-customLightGold rounded-lg">
//               <p className="text-customRed flex items-center font-semibold">
//                 <Tag color="#4056a1">
//                   <CalendarOutlined className="mr-2 font-bold text-base" />
//                   <span className="font-bold mr-2">Creation Date: </span>
//                   {moment(record.creation_date).format("YYYY-MM-DD")}
//                 </Tag>
//               </p>
//               <p className="text-customBlue flex items-center font-semibold mt-1">
//                 <Tag color="green">
//                   <ClockCircleOutlined className="mr-2 font-bold text-base" />
//                   <span className="font-bold mr-2">
//                     Days Last Verification:
//                   </span>
//                   {calculateDaysSinceLastVerification(
//                     record.last_verification_date
//                   )}
//                 </Tag>
//               </p>
//             </div>
//           ),
//           rowExpandable: (record) => record.name !== "Not Expandable",
//         }}
//         dataSource={dataSource}
//         loading={loading || searchLoading}
//         rowKey="id"
//         className="bg-transparent shadow-lg mb-20 mt-5 rounded-2xl"
//         pagination={false}
//         bordered
//         scroll={{ x: 800 }}
//       />
//     </div>
//   );
// };

// export default Emails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Tag, Button, Modal } from "antd";
import {
  LockTwoTone,
  SyncOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "./Emails.css";

const initialcredit = 0;
const { confirm } = Modal;

const Emails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/table-contents"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (query) {
          setSearchLoading(true);
          const filteredResults = data.filter((item) =>
            item.companyName.toLowerCase().includes(query.toLowerCase())
          );
          setSearchResults(filteredResults);
          setSearchLoading(false);
        } else {
          setSearchResults(data);
        }
      }, 2000)
    );
  };

  const calculateDaysSinceLastVerification = (lastVerificationDate) => {
    const now = moment();
    const lastVerificationMoment = moment(lastVerificationDate);
    return now.diff(lastVerificationMoment, "days");
  };

  const showMoveConfirm = (record) => {
    confirm({
      title: "Are you sure you want to unlock these emails?",
      icon: <ExclamationCircleOutlined />,
      content: "This will charge your credits.",
      onOk() {
        if (initialcredit > 0) {
          handleMove(record.id);
        } else {
          Modal.error({
            title: "Error",
            content: "Not enough credits to unlock emails",
          });
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleMove = (id) => {
    // Logic to handle move (unlock email) goes here
    console.log("Unlock email for record id:", id);
  };

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (text, record, index) => index + 1,
      className: "text-center px-2 sm:px-4 py-2",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      className: "px-2 sm:px-4 py-2 text-center",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    },
    {
      title: "Company Domain",
      dataIndex: "companyDomain",
      key: "companyDomain",
      className: "px-2 sm:px-4 py-2 text-center",
      sorter: (a, b) => a.companyDomain.localeCompare(b.companyDomain),
    },
    {
      title: "Emails",
      key: "emails",
      render: (text, record) => {
        return (
          <div className="relative flex items-center justify-center">
            <Button type="default" onClick={() => showMoveConfirm(record)}>
              <LockTwoTone
                twoToneColor="#f13c20"
                className="absolute z-10 text-xl"
              />
              <span
                className="blur-sm no-select no-copy"
                style={{ pointerEvents: "none" }}
              >
                unblur@actual.com, unlockactual@mail.com
              </span>
            </Button>
          </div>
        );
      },
      className: "text-center px-2 sm:px-4 py-2",
    },
  ];

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleCopy = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  const dataSource = searchQuery ? searchResults : data;

  return (
    <div className="container mx-auto p-2 sm:p-4 bg-customLightBlue rounded-xl shadow-lg">
      <Input
        placeholder="Search...(2s delay)"
        className="mt-20 w-52 mb-2 p-2 border-2 focus:border-customLightGold rounded-xl border-customRed transition duration-200"
        onChange={handleSearch}
      />
      <p className="text-2xl font-semibold text-customGold mb-4 my-4">
        Top 200 Data
      </p>
      {(loading || searchLoading) && <SyncOutlined spin />}
      <Table
        rowClassName={() => "rowClassName1"}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <div className="p-4 bg-customLightGold rounded-lg">
              <p className="text-customRed flex items-center font-semibold">
                <Tag color="#4056a1">
                  <CalendarOutlined className="mr-2 font-bold text-base" />
                  <span className="font-bold mr-2">Creation Date: </span>
                  {moment(record.creationDate).format("YYYY-MM-DD")}
                </Tag>
              </p>
              <p className="text-customBlue flex items-center font-semibold mt-1">
                <Tag color="green">
                  <ClockCircleOutlined className="mr-2 font-bold text-base" />
                  <span className="font-bold mr-2">
                    Days Last Verification:
                  </span>
                  {calculateDaysSinceLastVerification(
                    record.lastVerificationDate
                  )}
                </Tag>
              </p>
            </div>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={dataSource}
        loading={loading || searchLoading}
        rowKey="id"
        className="bg-transparent shadow-lg mb-20 mt-5 rounded-2xl"
        pagination={false}
        bordered
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default Emails;
