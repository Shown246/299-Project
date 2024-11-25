function OurPolicies() {
  const pageStyles = {
    backgroundColor: 'lightblue', // Light blue background
    color: 'black', // Text color for readability
    padding: '20px', // Padding around the text
    minHeight: '100vh', // Full height to cover the viewport
    textAlign: 'left', // Center align the text
  };

  return (
    <div style={pageStyles}>
      <h1>Our Policies</h1>
        <p>
        {/* Add your policy text here */}
        <br />
        <br />
        <br />
        <br />
        1. Privacy Policy: We are committed to protecting your privacy and ensuring the confidentiality of your personal information.
        <br />
        <br />
        2. Terms of Service: By using our services, you agree to comply with our terms and conditions.
        <br />
        <br />
        3. Refund Policy: We offer refunds under certain conditions. Please contact support for more details.
        <br />
        <br />
        4. Data Usage: We may use collected data to improve our services and user experience.
        <br />
        <br />
      
        {/* Add more sections as needed */}
      </p>
    </div>
  );
}

export default OurPolicies;
