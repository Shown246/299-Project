const HowItWorks = () => {
  return (
    <div className="bg-gray-50 py-8 mt-20 px-4 container90">
      {/* Section Header */}
      <h4 className="text-sm font-semibold text-gray-600 uppercase">
        How It Works
      </h4>
      <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-8">
        Easiest way to get a service
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left - Image */}
        <div className="flex justify-center">
          <img
            src="../../public/assets/77.png"
            alt="App Preview"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right - Steps */}
        <div className="space-y-8">
          {[
            {
              step: "1",
              title: "Select the Service",
              description:
                "Pick the service you are looking for — from the website or the app.",
            },
            {
              step: "2",
              title: "Pick your schedule",
              description:
                "Pick your convenient date and time to avail the service. Pick the service provider based on their rating.",
            },
            {
              step: "3",
              title: "Place Your Order & Relax",
              description:
                "Review and place the order. Now just sit back and relax. We’ll assign the expert service provider’s schedule for you.",
            },
          ].map(({ step, title, description }) => (
            <div key={step} className="flex items-start space-x-4">
              {/* Step Number */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
                {step}
              </div>

              {/* Step Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {title}
                </h3>
                <p className="text-gray-600 mt-1">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
