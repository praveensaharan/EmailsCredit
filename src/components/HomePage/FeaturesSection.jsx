import React from "react";
import { Card } from "antd";
import { SearchOutlined, MailOutlined, RiseOutlined } from "@ant-design/icons";

const features = [
  {
    icon: <SearchOutlined />,
    title: "Search by Company",
    description:
      "Find the right contacts quickly by searching for companies relevant to your needs.",
  },
  {
    icon: <MailOutlined />,
    title: "Effortless Outreach",
    description:
      "Easily connect with key contacts through our streamlined email service.",
  },
  {
    icon: <RiseOutlined />,
    title: "Boost Referrals",
    description:
      "Increase your success rate with personalized outreach and targeted connections.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-20 px-5 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-12">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="text-left">
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
