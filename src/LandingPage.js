import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to Todo App</h1>
      <div className="auth-options">
        <Link to="/login" className="auth-button">
          Login
        </Link>
        <Link to="/signup" className="auth-button">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
