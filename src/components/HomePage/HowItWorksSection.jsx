import React from "react";
import { Steps } from "antd";
import {
  UserAddOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

const HowItWorksSection = () => {
  return (
    <div className="py-20 px-5 bg-white text-center">
      <h2 className="text-4xl font-bold mb-12">How It Works</h2>
      <Steps direction="vertical" className="max-w-4xl mx-auto">
        <Step
          title="Sign Up in Seconds"
          description="Create your free account with just a few clicks."
          icon={<UserAddOutlined />}
        />
        <Step
          title="Search for Contacts"
          description="Use our intuitive search to find the right people at the companies you're targeting."
          icon={<SearchOutlined />}
        />
        <Step
          title="Send Your Email"
          description="Craft and send your email directly from our platform."
          icon={<SendOutlined />}
        />
      </Steps>
    </div>
  );
};

export default HowItWorksSection;
