import {
  Modal,
  Steps,
  Form,
  Select,
  Input,
  Button,
  Divider,
  Space,
} from "antd";
import React, { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";

const { Step } = Steps;
const { Option, OptGroup } = Select;

const EmailSend = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [items, setItems] = useState([
    "LinkedIn",
    "Indeed",
    "Company's Career Page",
  ]);
  const [jobTitleItems, setJobTitleItems] = useState([
    "SDE Intern",
    "Associate SDE",
    "SDE I",
    "SDE II",
    "SDET",
    "PM",
    "APM",
    "Data Scientist",
    "Data Engineer",
    "ML Engineer",
    "Data Analyst",
    "UX Designer",
    "UI Designer ",
    "Product Designer",
  ]);
  const [industryItems, setIndustryItems] = useState([
    "Software Development",
    "Product Management",
    "Data Science",
    "Marketing",
    "Finance",
    "Human Resources",
    "Cybersecurity",
    "Cloud Computing",
    "Sales",
    "Customer Support",
    "Supply Chain Management",
    "Operations Management",
  ]);

  const [skillsItems, setSkillsItems] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Project Management",
    "Data Analysis",
    "Machine Learning",
    "AWS",
    "Docker",
    "Kubernetes",
    "Agile Methodologies",
    "SEO",
    "Copywriting",
    "Financial Analysis",
    "Excel",
    "Tableau",
    "Graphic Design",
    "UI/UX Design",
    "Scrum",
  ]);

  const [domainItems, setDomainItems] = useState([
    "FinTech",
    "HealthTech",
    "EduTech",
    "E-commerce",
    "Blockchain",
    "Artificial Intelligence",
    "Internet of Things (IoT)",
    "Gaming",
    "Real Estate",
    "Automotive",
    "Retail",
    "Hospitality",
    "Agriculture",
    "Telecommunications",
    "Energy",
    "Media and Entertainment",
    "Logistics",
    "Biotechnology",
    "Pharmaceuticals",
    "Construction",
  ]);

  const [name, setName] = useState("");
  const [otherPortalSelected, setOtherPortalSelected] = useState(false);
  const [otherJobTitleSelected, setOtherJobTitleSelected] = useState(false);
  const [otherIndustrySelected, setOtherIndustrySelected] = useState(false);
  const [otherSkillsSelected, setOtherSkillsSelected] = useState(false);
  const [otherDomainSelected, setOtherDomainSelected] = useState(false);
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (setItems, items, name, setName) => {
    if (name && !items.includes(name)) {
      setItems([...items, name]);
      setName("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleSelectChange = (value, setOtherSelected) => {
    setOtherSelected(value === "Other");
  };

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

    // Construct the subject line
    const subject = `Application for ${values.role} Position`;

    // Determine how to address the email
    const hiringManagerText = values.hiringManager
      ? `Dear ${values.hiringManager},`
      : "Dear Hiring Team,";

    // Ensure relevantSkills is always an array
    const relevantSkills = values.relevantSkills || [];

    // Construct the email body
    const body =
      `${hiringManagerText}%0D%0A%0D%0A` +
      `I hope this message finds you well. I am writing to express my interest in the ${values.role} position at ${values.companyName} that I discovered through ${values.jobPortal}.%0D%0A%0D%0A` +
      `I have ${values.yearsOfExperience} years of experience in ${
        values.industry
      }. I believe that my skills in ${relevantSkills.join(
        ", "
      )} align well with the requirements of the role, and I am confident that I can contribute effectively to your team.%0D%0A%0D%0A` +
      `Thank you for taking the time out of your busy schedule to consider my application. For your convenience, I have attached my resume to this email to provide you with a better understanding of my background. I would welcome the opportunity to discuss how my experience in ${values.industryDomain} makes me a strong candidate for this position.%0D%0A%0D%0A` +
      `I look forward to hearing from you soon.%0D%0A%0D%0A` +
      `Best Regards,%0D%0A` +
      `${values.fullName}%0D%0A` +
      `${
        values.contactInformation ? values.contactInformation + "%0D%0A" : ""
      }` +
      `${
        values.resume
          ? "Resume: " + encodeURIComponent(values.resume) + "%0D%0A"
          : ""
      }` +
      `${
        values.linkedinProfile
          ? "LinkedIn: " + encodeURIComponent(values.linkedinProfile) + "%0D%0A"
          : ""
      }` +
      `${
        values.githubProfile
          ? "Github: " + encodeURIComponent(values.githubProfile) + "%0D%0A"
          : ""
      }`;

    // Construct the mailto link
    const mailtoLink = `mailto:praveen40109@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    // Open the mailto link
    const tempLink = document.createElement("a");
    tempLink.href = mailtoLink;
    tempLink.click();
    setVisible(false);
  };

  const handleNextStep = () => {
    next();
  };

  const renderEmailPreview = () => {
    const values = form.getFieldsValue();
    const hiringManagerText = values.hiringManager
      ? `Dear ${values.hiringManager},`
      : "Dear Hiring Team,";

    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Email Preview</h2>
        <p>
          <strong>Subject:</strong> Application for {values.role} Position
        </p>
        <p>{hiringManagerText}</p>
        <p>
          I hope this message finds you well. I am writing to express my
          interest in the {values.role} position at {values.companyName} that I
          discovered through {values.jobPortal}.
        </p>
        <p>
          I have {values.yearsOfExperience} years of experience in{" "}
          {values.industry}. I believe that my skills in{" "}
          {values.relevantSkills.join(", ")} align well with the requirements of
          the role, and I am confident that I can contribute effectively to your
          team.
        </p>
        <p>
          Thank you for taking the time out of your busy schedule to consider my
          application. For your convenience, I have attached my resume to this
          email to provide you with a better understanding of my background. I
          would welcome the opportunity to discuss how my experience in{" "}
          {values.industryDomain} makes me a strong candidate for this position.
        </p>
        <p>I look forward to hearing from you soon.</p>
        <p>Best Regards,</p>
        <span>{values.fullName}</span>
        <br />
        {values.contactInformation && (
          <span>
            {values.contactInformation}
            <br />
          </span>
        )}
        {values.resume && (
          <span>
            Resume: {values.resume}
            <br />
          </span>
        )}
        {values.linkedinProfile && (
          <span>
            LinkedIn: {values.linkedinProfile}
            <br />
          </span>
        )}
        {values.githubProfile && (
          <span>
            Github: {values.githubProfile}
            <br />
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Form
      </Button>
      <Modal
        open={visible}
        title="Two-Page Form"
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Steps current={current} className="mb-5">
          <Step title="Page 1" />
          <Step title="Page 2" />
        </Steps>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ remember: true }}
        >
          {current === 0 && (
            <div className="space-y-4">
              {/* Job Title (Role) */}
              <Form.Item
                name="role"
                label="Job Title (Role)"
                rules={[
                  {
                    required: true,
                    message: "Please select or add a job title!",
                  },
                ]}
              >
                <Select
                  placeholder="Select a job title"
                  onChange={(value) =>
                    handleSelectChange(value, setOtherJobTitleSelected)
                  }
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider className="my-2" />
                      <Space className="px-2 pb-2">
                        <Input
                          placeholder="Please enter item"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                          className="flex-grow"
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={() =>
                            addItem(
                              setJobTitleItems,
                              jobTitleItems,
                              name,
                              setName
                            )
                          }
                          className="text-blue-500"
                        >
                          Add item
                        </Button>
                      </Space>
                    </>
                  )}
                  options={jobTitleItems.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </Form.Item>
              {otherJobTitleSelected && (
                <Form.Item
                  name="otherJobTitle"
                  label="Specify Job Title"
                  rules={[
                    {
                      required: true,
                      message: "Please specify the job title!",
                    },
                  ]}
                >
                  <Input placeholder="Please specify the job title" />
                </Form.Item>
              )}
              <Form.Item name="hiringManager" label="Hiring Manager Name">
                <Input placeholder="Name of HR" />
              </Form.Item>
              {/* Job Portal */}
              <Form.Item
                name="jobPortal"
                label="Job Portal/Medium"
                rules={[
                  {
                    required: true,
                    message: "Please select or add a job portal!",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select or add a job portal"
                  onChange={(value) =>
                    handleSelectChange(value, setOtherPortalSelected)
                  }
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider className="my-2" />
                      <Space className="px-2 pb-2">
                        <Input
                          placeholder="Please enter item"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                          className="flex-grow"
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={() =>
                            addItem(setItems, items, name, setName)
                          }
                          className="text-blue-500"
                        >
                          Add item
                        </Button>
                      </Space>
                    </>
                  )}
                  options={items.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </Form.Item>
              {otherPortalSelected && (
                <Form.Item
                  name="otherJobPortal"
                  label="Specify Job Portal"
                  rules={[
                    {
                      required: true,
                      message: "Please specify the job portal!",
                    },
                  ]}
                >
                  <Input placeholder="Please specify the job portal" />
                </Form.Item>
              )}

              {/* Years of Experience */}
              <Form.Item
                name="yearsOfExperience"
                label="Years of Experience"
                rules={[
                  {
                    required: true,
                    message: "Please input your years of experience!",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              {/* Relevant Industry */}
              <Form.Item
                name="industry"
                label="Relevant Industry"
                rules={[
                  {
                    required: true,
                    message: "Please select or add an industry!",
                  },
                ]}
              >
                <Select
                  placeholder="Select or add an industry"
                  onChange={(value) =>
                    handleSelectChange(value, setOtherIndustrySelected)
                  }
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider className="my-2" />
                      <Space className="px-2 pb-2">
                        <Input
                          placeholder="Please enter item"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                          className="flex-grow"
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={() =>
                            addItem(
                              setIndustryItems,
                              industryItems,
                              name,
                              setName
                            )
                          }
                          className="text-blue-500"
                        >
                          Add item
                        </Button>
                      </Space>
                    </>
                  )}
                  options={industryItems.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </Form.Item>
              {otherIndustrySelected && (
                <Form.Item
                  name="otherIndustry"
                  label="Specify Industry"
                  rules={[
                    {
                      required: true,
                      message: "Please specify the industry!",
                    },
                  ]}
                >
                  <Input placeholder="Please specify the industry" />
                </Form.Item>
              )}

              {/* Relevant Skills */}
              <Form.Item
                name="relevantSkills"
                label="Relevant Skills"
                rules={[
                  {
                    required: true,
                    message: "Please select or add your skills!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select relevant skills"
                  allowClear
                  onChange={(value) =>
                    handleSelectChange(
                      value[value.length - 1],
                      setOtherSkillsSelected
                    )
                  }
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider className="my-2" />
                      <Space className="px-2 pb-2">
                        <Input
                          placeholder="Please enter skill"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                          className="flex-grow"
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={() =>
                            addItem(setSkillsItems, skillsItems, name, setName)
                          }
                          className="text-blue-500"
                        >
                          Add skill
                        </Button>
                      </Space>
                    </>
                  )}
                  options={skillsItems.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </Form.Item>
              {otherSkillsSelected && (
                <Form.Item
                  name="otherSkills"
                  label="Specify Skill"
                  rules={[
                    {
                      required: true,
                      message: "Please specify the skill!",
                    },
                  ]}
                >
                  <Input placeholder="Please specify the skill" />
                </Form.Item>
              )}

              {/* Industry Domain */}
              <Form.Item
                name="industryDomain"
                label="Industry Domain"
                rules={[
                  {
                    required: true,
                    message: "Please select or add an industry domain!",
                  },
                ]}
              >
                <Select
                  placeholder="Select or add an industry domain"
                  onChange={(value) =>
                    handleSelectChange(value, setOtherDomainSelected)
                  }
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider className="my-2" />
                      <Space className="px-2 pb-2">
                        <Input
                          placeholder="Please enter item"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                          className="flex-grow"
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={() =>
                            addItem(setDomainItems, domainItems, name, setName)
                          }
                          className="text-blue-500"
                        >
                          Add domain
                        </Button>
                      </Space>
                    </>
                  )}
                  options={domainItems.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </Form.Item>
              {otherDomainSelected && (
                <Form.Item
                  name="otherDomain"
                  label="Specify Industry Domain"
                  rules={[
                    {
                      required: true,
                      message: "Please specify the industry domain!",
                    },
                  ]}
                >
                  <Input placeholder="Please specify the industry domain" />
                </Form.Item>
              )}

              {/* Full Name */}
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  { required: true, message: "Please input your full name!" },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Contact Information */}
              <Form.Item name="contactInformation" label="Contact Information">
                <Input placeholder="e.g., phone number, email address" />
              </Form.Item>

              {/* Resume Link */}
              <Form.Item name="resume" label="Resume Link">
                <Input placeholder="Drive Link or Other" />
              </Form.Item>

              {/* LinkedIn Profile */}
              <Form.Item name="linkedinProfile" label="LinkedIn Profile">
                <Input placeholder="https://www.linkedin.com/in/xxxxxxxxx" />
              </Form.Item>

              {/* Github Profile */}
              <Form.Item name="githubProfile" label="Github Profile">
                <Input placeholder="https://github.com/xxxxx" />
              </Form.Item>
            </div>
          )}
          {current === 1 && renderEmailPreview()}
          <div className="mt-5 flex justify-end space-x-4">
            <Button type="default" onClick={prev} disabled={current === 0}>
              Previous
            </Button>
            {current < 1 && (
              <Button type="default" onClick={handleNextStep}>
                Next
              </Button>
            )}
            {current === 1 && (
              <>
                <button onClick={() => handleFinish(values)}>Send Email</button>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={current === 1 && !form.isFieldsTouched(true)}
                >
                  Submit
                </Button>
              </>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default EmailSend;
