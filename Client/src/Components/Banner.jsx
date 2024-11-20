import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContextProvider";
import { useContext } from "react";
import SafetySection from "./safetySection";
import TestimonialCard from "./testimonialCard";

const Banner = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const role = user?.role;
  console.log(role);

  const handleGetStarted = () => {
    if (role === "Client") {
      navigate("/jobPost");
    } else if (role === "Serviceman") {
      navigate("/availableJobs");
    }
  };

  // Determine welcome message based on role
  const getWelcomeMessage = () => {
    if (role === "Client") return "Welcome, Customer";
    if (role === "Serviceman") return "Welcome, Serviceman";
    if (role === "Admin") return "Welcome, Admin";
    return "";
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="hero min-h-[460px]"
        style={{
          backgroundImage: "url(https://i.ibb.co.com/0MkGB9J/3-min.png)",
        }}
      >
        <div className="bg-opacity-40 hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="px-24 pt-40">
            <h1 className="mb-5 text-5xl font-bold text-accent">
              Your Personal Assistant
            </h1>
            {role && (
              <h2 className="text-2xl font-semibold text-center text-white mt-2">
                {getWelcomeMessage()}
              </h2>
            )}
            <p className="mb-5 text-xl text-accent">
              One-stop solution for your services. Order any service, anytime.
            </p>
            <button className="btn bg-genoa" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div>
        {/* Safety Section */}
        <SafetySection />

        {/* Testimonial Section */}
        <div style={{ marginTop: "50px", marginBottom: "50px" }}>
          <TestimonialCard />
        </div>
      </div>
    </div>
  );
};

export default Banner;
