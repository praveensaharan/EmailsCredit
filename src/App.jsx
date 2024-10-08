import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Nav from "./components/Nav";
import Emails from "./components/Emails";
import Unblure from "./components/Unblure";
import Payment from "./components/Payment";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react"; // Import useUser
import Protected from "./components/Protected";
import "./App.css";
import CouponCard from "./components/CouponCard";
import Additional from "./components/PaymentOptions";
import Insights from "./components/Insights";
import EmailPreview from "./components/EmailPreview";
import TextToEmail from "./components/Texttoemail/Starter";
import Footer from "./components/Footer";
import NotExist from "./components/NotExist";
import HomePage from "./components/HomePage/Home";
import Nav1 from "./components/HomePage/Nav";
import Footer1 from "./components/HomePage/Footer";
import Loading1 from "./components/Loading"; // Import Loading1
import Compensation from "./components/Compensation/Home";

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
  const { isLoaded } = useUser();
  if (!isLoaded) {
    return <Loading1 />;
  }
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <SignedOut>
          <Nav1 />
        </SignedOut>

        <SignedIn>
          <Nav />
        </SignedIn>
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
                    <HomePage />
                    {/* <Protected /> */}
                  </SignedOut>
                  <SignedIn>
                    <Emails />
                    <Insights />
                    <Compensation />
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
            <Route
              path="/preview"
              element={
                <>
                  <SignedOut>
                    <Protected />
                  </SignedOut>
                  <SignedIn>
                    <EmailPreview />
                  </SignedIn>
                </>
              }
            />
            <Route
              path="/add-emails"
              element={
                <>
                  <SignedOut>
                    <Protected />
                  </SignedOut>
                  <SignedIn>
                    <TextToEmail />
                  </SignedIn>
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <SignedOut>
                    <Navigate to="/" />
                  </SignedOut>
                  <SignedIn>
                    <NotExist />
                  </SignedIn>
                </>
              }
            />
          </Routes>
        </div>

        <SignedOut>
          <Footer1 />
        </SignedOut>
        <SignedIn>
          <Footer />
        </SignedIn>
      </div>
    </Router>
  );
};

export default App;
