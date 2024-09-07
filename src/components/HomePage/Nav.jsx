import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { FaRegPaperPlane, FaBars, FaTimes } from "react-icons/fa";
import React, { useState } from "react";
import { Spin } from "antd";
import { EuroCircleTwoTone } from "@ant-design/icons";

const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="app">
      <header className="fixed inset-x-0 z-10 top-0 w-full border-b border-card bg-background py-4 shadow-lg backdrop-blur-lg transition-all duration-500 hover:shadow-2xl">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2 text-foreground font-heading text-lg font-bold"
              >
                <FaRegPaperPlane className="h-6 w-6 text-customGold animate-bounce" />
                <span>EmailsCredits</span>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-5 font-body">
              <NavLink to="/" currentPath={currentPath} label="Home" />
              <NavLink to="/unblure" currentPath={currentPath} label="Emails" />
              <NavLink to="/payment" currentPath={currentPath} label="Price" />
              <NavLink
                to="/add-emails"
                currentPath={currentPath}
                label="Add Emails"
              />
            </div>

            {/* Auth and Menu */}
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton
                  mode="modal"
                  redirectUrl="/"
                  className="bg-accent text-accent-foreground px-4 py-2 rounded-full font-body font-medium transition duration-150 hover:bg-primary hover:text-foreground"
                >
                  Login
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton className="bg-primary text-primary-foreground rounded-full px-4 py-2 transition duration-150 hover:bg-secondary hover:text-foreground" />
              </SignedIn>
              <button
                className="md:hidden p-2"
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                {toggleMenu ? (
                  <FaTimes className="h-6 w-6 text-foreground" />
                ) : (
                  <FaBars className="h-6 w-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {toggleMenu && (
          <div className="md:hidden px-8 pt-2 pb-4 space-y-2 bg-card rounded-b-lg">
            <NavLink to="/" currentPath={currentPath} label="Home" />
            <NavLink to="/unblure" currentPath={currentPath} label="Emails" />
            <NavLink to="/payment" currentPath={currentPath} label="Price" />
            <NavLink
              to="/add-emails"
              currentPath={currentPath}
              label="Add Emails"
            />
          </div>
        )}
      </header>
    </div>
  );
};

const NavLink = ({ to, currentPath, label }) => (
  <Link
    to={to}
    className={`block px-4 py-2 text-sm font-body font-medium transition-all duration-200 rounded-lg ${
      currentPath === to
        ? "bg-primary text-primary-foreground"
        : "text-foreground hover:bg-secondary hover:text-primary-foreground"
    }`}
  >
    {label}
  </Link>
);

export default Nav;
