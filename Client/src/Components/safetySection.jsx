import React, { Component } from "react";

const SafetySection = () => {
  return (
    <div
      style={{
        backgroundColor: "#f8faff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <h4 style={{ color: "#333", fontWeight: "600", marginBottom: "20px" }}>
        Why Choose Us
      </h4>
      <h2 style={{ color: "#333", fontWeight: "700", marginBottom: "30px" }}>
        Because we care about your safety..
      </h2>

      {/* Features Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "22%",
            minWidth: "180px",
            padding: "15px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src="icon-placeholder-mask.svg"
            alt="Ensuring Masks"
            style={{ width: "50px", marginBottom: "10px" }}
          />
          <h5 style={{ color: "#333", fontWeight: "600" }}>Ensuring Masks</h5>
        </div>
        <div
          style={{
            width: "22%",
            minWidth: "180px",
            padding: "15px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src="icon-placeholder-support.svg"
            alt="24/7 Support"
            style={{ width: "50px", marginBottom: "10px" }}
          />
          <h5 style={{ color: "#333", fontWeight: "600" }}>24/7 Support</h5>
        </div>
        <div
          style={{
            width: "22%",
            minWidth: "180px",
            padding: "15px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src="icon-placeholder-sanitize.svg"
            alt="Sanitising Hands & Equipment"
            style={{ width: "50px", marginBottom: "10px" }}
          />
          <h5 style={{ color: "#333", fontWeight: "600" }}>
            Sanitising Hands & Equipment
          </h5>
        </div>
        <div
          style={{
            width: "22%",
            minWidth: "180px",
            padding: "15px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src="icon-placeholder-gloves.svg"
            alt="Ensuring Gloves"
            style={{ width: "50px", marginBottom: "10px" }}
          />
          <h5 style={{ color: "#333", fontWeight: "600" }}>Ensuring Gloves</h5>
        </div>
      </div>

      {/* Image Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <img
          src="placeholder-safety-team.jpg"
          alt="Safety Team"
          style={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      {/* Statistics Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <div style={{ textAlign: "center", flex: "1" }}>
          <h3
            style={{ color: "#333", fontWeight: "700", marginBottom: "10px" }}
          >
            15,000+
          </h3>
          <p style={{ color: "#555", fontWeight: "500" }}>Service Providers</p>
        </div>
        <div style={{ textAlign: "center", flex: "1" }}>
          <h3
            style={{ color: "#333", fontWeight: "700", marginBottom: "10px" }}
          >
            2,00,000+
          </h3>
          <p style={{ color: "#555", fontWeight: "500" }}>Order Served</p>
        </div>
        <div style={{ textAlign: "center", flex: "1" }}>
          <h3
            style={{ color: "#333", fontWeight: "700", marginBottom: "10px" }}
          >
            1,00,000+
          </h3>
          <p style={{ color: "#555", fontWeight: "500" }}>5 Star Received</p>
        </div>
      </div>
    </div>
  );
};

export default SafetySection;
