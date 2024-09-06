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
    <div className="py-20 px-5 bg-gradient-to-r from-primary to-secondary text-center">
      <h2 className="text-5xl font-heading font-extrabold text-primary-foreground mb-12">
        Our Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="transform transition duration-300 hover:scale-105 hover:shadow-xl text-left p-6 bg-card rounded-lg"
            hoverable
          >
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl text-accent">{feature.icon}</div>
            </div>
            <h3 className="text-2xl font-heading font-bold text-card-foreground mb-4 text-center">
              {feature.title}
            </h3>
            <p className="text-body text-muted-foreground text-center">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
