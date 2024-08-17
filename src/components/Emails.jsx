import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useApi } from "../ContextApi/CreditsContext";

const { confirm } = Modal;

const Emails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const {
    data, // Assuming this contains the default data
    unlockdata,
    credits,
    setLoading,
    loading,
    fetchSearchResults,
    addToEmailsCredits,
    insights,
  } = useApi();
  const navigate = useNavigate();

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchSearchResults1 = async () => {
    try {
      const response = await fetchSearchResults(searchQuery);
      setSearchResults(response);
      setSearchLoading(false);
    } catch (error) {
      console.error("Error fetching search results", error);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setSearchLoading(true);
      setTypingTimeout(setTimeout(fetchSearchResults1, 2000));
    } else {
      setSearchResults([]);
      setSearchLoading(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const calculateDaysSinceLastVerification = (lastVerificationDate) => {
    const now = moment();
    const lastVerificationMoment = moment(lastVerificationDate);
    return now.diff(lastVerificationMoment, "days");
  };

  const showMoveConfirm = (record) => {
    // console.log("Button clicked for record: ", record); // Debug log
    const isAlreadyUnlocked = unlockdata.some((item) => item.id === record.id);
    // console.log(unlockdata);

    if (isAlreadyUnlocked) {
      Modal.info({
        title: "Info",
        content: "This company is already unlocked.",
        onOk() {
          console.log("Already unlocked info acknowledged");
        },
      });
      return;
    }

    confirm({
      title: "Are you sure you want to unlock these emails?",
      icon: <ExclamationCircleOutlined />,
      content: "This will charge your credits.",
      onOk() {
        if (credits > 0) {
          handleMove(record.id, record.companyName);
        } else {
          Modal.error({
            title: "Error",
            content: "Not enough credits to unlock emails",
          });
        }
      },
      onCancel() {
        console.log("Cancelled");
      },
    });
  };

  const handleMove = async (id, companyName) => {
    try {
      setLoading(true);
      const response = await addToEmailsCredits(id, companyName);
      if (response === true) {
        navigate("/unblure");
      } else {
        throw new Error("Failed to unlock emails");
      }
    } catch (error) {
      console.error("Error unlocking emails:", error);
      Modal.error({
        title: "Error",
        content: "Failed to unlock emails. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (text, record, index) => index + 1,
      className: "text-center px-2 sm:px-4 py-2",
      fixed: "left",
      width: isSmallScreen ? 50 : 80,
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      className: "px-2 sm:px-4 py-2 text-center z-11",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
      fixed: "left",
      width: isSmallScreen ? 100 : "",
    },
    {
      title: "Company Domain",
      dataIndex: "companyDomain",
      key: "companyDomain",
      className: "px-2 sm:px-4 py-2 text-center",
      width: isSmallScreen ? 90 : 180,
    },
    {
      title: "Emails",
      key: "emails",
      render: (text, record) => (
        <div className="relative flex items-center justify-center">
          <Button type="default" onClick={() => showMoveConfirm(record)}>
            <LockTwoTone
              twoToneColor="#f13c20"
              className="absolute z-3 text-xl"
            />
            <span
              className="blur-sm no-select no-copy"
              style={{ pointerEvents: "none" }}
            >
              {isSmallScreen
                ? "unblur@actual.com"
                : "unblur@actual.com, unlockactual@mail.com"}
            </span>
          </Button>
        </div>
      ),
      className: "text-center px-2 sm:px-4 py-2",
      width: isSmallScreen ? 160 : "",
    },
    {
      title: "Days Last Verification",
      dataIndex: "lastVerificationDate",
      key: "lastVerificationDate",
      className: "px-2 sm:px-4 py-2 text-center",
      render: (text, record) => (
        <Tag color="green">
          <ClockCircleOutlined className="mr-2 font-bold text-base" />
          {calculateDaysSinceLastVerification(record.lastVerificationDate)}
        </Tag>
      ),
      width: isSmallScreen ? 100 : 140,
    },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
      className: "px-2 sm:px-4 py-2 text-center",
      render: (text, record) => (
        <Tag color="#4056a1">
          <CalendarOutlined className="mr-2 font-bold text-base" />
          {moment(record.creationDate).format("YYYY-MM-DD")}
        </Tag>
      ),
      width: isSmallScreen ? "" : 190,
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
    <div className="mx-auto p-2 sm:p-4 rounded-xl shadow-lg mt-16 sm:mt-0 bg-gray-100">
      <Input
        placeholder="Search...(2s delay)"
        className="mt-4 sm:mt-20 w-full sm:w-52 mb-2 p-2 border-2 focus:border-customLightGold rounded-xl border-customRed transition duration-200"
        onChange={handleSearchChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Total Companies</p>
          <p className="text-3xl font-semibold text-green-600">
            {insights.total_companies}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Total Emails</p>
          <p className="text-3xl font-semibold text-blue-600">
            {insights.total_emails}
          </p>
        </div>
      </div>
      <p className="text-xl sm:text-2xl font-semibold text-customGold mb-4 my-4">
        Top 50 Data Based on Verification
      </p>

      {(loading || searchLoading) && <SyncOutlined spin />}

      <div className="overflow-x-auto">
        <Table
          rowClassName={() => "rowClassName1"}
          columns={columns}
          dataSource={dataSource}
          loading={loading || searchLoading}
          rowKey="key"
          className="bg-transparent shadow-lg mb-20 mt-5 rounded-2xl"
          pagination={false}
          bordered
          scroll={{
            x: "calc(400px + 70%)",
            y: 450,
          }}
          sticky
        />
      </div>
    </div>
  );
};

export default Emails;
