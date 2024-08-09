import React, { useState, useRef } from "react";
import { Form, Select, Input, Button, Divider, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const JobTitleSelect = ({
  form,
  jobTitleItems,
  setJobTitleItems,
  handleSelectChange,
}) => {
  const [name, setName] = useState("");
  const [otherJobTitleSelected, setOtherJobTitleSelected] = useState(false);
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = () => {
    if (name && !jobTitleItems.includes(name)) {
      setJobTitleItems([...jobTitleItems, name]);
      setName("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <>
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
                  onClick={addItem}
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
    </>
  );
};

export default JobTitleSelect;
