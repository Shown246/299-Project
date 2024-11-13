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

  return <div>AvailableJobs</div>;
};

export default AvailableJobs;
