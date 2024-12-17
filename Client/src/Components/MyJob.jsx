import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'
const MyJob = () => {
  // Simulated job data
  const { id } = useParams();
  const [jobPost, setJobPost] = useState({});
  const [bids, setBids] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobPost/${id}`, { withCredentials: true })
      .then((res) => {
        setJobPost(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  useEffect(() => {
    const storedBids = localStorage.getItem("bids");
    if (storedBids) {
      setBids(JSON.parse(storedBids));
    }
  }, []);

  const [, setSelectedBidId] = useState(null);

  // Function to select a bid
  const handleSelectBid = (id) => {
    setSelectedBidId(id);
    const updatedBids = bids.map((bid) =>
      bid.id === id ? { ...bid, selected: true } : { ...bid, selected: false }
    );
    setBids(updatedBids);
    Swal.fire({
      title: 'Successfully',
      text: 'Accepted offer',
      icon: 'success',
      confirmButtonText: 'Done'
    })
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Job Details</h1>

      {/* Job Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow-lg">
        {/* Left: Job Image */}
        <img
          src={jobPost.imageUrl}
          alt={jobPost.title}
          className="w-full h-64 object-cover rounded-lg"
        />

        {/* Right: Job Information */}
        <div>
          <h2 className="text-2xl font-bold">{jobPost.title}</h2>
          <p className="text-gray-600 mt-2">Location: {jobPost.location}</p>
          <p className="text-gray-600 mt-1">Category: {jobPost.job}</p>
          <hr className="my-4" />
          <p className="text-gray-700">{jobPost.description}</p>
        </div>
      </div>

      {/* Bids Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bids on this Job</h2>
        {bids.length > 0 ? (
          <div className="space-y-4">
            {bids.map((bid) => (
              <div
                key={bid.id}
                className={`p-4 border rounded-lg shadow-md ${
                  bid.selected ? "bg-green-100 border-green-500" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{bid.username}</h3>
                    <p className="text-gray-600 mt-1">
                      Offer: <span className="font-bold">Tk {bid.price}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleSelectBid(bid.id)}
                    className={`px-4 py-2 rounded ${
                      bid.selected
                        ? "bg-green-600 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    } transition`}
                  >
                    {bid.selected ? "Selected" : "Select Offer"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No bids available yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyJob;
