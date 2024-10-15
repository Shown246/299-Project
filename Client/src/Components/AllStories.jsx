import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllStories = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  useEffect(() => {
    axios
      .get("https://ph-assignment12-server.vercel.app/stories")
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleStoryClick = (id) => {
    navigate(`/story/${id}`);
  };
  return (
    <div className="container90 my-12">
      <h1 className="text-3xl font-bold mb-6">All Stories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => handleStoryClick(story._id)}
          >
            <h1 className=" mb-2">
              <span className="font-semibold">Posted by: </span>
              {story.name}
            </h1>
            <h3 className=" mb-2">
              <span className="font-medium">Date: </span>
              {story.date}
            </h3>
            <p className="text-gray-700">{story.story}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStories;
