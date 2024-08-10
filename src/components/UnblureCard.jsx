import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  CalendarTwoTone,
  MailTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import MinidenticonImg from "./MinidenticonImg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const UnblureCard = ({
  id,
  companyName,
  companyDomain,
  emails,
  creationDate,
  lastVerificationDate,
  onVerify,
}) => {
  const [loading, setLoading] = useState(false);

  const now = moment().utcOffset(0);

  const lastVerificationMoment = moment(
    lastVerificationDate,
    "YYYY-MM-DDTHH:mm:ss.SSSZ"
  );
  const diffInMinutes = now.diff(lastVerificationMoment, "minutes") - 330;
  const diffInHours = now.diff(lastVerificationMoment, "hours") - 5;
  const diffInDays = now.diff(lastVerificationMoment, "days");

  const hoursRemaining = diffInHours % 24;

  const minutesRemaining = diffInMinutes % 60;

  let timeAgo = "";
  if (diffInDays >= 1) {
    timeAgo = `${diffInDays} days`;
    if (hoursRemaining > 0) {
      timeAgo += ` ${hoursRemaining} hours`;
    }
  } else if (diffInHours > 0) {
    timeAgo = `${diffInHours} hours`;
    if (minutesRemaining > 0) {
      timeAgo += ` ${minutesRemaining} minutes`;
    }
  } else {
    timeAgo = `${diffInMinutes} minutes`;
  }

  timeAgo += " ago";

  const handleVerify = async () => {
    setLoading(true);
    if (onVerify) {
      await onVerify(id, emails.length);
    }
    setLoading(false);
  };

  return (
    <div className="relative p-4 sm:p-6 bg-white shadow-md rounded-lg transform transition-transform hover:scale-105 duration-300 ease-in-out border border-gray-200 flex flex-col">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-customGold via-customBlue to-customRed"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            {companyName}
          </h3>
          <p className="text-sm text-gray-500">{companyDomain}</p>
        </div>
        <div className="shrink-0 mt-4 sm:mt-0">
          <MinidenticonImg
            username={companyDomain}
            width="64"
            height="64"
            className="rounded-lg object-cover shadow-sm"
            alt={companyDomain}
          />
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 flex-grow">
        <div>
          <dt className="flex items-center text-sm font-medium text-gray-600">
            <MailTwoTone twoToneColor="#eb2f96" className="mr-1" /> Emails
          </dt>
          <dd className="mt-1 text-xs text-gray-500">
            {emails.map((email, index) => (
              <p key={index}>
                <Link
                  to={`/preview?email=${encodeURIComponent(
                    email
                  )}&companyName=${encodeURIComponent(companyName)}`}
                  className="text-customBlue hover:underline hover:text-customGold"
                >
                  {email}
                </Link>
              </p>
            ))}
          </dd>
        </div>

        <div className="flex justify-center items-center sm:justify-end">
          <button
            className={`flex items-center gap-2 rounded-lg px-2 py-1 text-xs font-bold text-customRed bg-customLightGold hover:bg-customLightBlue transition-all ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            type="button"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 mr-1 text-customRed"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Verify Again Emails
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg>
              </>
            )}
          </button>
        </div>
      </dl>

      <div className="flex flex-col sm:flex-row sm:justify-between mt-auto pt-4">
        <div className="flex items-center text-gray-700 mb-2 sm:mb-0">
          <CalendarTwoTone twoToneColor="#eb2f96" className="mr-1" />

          <Tippy
            content="✨ When the company was added to the list "
            arrow={true}
            delay={[200, 0]}
            animation="scale"
            theme="light"
          >
            <span className="text-xs bg-customLightBlue px-2 py-1 rounded">
              {moment(creationDate).format("YYYY-MM-DD")}
            </span>
          </Tippy>
        </div>
        <div className="flex items-center text-gray-700">
          <CheckCircleTwoTone twoToneColor="#eb2f96" className="mr-1" />{" "}
          <Tippy
            content="✅ Last when the emails were verified"
            arrow={true}
            delay={[200, 0]}
            animation="scale"
            theme="light"
          >
            <span className="text-xs bg-customLightBlue px-2 py-1 rounded">
              {timeAgo}
            </span>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default UnblureCard;
