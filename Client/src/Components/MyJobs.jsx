import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const MyJobs = () => {
  // Placeholder data for jobs posted by the user
  const navigate = useNavigate();
  const [jobPosts, setJobPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/jobPosts", { withCredentials: true })
      .then((response) => {
        setJobPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Posted Jobs</h1>

      {/* Grid layout to display jobs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobPosts.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-200"
          >
            {/* Job Image */}
            <img
              src={job.imageUrl}
              alt={job.title}
              className="w-full h-48 object-cover"
            />

            {/* Job Details */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Location: {job.location}
              </p>
              <p className="text-gray-600 text-sm mt-1">Category: {job.job}</p>

              <p className="text-gray-700 text-sm mt-3 line-clamp-2">
                {job.description}
              </p>

              {/* Actions */}
              <div className="mt-4">
                <button
                  onClick={() => {navigate(`/myJob/${job._id}`);}}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                >
                  View bids
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
