import React, { Component } from "react";

const TestimonialCard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f8faff",
        borderRadius: "10px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      {/* Left Section: Text */}
      <div style={{ flex: 1, paddingRight: "20px" }}>
        <h4 style={{ color: "#333", fontWeight: "600", marginBottom: "10px" }}>
          Real Happy Customers, Real Stories
        </h4>
        <blockquote
          style={{
            borderLeft: "4px solid #00bcd4",
            paddingLeft: "16px",
            color: "#555",
            fontStyle: "italic",
          }}
        >
          "Such service platforms are available in other countries. I've
          personally used those when I was abroad. I'm very pleased that such a
          portal is available here in Bangladesh as well. Thank you Sheba.xyz."
        </blockquote>
        <p style={{ marginTop: "10px", fontWeight: "500", color: "#666" }}>
          - Zabeen Yusuf Nur
          <br />
          <span style={{ fontStyle: "italic", color: "#999" }}>
            IT Consultant, Australia
          </span>
        </p>
      </div>

      {/* Right Section: Image/Video */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src="placeholder-for-user-photo.jpg"
          alt="Zabeen Yusuf Nur"
          style={{
            borderRadius: "10px",
            width: "100%",
            maxWidth: "300px",
            objectFit: "cover",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
        <button
          style={{
            position: "absolute",
            border: "none",
            borderRadius: "50%",
            backgroundColor: "#e91e63",
            color: "white",
            padding: "12px 16px",
            cursor: "pointer",
            outline: "none",
            transform: "translateY(-50%)",
          }}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default TestimonialCard;
