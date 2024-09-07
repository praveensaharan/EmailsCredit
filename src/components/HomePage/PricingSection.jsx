import React, { useState } from "react";
import { Card } from "antd";
import { FaRegPaperPlane, FaCopy, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

const plans = [
  {
    title: "Free",
    price: "10 credits",
    features: [
      "🚀 Essential Tools for Starters",
      "📧 Send Emails with Ease (Limited emails)",
      "✅ Email Verification for Accuracy",
      "🤖 AI-Assisted Email Writing (Limited)",
    ],
  },
  {
    title: "Pro",
    price: "Coming Soon",
    features: [
      "🌟 All-Inclusive Premium Features",
      "📈 Send More, Achieve More (Higher email limits)",
      "🔍 Verified Email Accuracy",
      "✍️ AI-Powered Email Drafting",
      "💼 Exclusive Company Compensation Insights",
      "📊 In-Depth Company Reports",
      "📣 Job Posting Opportunities",
      "🌐 Become a Contributor to Grow Your Influence",
    ],
  },
];

const PricingSection = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("GETFREE5");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="py-20 px-5 bg-background text-center">
      <h2 className="text-5xl font-heading font-extrabold mb-16 text-primary-foreground">
        Pricing
      </h2>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.95 }}
            className="transition-shadow duration-300 flex flex-col"
          >
            <Card
              title={
                <h3 className="text-3xl font-heading font-semibold text-primary-foreground mb-4">
                  {plan.title}
                </h3>
              }
              bordered={false}
              className="shadow-xl rounded-xl flex flex-col justify-between h-full"
              style={{ backgroundColor: "hsl(210, 100%, 12%)" }}
            >
              <p className="text-2xl font-handjet font-extrabold mb-6 text-primary-foreground">
                {plan.price}
              </p>
              <ul className="list-none mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground mb-3 pl-5 text-left font-body"
                  >
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                {plan.title === "Pro" ? (
                  <button
                    className="text-primary-foreground px-6 py-3 rounded-lg bg-muted cursor-not-allowed w-full"
                    disabled
                  >
                    Coming Soon
                  </button>
                ) : (
                  <SignInButton mode="modal" redirectUrl="/result">
                    <button className="text-accent-foreground px-6 py-3 rounded-lg bg-accent hover:bg-accent/80 w-full">
                      Sign Up
                    </button>
                  </SignInButton>
                )}
              </div>
            </Card>
          </motion.div>
        ))}

        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted text-center py-12 px-8 sm:px-16 rounded-xl shadow-2xl relative max-w-md w-full flex flex-col justify-between"
              style={{ backgroundColor: "hsl(210, 100%, 12%)" }}
            >
              <div className="flex shrink-0 bg-customBlue rounded-full justify-center py-4 shadow-lg mb-6">
                <Link
                  to="/"
                  className="flex items-center gap-3 font-heading text-white"
                >
                  <FaRegPaperPlane className="h-6 w-6 text-destructive animate-bounce" />
                  <span>EmailsCredits</span>
                </Link>
              </div>

              <h3 className="text-3xl font-heading font-semibold my-6 text-primary-foreground">
                Get 5 Credits Free to Find or Verify Emails
                <br />
                Using the Coupon Code Below
              </h3>

              <div className="flex items-center justify-center space-x-3 mb-8">
                <span className="border-dashed border-2 border-primary-foreground text-destructive px-5 py-3 rounded-l text-lg font-bold font-body">
                  GETFREE5
                </span>
                <span
                  className={`border border-primary-foreground bg-accent-foreground text-primary-foreground px-4 py-2 rounded-r cursor-pointer transition transform hover:scale-110 ${
                    isCopied ? "text-destructive" : ""
                  }`}
                  onClick={handleCopyCode}
                >
                  {isCopied ? (
                    <FaCheck />
                  ) : (
                    <FaCopy className="text-primary-foreground" />
                  )}
                </span>
              </div>

              <p className="text-sm font-body text-primary-foreground">
                Valid Till: 02 Dec, 2024
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
