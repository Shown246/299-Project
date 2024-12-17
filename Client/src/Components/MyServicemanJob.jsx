import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyServicemanJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs and bids applied for by the serviceman
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/servicemanJobs",
          {
            withCredentials: true, // Ensure authentication headers are sent
          }
        );
        setJobs(response.data);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold text-center">My Applied Jobs</h1>

      <table className="min-w-full mt-6 table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Job Title</th>
            <th className="px-4 py-2 border-b">Service Description</th>
            <th className="px-4 py-2 border-b">Bid Amount</th>
            <th className="px-4 py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-4 py-2 border-b">{job.title}</td>
                <td className="px-4 py-2 border-b">{job.description}</td>
                <td className="px-4 py-2 border-b">${job.bidAmount}</td>
                <td className="px-4 py-2 border-b">{job.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center border-b">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default MyServicemanJob;
