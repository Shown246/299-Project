import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobApplication = () => {
  const { id } = useParams();
  const [jobPost, setJobPost] = useState({});
  const [bids, setBids] = useState([
    { username: "User123", price: 200, time: "10:45 AM" },
    { username: "User456", price: 180, time: "10:42 AM" },
  ]);
  const [myBid, setMyBid] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobPost/${id}`, { withCredentials: true })
      .then((res) => {
        setJobPost(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Get the highest bid dynamically
  const highestBid = bids.reduce(
    (max, bid) => (bid.price > max ? bid.price : max),
    0
  );

  // Handle Place Bid button click
  const handlePlaceBid = () => {
    if (myBid && !isNaN(myBid) && myBid > 0) {
      const currentTime = new Date();
      const formattedTime = `${currentTime.getHours()}:${String(
        currentTime.getMinutes()
      ).padStart(2, "0")} ${currentTime.getHours() >= 12 ? "PM" : "AM"}`;

      const newBid = {
        username: "You", // Replace with dynamic username if available
        price: parseInt(myBid),
        time: formattedTime,
      };

      setBids((prevBids) => [...prevBids, newBid]); // Add new bid to the list
      setMyBid(""); // Clear input field
    }
  };

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
          <p className="text-gray-600 text-sm italic mt-2">
            Location: {jobPost.location}
          </p>
          <p className="text-gray-600 text-sm italic mt-1">
            Category: {jobPost.job}
          </p>
          <hr className="my-4" />
          <p className="text-gray-700 text-base">{jobPost.description}</p>
        </div>

        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-800">Auction</h2>
          <p className="text-gray-600 mt-2">
            Current Highest Bid: <strong>Tk.{highestBid}</strong>
          </p>

          <div className="mt-4">
            <input
              type="number"
              value={myBid}
              onChange={(e) => setMyBid(e.target.value)}
              placeholder="Enter your bid"
              className="w-full border rounded-lg p-2 text-sm"
            />
            <button
              onClick={handlePlaceBid}
              className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
            >
              Place Bid
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Bidding History
            </h3>

            {/* Bold row with headings */}
            <div className="flex justify-between mt-2 border-b-2 font-bold text-gray-700 pb-1">
              <span>Username</span>
              <span>Price Bid</span>
              <span>Time</span>
            </div>

            {/* Display Bidding History */}
            <ul className="mt-2 space-y-2">
              {bids.map((bid, index) => (
                <li key={index} className="flex justify-between">
                  <span>{bid.username}</span>
                  <span>Tk.{bid.price}</span>
                  <span>{bid.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-500 text-sm italic mt-4">
            Auction ends in: 10:00AM on 17th December.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
