import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "@clerk/clerk-react";

const CreditsContext = createContext();
const BaseUrl = "https://pricemailbackend.vercel.app";
// const BaseUrl = "http://localhost:3000";

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [unlockdata, setUnlockdata] = useState([]);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      setLoading(true);
      Promise.all([
        fetchTableContents(),
        fetchCredits(),
        fetchTransactionsEmails(),
        fetchUnlockEmails(),
      ]).finally(() => setLoading(false));
    }
  }, [session]);

  const fetchTableContents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/table-contents`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching the data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCredits = async () => {
    if (session) {
      try {
        const token = await session.getToken();
        const response = await axios.get(`${BaseUrl}/credits`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setCredits(response.data.credits);
        } else {
          console.error("Failed to fetch credits");
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    }
  };

  const fetchUnlockEmails = async () => {
    if (session) {
      try {
        const token = await session.getToken();
        const response = await axios.get(`${BaseUrl}/companies-by-ids`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUnlockdata(response.data);
        }
      } catch (err) {
        console.error("Error fetching unlock data:", err.message);
      }
    }
  };

  const fetchSearchResults = async (searchQuery) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/search/${encodeURIComponent(searchQuery)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching search results", error);
      return null;
    }
  };

  const addToEmailsCredits = async (id, companyName) => {
    try {
      setLoading(true);
      const token = await session.getToken();
      const response = await axios.post(
        `${BaseUrl}/AddToUser`,
        { id, companyName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        await Promise.all([
          fetchUnlockEmails(),
          fetchCredits(),
          fetchTransactionsEmails(),
        ]);
        return true;
      } else {
        console.error("Failed to add to emails credits");
        return false;
      }
    } catch (error) {
      console.error("Error adding to emails credits:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmails = async (id) => {
    if (session) {
      try {
        const token = await session.getToken();
        const response = await axios.post(
          `${BaseUrl}/verify`,
          { id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          await Promise.all([
            fetchCredits(),
            fetchTransactionsEmails(),
            fetchUnlockEmails(),
          ]);
          return response.data;
        } else {
          console.error("Verification failed");
          return null;
        }
      } catch (error) {
        console.error("Error verifying emails:", error);
      }
    } else {
      console.error("Session not found");
    }
  };

  const fetchTransactionsEmails = async () => {
    if (session) {
      try {
        const token = await session.getToken();
        const response = await axios.get(`${BaseUrl}/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
  };

  return (
    <CreditsContext.Provider
      value={{
        data,
        credits,
        unlockdata,
        fetchSearchResults,
        addToEmailsCredits,
        verifyEmails,
        transactions,
        setLoading,
        loading,
        fetchCredits,
        fetchTransactionsEmails,
        fetchUnlockEmails,
      }}
    >
      {children}
    </CreditsContext.Provider>
  );
};

export const useApi = () => useContext(CreditsContext);
