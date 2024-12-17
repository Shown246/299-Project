import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContextProvider";
import axios from "axios";

const MyCustomerJob = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const [jobs, setJobs] = useState([]); // State to hold jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch jobs for the current customer
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/jobPosts/customer",
          {
            withCredentials: true, // Include cookies for authentication
          }
        );
        setJobs(response.data); // Set fetched jobs
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (user?.uid) {
      fetchJobs(); // Fetch jobs only if user is logged in
    }
  }, [user?.uid]);

  if (loading) return <div>Loading...</div>; // Display while loading
  if (error) return <div className="text-red-500">{error}</div>; // Display error

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">My Jobs</h1>
      {jobs.length > 0 ? (
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Job Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Bids</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-100">
                <td className="border p-2">{job.title}</td>
                <td className="border p-2">{job.description}</td>
                <td className="border p-2">
                  {job.bids && job.bids.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {job.bids.map((bid, index) => (
                        <li key={index}>
                          <strong>Bid Amount:</strong> ${bid.amount} <br />
                          <strong>Status:</strong> {bid.status}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No bids yet.</p>
                  )}
                </td>
                <td className="border p-2">{job.status}</td>
                <td className="border p-2">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No jobs added yet.</p>
      )}
    </div>
  );
};

export default MyCustomerJob;
