import React, { useState } from "react";
import { Modal, Steps, Form, Button } from "antd";
import JobTitleSelect from "./JobTitleSelect";
import JobPortalSelect from "./JobPortalSelect";
import EmailPreview from "./EmailPreview";

const { Step } = Steps;

const EmailSend = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [jobTitleItems, setJobTitleItems] = useState([
    "SDE Intern",
    "Associate SDE",
    // ...other job titles
  ]);
  const [items, setItems] = useState([
    "LinkedIn",
    "Indeed",
    // ...other portals
  ]);

  const next = () => {
    setCurrent((prev) => prev + 1);
  };

  const prev = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleFinish = (values) => {
    console.log("Form values:", values);
    setVisible(false);
  };

  const handleNextStep = () => {
    next();
  };

  const handleSelectChange = (value, setOtherSelected) => {
    setOtherSelected(value === "Other");
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Form
      </Button>
      <Modal
        open={visible}
        title="Two-Step Form with Email Preview"
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Steps current={current}>
          <Step title="Form" />
          <Step title="Preview" />
        </Steps>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="mt-8"
        >
          {current === 0 && (
            <>
              <JobTitleSelect
                form={form}
                jobTitleItems={jobTitleItems}
                setJobTitleItems={setJobTitleItems}
                handleSelectChange={handleSelectChange}
              />
              <JobPortalSelect
                items={items}
                setItems={setItems}
                handleSelectChange={handleSelectChange}
              />
              {/* Other form items can be added here */}
            </>
          )}
          {current === 1 && <EmailPreview form={form} />}
          <Form.Item>
            <div className="flex justify-between">
              {current > 0 && (
                <Button onClick={prev} className="mr-2">
                  Previous
                </Button>
              )}
              {current < 1 && (
                <Button type="primary" onClick={handleNextStep}>
                  Next
                </Button>
              )}
              {current === 1 && (
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmailSend;
