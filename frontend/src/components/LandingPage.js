import React from "react";
import { useNavigate } from "react-router-dom";
import "../LandingPage.css"; // Assuming your CSS file is in the src folder

const LandingPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="landing-container">
      <h1>Welcome to TrimTime</h1>
      <div className="button-container">
        <button className="button-22" onClick={goToLogin}>
          Login
        </button>
        <button className="button-23" onClick={goToSignup}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
