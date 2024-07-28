import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input } from "antd";
import { LockTwoTone, SyncOutlined } from "@ant-design/icons";

const Baseurl = "https://s3-to-emai.vercel.app";

const Emails1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Baseurl}/database/tableextension`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}/database/searchextension/${encodeURIComponent(searchQuery)}`
      );
      setSearchResults(response.data);
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
      setTypingTimeout(setTimeout(() => fetchSearchResults(), 2000));
    } else {
      setSearchResults([]);
      setSearchLoading(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (text, record, index) => index + 1,
      className: "px-2 sm:px-4 py-2 text-center",
    },

    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      className: "px-2 sm:px-4 py-2 text-center",
    },
    {
      title: "Company Domain",
      dataIndex: "company_domain",
      key: "company_domain",
      className: "px-2 sm:px-4 py-2 text-center",
    },
    {
      title: "Emails",
      key: "emails",
      render: (text, record) => {
        return (
          <div className="relative flex items-center justify-center">
            <LockTwoTone
              twoToneColor="#f13c20"
              className="absolute z-10 text-xl"
            />
            <span className="blur-sm">
              unblur@actual.com, unloackactual@mail.com
            </span>
          </div>
        );
      },
      className: "px-2 sm:px-4 py-2 text-center",
    },
  ];

  const dataSource = searchQuery.trim() !== "" ? searchResults : data;

  return (
    <div className="container mx-auto p-2 sm:p-4 my-20">
      <input
        placeholder="Search...(2s delay)"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-52 mb-2 p-2 border-2 focus:border-customLightGold rounded-xl border-customRed transition duration-200"
      />
      <p className="text-2xl font-semibold text-customGold mb-4 my-4">
        Top 200 Data
      </p>
      <SyncOutlined spin />
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading || searchLoading}
        rowKey="id"
        className="bg-transparent shadow-lg"
        pagination={false}
        bordered
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default Emails1;
