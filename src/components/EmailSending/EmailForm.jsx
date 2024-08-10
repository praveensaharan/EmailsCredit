import React, { useState, useRef } from "react";
import { Form, Select, Input, Button, Divider, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const EmailForm = ({ onFormChange }) => {
  const [form] = Form.useForm();
  const [jobPortalItems, setJobPortalItems] = useState([
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

  const inputRef = useRef(null);
  const [name, setName] = useState("");

  const addItem = (setter, items, name, setName) => {
    if (name && !items.includes(name)) {
      setter([...items, name]);
      setName("");
    }
  };

  return (
    <Form form={form} layout="vertical" onValuesChange={onFormChange}>
      <Form.Item
        name="role"
        label="Job Title (Role)"
        rules={[
          { required: true, message: "Please select or add a job title!" },
        ]}
      >
        <Select
          placeholder="Select a job title"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider className="my-2" />
              <Space className="px-2 pb-2">
                <Input
                  placeholder="Please enter job title"
                  ref={inputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="flex-grow"
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    addItem(setJobTitleItems, jobTitleItems, name, setName)
                  }
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

      <Form.Item
        name="jobPortal"
        label="Job Portal/Medium"
        rules={[
          { required: true, message: "Please select or add a job portal!" },
        ]}
      >
        <Select
          placeholder="Select or add a job portal"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider className="my-2" />
              <Space className="px-2 pb-2">
                <Input
                  placeholder="Please enter job portal"
                  ref={inputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="flex-grow"
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    addItem(setJobPortalItems, jobPortalItems, name, setName)
                  }
                >
                  Add item
                </Button>
              </Space>
            </>
          )}
          options={jobPortalItems.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </Form.Item>
      <Form.Item name="hiringManager" label="Hiring Manager Name">
        <Input placeholder="Name of HR" />
      </Form.Item>

      <Form.Item name="companyName" label="Company Name">
        <Input placeholder="Name of Company" />
      </Form.Item>

      <Form.Item
        name="yearsOfExperience"
        label="Years of Experience"
        rules={[
          { required: true, message: "Please input your years of experience!" },
        ]}
      >
        <Input type="number" placeholder="Enter your years of experience" />
      </Form.Item>

      <Form.Item
        name="industry"
        label="Relevant Industry"
        rules={[
          { required: true, message: "Please select or add an industry!" },
        ]}
      >
        <Select
          placeholder="Select or add an industry"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider className="my-2" />
              <Space className="px-2 pb-2">
                <Input
                  placeholder="Please enter industry"
                  ref={inputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="flex-grow"
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    addItem(setIndustryItems, industryItems, name, setName)
                  }
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

      <Form.Item
        name="relevantSkills"
        label="Relevant Skills"
        rules={[
          { required: true, message: "Please select or add your skills!" },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Select relevant skills"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider className="my-2" />
              <Space className="px-2 pb-2">
                <Input
                  placeholder="Please enter skill"
                  ref={inputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="flex-grow"
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    addItem(setSkillsItems, skillsItems, name, setName)
                  }
                >
                  Add item
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
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider className="my-2" />
              <Space className="px-2 pb-2">
                <Input
                  placeholder="Please enter industry domain"
                  ref={inputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="flex-grow"
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    addItem(setDomainItems, domainItems, name, setName)
                  }
                >
                  Add item
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

      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: "Please input your full name!" }]}
      >
        <Input placeholder="Enter your full name" />
      </Form.Item>

      <Form.Item name="contactInformation" label="Contact Information">
        <Input placeholder="e.g., phone number, email address" />
      </Form.Item>

      <Form.Item name="resume" label="Resume Link">
        <Input placeholder="Drive Link or Other" />
      </Form.Item>

      <Form.Item name="linkedinProfile" label="LinkedIn Profile">
        <Input placeholder="https://www.linkedin.com/in/xxxxxxxxx" />
      </Form.Item>

      <Form.Item name="githubProfile" label="Github Profile">
        <Input placeholder="https://github.com/xxxxx" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmailForm;
