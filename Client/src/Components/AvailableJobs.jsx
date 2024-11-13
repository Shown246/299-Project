import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContextProvider";

const AvailableJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobPosts, setJobPosts] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // Fetch all job posts
    axios
      .get("http://localhost:5000/jobPosts", { withCredentials: true })
      .then((response) => {
        setJobPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch the user's location
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

  useEffect(() => {
    // Filter job posts based on selected location
    jobPosts.map((job) => {
      if (job?.location === location) {
        console.log(job);
      }
    });
    // setFilteredJobs(filtered);
  }, [jobPosts, selectedLocation]);
  // console.log(filteredJobs);

  return (
    <div>
      {/* <h2>Available Jobs in {selectedLocation}</h2>
      {filteredJobs.length > 0 ? (
        <ul>
          {filteredJobs.map((job) => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>Location: {job.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs available in the selected location.</p>
      )} */}
    </div>
  );
};

export default AvailableJobs;
