const ChooseUs = () => {
  return (
    <div className="shadow-xl container90 py-8 px-4 mt-20">
      {/* Header Section */}
      <h1> ={">"} Why Choose US</h1>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-accent my-6">
        Because we care about your satisfaction...
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 shadow-lg">
        {/* Left - Features */}
        <div className="grid grid-cols-2 gap-4">
          {/* Feature Cards */}
          {[
            { icon: "😷", text: "Ensuring Masks" },
            { icon: "📞", text: "24/7 Support" },
            { icon: "🧴", text: "Sanitizing Hands & Equipment" },
            { icon: "🧤", text: "Ensuring Gloves" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white flex flex-col items-center justify-center py-6 shadow-md rounded-lg border border-gray-200"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <p className="text-center text-gray-700 font-medium">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Right - Image */}
        <div className="flex justify-center items-center">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Safety Ensured"
            className="rounded-md shadow-md"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-4 mt-12">
        {/* Stat Cards */}
        {[
          { value: "15,000 +", label: "Service Providers" },
          { value: "2,00,000 +", label: "Order Served" },
          { value: "1,00,000 +", label: "5 Star Received" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white py-8 rounded-md shadow-md border border-gray-200"
          >
            <p className="text-3xl font-bold text-blue-500">{stat.value}</p>
            <p className="text-gray-600 font-medium mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUs;
