import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const ConditionalComponent = ({ url, results }) => {
  const hasUrl = !!url;

  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="p-4 bg-[#CCCCCC] rounded-lg shadow-lg">
        <Title level={4} className="text-[#FF6600]">
          {results[0].company_name}
        </Title>
        <Text className="text-black block">{results[0].email}</Text>
        {results[0].email_verify ? (
          <Text className="mt-2 text-green-500 block">Email verified</Text>
        ) : (
          <Text className="mt-2 text-red-500 block">Email not verified</Text>
        )}
        {hasUrl && <Text className="text-black block">{url}</Text>}
      </div>
    </div>
  );
};

export default ConditionalComponent;
