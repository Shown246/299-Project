import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContextProvider";

const AvailableJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobPosts, setJobPosts] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/jobPosts", {withCredentials: true})
      .then((response) => {
        setJobPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:5000/serProfile?email=${user.email}`, {withCredentials: true})
      .then((response) => {
        setSelectedLocation(response.data.location);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.email]);

  console.log(jobPosts, selectedLocation);

  return(
    <>
    <div className="p-6 bg-gray-100 container90">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Available Jobs</h1>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobPosts.map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            description={job.description}
            location={job.location}
            imageUrl={job.imageUrl}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default AvailableJobs;

// eslint-disable-next-line react/prop-types
const JobCard = ({ title, description, location, imageUrl }) => (
  <div className="bg-white shadow-md rounded-md overflow-hidden border border-gray-200">
    {imageUrl && (
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
    )}
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm my-2 line-clamp-3">{description}</p>
      <p className="text-gray-500 text-sm italic">Location: {location}</p>
    </div>
  </div>
);