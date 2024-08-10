import React, { useState } from "react";
import EmailForm from "./EmailSending/EmailForm";
import PreviewComponent from "./EmailSending/PreviewComponent";
import { Card } from "antd";
import { useLocation } from "react-router-dom";

const ParentComponent = () => {
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const companyName = queryParams.get("companyName");

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start p-4 space-y-4 md:space-y-0 md:space-x-4 mt-20">
      <Card className="w-full md:w-1/2 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-customGold">Email Form</h2>
        <div className="max-h-[120vh] overflow-y-auto">
          <EmailForm onFormChange={handleFormChange} />
        </div>
      </Card>

      <Card className="w-full md:w-1/2 shadow-lg rounded-lg bg-customLightBlue">
        <h2 className="text-xl font-bold mb-4 text-customBlue">Preview</h2>
        <PreviewComponent
          data={formData}
          email={email}
          companyName={companyName}
        />
      </Card>
    </div>
  );
};

export default ParentComponent;
