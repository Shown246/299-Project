import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


const JobApplication = () => {
  const {id} = useParams();
  const [jobPost, setJobPost] = useState({});
  console.log(id);
  useEffect(() =>{
    axios.get(`http://localhost:5000/jobPost/${id}`, {withCredentials: true})
    .then((res) => {
      setJobPost(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [id]);
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-gray-50">
  <img
    src={jobPost.imageUrl}
    alt={jobPost.title}
    className="w-full h-96 object-cover rounded-lg shadow-md"
  />

  <div>
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800">{jobPost.title}</h1>
      <p className="text-gray-600 text-sm italic mt-2">Location: {jobPost.location}</p>
      <p className="text-gray-600 text-sm italic mt-1">Category: {jobPost.job}</p>
      <hr className="my-4" />
      <p className="text-gray-700 text-base">{jobPost.description}</p>
    </div>

    <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-blue-800">Auction</h2>
      <p className="text-gray-600 mt-2">
        Current Highest Bid: <strong>$200 by User123</strong>
      </p>
      <div className="mt-4">
        <input
          type="number"
          placeholder="Enter your bid"
          className="w-full border rounded-lg p-2 text-sm"
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          Place Bid
        </button>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Bidding History</h3>
        <ul className="mt-2 space-y-2">
          <li className="flex justify-between">
            <span>User123</span>
            <span>$200</span>
            <span>10:45 AM</span>
          </li>
          <li className="flex justify-between">
            <span>User456</span>
            <span>$180</span>
            <span>10:42 AM</span>
          </li>
        </ul>
      </div>
      <p className="text-gray-500 text-sm italic mt-4">Auction ends in: 10:00</p>
    </div>
  </div>
</div>

  )
}

export default JobApplication