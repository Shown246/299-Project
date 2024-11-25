import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


const JobApplication = () => {
  const {id} = useParams();
  const [jobPost, setJobPost] = useState({});
  console.log(id);
  useEffect(() =>{
    axios.get(`/jobPost/${id}`)
    .then((res) => {
      setJobPost(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [id]);
  console.log(jobPost);
  return (
    <div>JobApplication</div>
  )
}

export default JobApplication