import React from "react";
import { Card, Button } from "antd";

const plans = [
  {
    title: "Free",
    price: "$0/mo",
    features: ["Basic features", "Limited emails"],
  },
  {
    title: "Pro",
    price: "$29/mo",
    features: ["Advanced features", "Higher email limits"],
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: ["Custom plans", "For large teams"],
  },
];

const PricingSection = () => {
  return (
    <div className="py-20 px-5 bg-white text-center">
      <h2 className="text-4xl font-bold mb-12">Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card key={index} title={plan.title} bordered={false}>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <ul className="list-disc list-inside mb-6">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <Button type="primary">Choose Plan</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
