import React from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

const Protected = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-background to-accent p-4 pt-28">
      <div className="bg-card p-6 rounded-lg shadow-lg text-center max-w-md">
        <img
          src="https://images.unsplash.com/photo-1646217120680-735b95df956b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login Required"
          className="w-64 mx-auto mb-4 rounded-md"
        />
        <h1 className="text-2xl font-bold mb-2 text-primary-foreground font-heading">
          Oops! Access Restricted 🚀
        </h1>
        <p className="text-muted-foreground mb-4 font-body">
          You're just one step away from exploring something amazing! To keep
          things secure and personalized, we need you to log in. Don't worry,
          it's quick and easy!
        </p>

        <SignInButton
          mode="modal"
          redirectUrl="/result"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:bg-accent focus:ring-2 focus:ring-offset-2 focus:ring-ring"
        >
          Sign in and join the fun!
        </SignInButton>
      </div>
    </div>
  );
};

export default Protected;
