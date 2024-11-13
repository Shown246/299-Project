import React from "react";

function ContactUs() {
  styles = {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    padding: 8,
    borderRadius: 29,
  };

  return (
    <div style={{ styles }}>
      <h1>Contact Us</h1>
      <p>
        If you have any questions or need assistance with your order, please
        feel free to reach out. We are here to help. You can reach us by filling
        out the form or through the following contact information:
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
  );
}

export default ContactUs;
