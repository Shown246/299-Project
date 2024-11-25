import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function ContactUs() {
  const styles = {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    padding: 8,
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "8px",
  };

  return (
    <div
      style={{
        backgroundColor: "cyan",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <div style={styles}>
        <h1>Contact Us</h1>
        <p>
          If you have any questions or need assistance with your order, please
          feel free to reach out. We are here to help. You can reach us by
          filling out the form or through the following contact information:
          <br />
          <br />
          Email: info@yourdomain.com
          <br />
          <br />
          Phone: (123) 456-7890
          <br />
          <br />
          Address: 123 Main St, City, State, Zip Code
          <br />
          <br />
          We are open Monday to Friday from 9 AM to 5 PM EST.
          <br />
          <br />
          Follow us on social media:
          <br />
          <br />
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaYoutube />
        </p>
      </div>
    </div>
  );
}

export default ContactUs;
