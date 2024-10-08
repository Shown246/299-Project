import { useState } from "react";
import SearchBox from "./SearchBox";
const Banner = () => {
  // State to manage modal visibility and selected option
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option); // Set selected option
    setIsOpen(false); // Close modal
  };
  return (
    <div>
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
            <p className="mb-5 text-xl text-accent">
              One-stop solution for your services. Order any service, anytime.
            </p>
            <div className="flex">
              {/* Location Modal */}
              <div className="flex w-1/3 flex-col items-center justify-center">
                <button
                  onClick={toggleModal}
                  className="pl-3 pr-4 py-2 bg-genoa text-teal rounded-lg hover:bg-teal hover:text-accent flex gap-2"
                >
                  <img src="assets/map.png" alt="" />
                  {selectedOption ? `${selectedOption}` : "Location"}
                </button>

                {/* Modal */}
                {isOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-teal bg-opacity-50 z-50">
                    <div className="bg-teal relative rounded-lg shadow-lg w-80 p-6">
                      <h2 className="text-lg font-semibold mb-4">
                        Select a Location
                      </h2>

                      {/* Scrollable content */}
                      <div className="max-h-60 overflow-y-auto">
                        <ul className="grid grid-cols-2 gap-2">
                          {/* Options */}
                          {[
                            "Option 1",
                            "Option 2",
                            "Option 3",
                            "Option 4",
                            "Option 5",
                            "Option 6",
                            "Option 7",
                            "Option 8",
                            "Option 9",
                            "Option 10",
                            "Option 11",
                            "Option 12",
                            // Add more options here
                          ].map((option) => (
                            <li
                              key={option}
                              onClick={() => handleOptionSelect(option)}
                              className="py-2 px-4 cursor-pointer hover:bg-genoa rounded"
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Close button */}
                      <button onClick={toggleModal} className="btn btn-sm btn-circle btn-ghost hover:text-red-700 hover:border-accent bg-red-800 absolute right-2 top-2">x</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-2/3">
                <SearchBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
