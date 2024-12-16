function OurPolicies() {
  return (
    <div
      style={{
        backgroundColor: "lightblue", // Light blue background
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
            textAlign: "center",
          }}
        >
          Our Policies
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            marginBottom: "20px",
          }}
        >
          We value transparency and fairness in all aspects of our services.
          Please read through our policies below to understand how we operate
          and ensure a smooth experience for all users.
        </p>

        {/* Privacy Policy */}
        <h2
          style={{ fontSize: "1.5rem", marginTop: "20px", fontWeight: "bold" }}
        >
          1. Privacy Policy
        </h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          We are committed to protecting your personal data. Any information you
          provide will only be used to improve your experience and will not be
          shared with third parties without your consent.
        </p>

        {/* Terms of Service */}
        <h2
          style={{ fontSize: "1.5rem", marginTop: "20px", fontWeight: "bold" }}
        >
          2. Terms of Service
        </h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          By using our platform, you agree to abide by all terms and conditions
          set forth. This includes using the service responsibly and refraining
          from violating user guidelines.
        </p>

        {/* Refund Policy */}
        <h2
          style={{ fontSize: "1.5rem", marginTop: "20px", fontWeight: "bold" }}
        >
          3. Refund Policy
        </h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          Refunds are processed under specific conditions, such as service
          issues or dissatisfaction within the first 7 days of usage. Please
          contact our support team to initiate a refund request.
        </p>

        {/* Data Usage */}
        <h2
          style={{ fontSize: "1.5rem", marginTop: "20px", fontWeight: "bold" }}
        >
          4. Data Usage
        </h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          Collected data, including usage patterns and feedback, is used to
          enhance our platform's features and user experience. Your privacy
          remains a priority during this process.
        </p>

        {/* Code of Conduct */}
        <h2
          style={{ fontSize: "1.5rem", marginTop: "20px", fontWeight: "bold" }}
        >
          5. Code of Conduct
        </h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          All users are expected to treat each other with respect. Offensive
          language, harassment, or misuse of the platform will result in account
          suspension or termination.
        </p>

        {/* Security Policy */}
        <h2
          style={{ fontSize: "1.5rem", marginTop: "20px", fontWeight: "bold" }}
        >
          6. Security Policy
        </h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          We implement advanced security measures to safeguard user data and
          prevent unauthorized access. Users are encouraged to report any
          suspicious activity promptly.
        </p>

        {/* Updates to Policies */}
        <h2
          style={{ fontSize: "1.5rem", marginTop: "20px", fontWeight: "bold" }}
        >
          7. Policy Updates
        </h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          We reserve the right to update these policies as needed. Users will be
          notified of major changes, and continued usage implies acceptance of
          the revised terms.
        </p>
      </div>
    </div>
  );
}

export default OurPolicies;
