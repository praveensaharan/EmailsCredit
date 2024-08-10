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
    <div className="flex justify-center items-start p-4 space-x-4 mt-20">
      {/* Scrollable form card */}
      <Card className="w-1/2 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Email Form</h2>
        <div className="max-h-[120vh] overflow-y-auto">
          <EmailForm onFormChange={handleFormChange} />
        </div>
      </Card>

      {/* Preview card */}
      <Card className="w-1/2 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
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
