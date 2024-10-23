import { useState, useContext } from "react";
import SearchBox from "./SearchBox";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../AuthContextProvider";

const JobPost = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role;
  // State to manage modal visibility and selected option
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [formData, setFormData] = useState({
    location: "",
    job: "",
    title: "",
    description: "",
    image: null
  });

  // Function to handle the search box value
  const handleSearchInputChange = (value) => {
    setSearchValue(value);
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option); // Set selected option
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: option
    }));
    setIsOpen(false); // Close modal
  };

  // Search button click handle
  const handleSearchClick = () => {
    setFormData({
      ...formData,
      job: searchValue
    });
  };
  
    // Handle input changes
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    // Handle image upload
    const handleImageUpload = () => {
      console.log("Image uploaded...");
      // setFormData({
      //   ...formData,
      //   image: e.target.files[0]
      // });
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform form submission, e.g., send formData to the backend.
      console.log("Form Data: ", formData);

    };
  return (
    <>
      {/* Conditional rendering based on user role */}
      {role === "Client" ? (
        <>
          <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
              <div className="flex text-accent mb-8">
              {/* Location Modal */}
              <div className="flex w-1/3 flex-col items-center justify-center">
                <button
                  onClick={toggleModal}
                  className="max-w-1/2 pl-3 pr-4 py-2 bg-genoa text-teal rounded-lg hover:bg-teal hover:text-accent flex gap-2"
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
                      <button
                        onClick={toggleModal}
                        className="btn btn-sm btn-circle btn-ghost hover:text-red-700 hover:border-accent bg-red-800 absolute right-2 top-2"
                      >
                        x
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-2/3 flex gap-2">
                <SearchBox onSearchChange={handleSearchInputChange} />
                <button
                  onClick={handleSearchClick}
                  className="bg-teal px-3 rounded-lg"
                >
                  <FaSearch size={20} />
                </button>
              </div>
            </div>
                <h2 className="text-2xl font-bold mb-4">
                  Post a Job for House Help
                </h2>

                <form onSubmit={handleSubmit}>
                  {/* Job Title */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Job Title<span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter job title"
                      required
                    />
                  </div>

                  {/* Job Description */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Job Description<span className="text-red-700">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter job description"
                      rows="4"
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="mb-4 cursor-not-allowed">
                    <label className="block text-gray-700 font-semibold mb-2 cursor-not-allowed">
                      Upload Picture &#40;To be implemented&#41;
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full cursor-not-allowed p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  >
                    Post Job
                  </button>
                </form>
              </div>
            </div>
          </>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-lg text-red-600">
            Sorry, only customers can make a post. Servicemen cannot post.
          </p>
        </>
      )}
    </>
  );
};

export default JobPost;
