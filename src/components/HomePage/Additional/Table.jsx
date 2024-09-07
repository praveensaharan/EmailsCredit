import React, { useEffect } from "react";
import { LockClosedIcon, RefreshIcon, ClockIcon } from "@heroicons/react/solid";
import moment from "moment";
import { useApi } from "../../../ContextApi/CreditsContext";

const DataTable = () => {
  const { fetchTableContents, data, loading } = useApi();

  useEffect(() => {
    fetchTableContents();
  }, []);

  const calculateDaysSinceLastVerification = (lastVerificationDate) => {
    return moment().diff(moment(lastVerificationDate), "days");
  };

  return (
    <div className="mx-auto p-4 rounded-xl shadow-lg mt-16 bg-transparent text-card-foreground font-sans skew-y-6 hover:skew-y-0 transition-all duration-1000">
      {loading ? (
        <div className="flex justify-center">
          <RefreshIcon className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full border border-border rounded-lg">
            <thead>
              <tr className="text-center bg-secondary text-secondary-foreground rounded-t-lg">
                <th className="py-2 px-4 border border-border font-semibold">
                  Company Name
                </th>
                <th className="py-2 px-4 border border-border font-semibold">
                  Emails
                </th>
                <th className="py-2 px-4 border border-border font-semibold">
                  Days Last Verification
                </th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 8).map((record) => (
                <tr
                  key={record.key}
                  className="text-center hover:bg-muted transition-colors rounded-lg"
                >
                  <td className="py-2 px-4 border border-border font-medium rounded-l-lg">
                    {record.companyName}
                  </td>
                  <td className="py-2 px-4 border border-border font-medium">
                    <div className="relative inline-block disabled">
                      <LockClosedIcon className="h-5 w-5 text-destructive" />
                    </div>
                  </td>
                  <td className="py-2 px-2 border border-border font-medium rounded-r-lg">
                    <span className="inline-flex items-center text-accent">
                      <ClockIcon className="h-5 w-5 mr-1" />
                      {calculateDaysSinceLastVerification(
                        record.lastVerificationDate
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTable;
