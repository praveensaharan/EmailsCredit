import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Emails from "./components/Emails";
import Unblure from "./components/Unblure";
import Payment from "./components/Payment";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Protected from "./components/Protected";
import "./App.css";
import CouponCard from "./components/CouponCard";
import Additional from "./components/PaymentOptions";
import Insights from "./components/Insights";

const generateRandomAnimation = () => {
  const animationDuration = `${Math.random() * 5 + 3}s`;
  const animationDelay = `${Math.random()}s`;
  const translateX = `${(Math.random() * window.innerWidth) / 2}px`; // Half the viewport width
  const translateY = `${(Math.random() * window.innerHeight) / 2}px`; // Half the viewport height
  const rotate = `${Math.random() * 360}deg`;

  return {
    "--float-translate-x": translateX,
    "--float-translate-y": translateY,
    "--float-rotate": rotate,
    animationDuration,
    animationDelay,
  };
};

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <div className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-4">
            {[...Array(30)].map((_, index) => (
              <div
                key={index}
                className="absolute w-3 h-3 bg-orange rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  ...generateRandomAnimation(),
                }}
              />
            ))}
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SignedOut>
                    <Protected />
                  </SignedOut>
                  <SignedIn>
                    <Emails />
                    <Insights />
                  </SignedIn>
                </>
              }
            />
            <Route
              path="/unblure"
              element={
                <>
                  <SignedOut>
                    <Protected />
                  </SignedOut>
                  <SignedIn>
                    <Unblure />
                  </SignedIn>
                </>
              }
            />
            <Route
              path="/payment"
              element={
                <>
                  <SignedOut>
                    <Protected />
                  </SignedOut>
                  <SignedIn>
                    <Payment />
                  </SignedIn>
                </>
              }
            />
            <Route
              path="/credit"
              element={
                <>
                  <SignedOut>
                    <Protected />
                  </SignedOut>
                  <SignedIn>
                    <CouponCard />
                    <Additional />
                  </SignedIn>
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
