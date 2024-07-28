import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Protected = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-lightgray to-orange p-4 pt-28">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
        <img
          src="https://images.unsplash.com/photo-1646217120680-735b95df956b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual illustration URL
          alt="Login Required"
          className="w-64 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2 text-black">
          Restricted Access
        </h1>
        <p className="text-gray-600 mb-4">
          This page can only be viewed by authenticated users. Please log in to
          continue.
        </p>

        <SignInButton
          mode="modal"
          redirectUrl="/result"
          className="inline-flex items-center justify-center rounded-xl bg-orange px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#e55b00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Sign in
        </SignInButton>
      </div>
    </div>
  );
};

export default Protected;
