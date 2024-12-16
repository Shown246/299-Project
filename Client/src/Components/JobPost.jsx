import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SearchBox from "./SearchBox";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobPost = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [formData, setFormData] = useState({
    location: "",
    job: "",
    title: "",
    description: "",
    image: null,
  });

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSearchInputChange = (value) => {
    setSearchValue(value);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: option,
    }));
    setIsOpen(false);
  };

  const handleSearchClick = () => {
    setFormData({
      ...formData,
      job: searchValue,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageBase64 = await toBase64(formData.image);

    const apiKey = "4421f756300ae69d56794a3875a76d01"; // Replace with your ImageBB API Key
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    const imageData = new FormData();
    imageData.append("image", imageBase64.split(",")[1]);

    try {
      const response = await axios.post(imgbbUrl, imageData);
      const imageUrl = response.data.data.url;
      console.log("Image uploaded successfully:", imageUrl);

      const newJobPost = {
        location: formData.location,
        job: formData.job,
        title: formData.title,
        description: formData.description,
        imageUrl: imageUrl,
      };

      axios
        .post("http://localhost:5000/jobPost", newJobPost, {
          withCredentials: true,
        })
        .then(() => {
          toast.success("Successfully posted the job");

          // Redirect to homepage after showing the success toast
          setTimeout(() => {
            navigate("/"); // Redirect to homepage
          }, 2000); // 2-second delay (adjust as needed)
        })
        .catch((error) => {
          toast.error("Failed to post the job");
          console.log(error.message);
        });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed");
    }
  };

  return (
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
                    <div className="max-h-60 overflow-y-auto">
                      <ul className="grid grid-cols-2 gap-2">
                        {[
                          "Dhanmmondi",
                          "Mirpur",
                          "Uttara",
                          "Banani",
                          "Mohammadpur",
                          "Gulshan",
                          "Bashundhara",
                          "Nikunjo",
                          "Badda",
                          "Baridhara",
                          "Old Dhaka",
                          "Wari",
                          "Khilgaon",
                          "Kakrail",
                          "Motijhil",
                          "Rampura",
                          "Banassre",
                          "Farmgate",
                          "Tongi",
                          "Tejgaon",
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

          <h2 className="text-2xl font-bold mb-4">Post a Job for House Help</h2>
          <form onSubmit={handleSubmit}>
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

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Picture &#40;To be implemented&#41;
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default JobPost;
