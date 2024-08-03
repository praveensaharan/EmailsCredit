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
import { useSession } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useCredits } from "../ContextApi/CreditsContext";

const { confirm } = Modal;

const Emails = () => {
  const [data, setData] = useState([]);
  const [unlockdata, setUnlockdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const { session } = useSession();
  const navigate = useNavigate();
  const { credits, setCredits, error } = useCredits();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchTableContents(), fetchUnlockEmails()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTableContents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/table-contents"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    const fetchUnlockEmails = async () => {
      if (session) {
        try {
          const token = await session.getToken();
          const response = await axios.get(
            "http://localhost:3000/companies-by-ids",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUnlockdata(response.data);
        } catch (err) {
          console.error("Error fetching unlock data:", err.message);
        }
      }
    };

    fetchData();
  }, [session]);

  const fetchCredits = async () => {
    if (session) {
      try {
        const token = await session.getToken();
        const response = await axios.get("http://localhost:3000/credits", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setCredits(response.data.credits);
        } else {
          throw new Error("Failed to fetch credits");
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    }
  };

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
    const isAlreadyUnlocked = unlockdata.some((item) => item.id === record.id);

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
    if (session) {
      try {
        setLoading(true); // Set loading to true at the start of the request
        const token = await session.getToken();
        const response = await axios.post(
          "http://localhost:3000/AddToUser",
          { id, companyName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          await fetchCredits(); // Fetch credits again after unlocking
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
    } else {
      Modal.error({
        title: "Error",
        content: "User session is not available.",
      });
    }
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
      render: (text, record) => (
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
      ),
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
