import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function ContactUs() {
  return (
    <div
      style={{
        backgroundColor: "cyan",
        color: "black",
        padding: "20px",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      {/* Main Content Area */}
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            marginBottom: "20px",
          }}
        >
          If you have any questions or need assistance with your order, please
          feel free to reach out. We are here to help. You can reach us through
          the following contact information:
        </p>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            marginBottom: "10px",
          }}
        >
          <strong>Email:</strong> info@yourdomain.com
        </p>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            marginBottom: "10px",
          }}
        >
          <strong>Phone:</strong> (123) 456-7890
        </p>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            marginBottom: "20px",
          }}
        >
          <strong>Address:</strong> 123 Main St, City, State, Zip Code
        </p>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            marginBottom: "20px",
          }}
        >
          <strong>Hours:</strong> Monday to Friday, 9 AM to 5 PM EST
        </p>

        {/* Social Media */}
        <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
          Follow us on social media:
        </p>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            fontSize: "2rem",
          }}
        >
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaYoutube />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
