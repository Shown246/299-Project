import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContextProvider";
import { useNavigate } from "react-router-dom";

const AvailableJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobPosts, setJobPosts] = useState([]);
  const [, setSelectedLocation] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/jobPosts", { withCredentials: true })
      .then((response) => {
        setJobPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:5000/serProfile?email=${user.email}`, {
        withCredentials: true,
      })
      .then((response) => {
        setSelectedLocation(response.data.location);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.email]);

  return (
    <>
      <div className="p-6 bg-gray-100 container90">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Available Jobs
        </h1>
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPosts.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden h-max hover:scale-105 transition duration-150 ease-out hover:ease-in"
            >
              {job.imageUrl && (
                <img
                  src={job.imageUrl}
                  alt={job.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                <p className="text-gray-600 text-sm my-2 line-clamp-3">
                  {job.description}
                </p>
                <p className="text-gray-500 text-sm italic">
                  Location: {job.location}
                </p>
                <button
                  onClick={() => {navigate(`/jobApplication/${job._id}`);}}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AvailableJobs;