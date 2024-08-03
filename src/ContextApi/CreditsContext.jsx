// CreditsContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useSession } from "@clerk/clerk-react";

const CreditsContext = createContext();

export const CreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState(null);
  const [error, setError] = useState(null);
  const { session } = useSession();

  useEffect(() => {
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
          setError(error.message);
        }
      }
    };

    fetchCredits();
  }, [session]);

  return (
    <CreditsContext.Provider value={{ credits, setCredits, error }}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error("useCredits must be used within a CreditsProvider");
  }
  return context;
};
