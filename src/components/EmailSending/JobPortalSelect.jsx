import React, { useState, useRef } from "react";
import { Form, Select, Input, Button, Divider, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const JobPortalSelect = ({ items, setItems, handleSelectChange }) => {
  const [name, setName] = useState("");
  const [otherPortalSelected, setOtherPortalSelected] = useState(false);
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = () => {
    if (name && !items.includes(name)) {
      setItems([...items, name]);
      setName("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <>
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
                  onClick={addItem}
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
    </>
  );
};

export default JobPortalSelect;
