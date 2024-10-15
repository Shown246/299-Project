import { useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";

const AddPackage = () => {
  const [title, setTitle] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [tourPlan, setTourPlan] = useState([{ day: "", details: "" }]);
  const [price, setPrice] = useState("");

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImgUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleTourPlanChange = (index, field, value) => {
    const newTourPlan = [...tourPlan];
    newTourPlan[index][field] = value;
    setTourPlan(newTourPlan);
  };

  const addTourPlanDay = () => {
    setTourPlan([...tourPlan, { day: "", details: "" }]);
  };

  const [type, setType] = useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const packageData = {
      title: title,
      images: imageUrls,
      description: description,
      type: type,
      price: price,
      duration: duration,
      tour_plan: tourPlan,
    };
    axios.post("https://ph-assignment12-server.vercel.app/addPackage", packageData, {withCredentials: true})
    .then(() => {
      toast.success("Package added successfully");
      setTitle("");
      setImageUrls([""]);
      setDescription("");
      setType("");
      setPrice("");
      setDuration("");
      setTourPlan([{ day: "", details: "" }]);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Failed to add package");
    });
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-blue-gray-600  bg-gray-100">
      <form
        className="p-8 rounded shadow-md "
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold mb-4">Add New Package</h1>
        <input
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-2/3 rounded"
          placeholder="Add a Title"
        />
        <div className="flex space-x-4">
          <div className=" mb-4 w-2/3 ">
          {imageUrls.map((url, index) => (
            <input
              key={index}
              required={index === 0}
              type="text"
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded"
              placeholder={index === 0 ? "Cover Image [Must be added]" : `Image URL ${index + 1}`}
            />
          ))}
          </div>
          <div>
            <button
            type="button"
            onClick={addImgUrl}
            className="bg-blue-500 hover:bg-blue-700 text-white  py-1 px-3 rounded mb-4"
          >
            Add Another Image
          </button>
          </div>
          
        </div>

        <textarea
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-2/3 rounded"
          placeholder="Description"
        />

        <div className="flex mb-4 w-2/3 justify-between">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 260 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Select a Tour Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              required
              value={type}
              onChange={handleChange}
              label="Type"
            >
              <MenuItem value={"Adventure"}>Adventure</MenuItem>
              <MenuItem value={"Cultural"}>Cultural</MenuItem>
              <MenuItem value={"Nature & Wildlife"}>Nature & Wildlife</MenuItem>
              <MenuItem value={"City Life"}>City Life</MenuItem>
              <MenuItem value={"Beach & Coastal"}>Beach & Coastal</MenuItem>
              <MenuItem value={"Food & Culinary"}>Food & Culinary</MenuItem>
            </Select>
          </FormControl>
          <div>
            <input onChange={(e) => setPrice(e.target.value)} type="number" className="border border-gray-300 p-2 w-full rounded" placeholder="Price per person" />
          </div>
          
        </div>

        <input
          type="text"
          value={duration}
          required
          onChange={(e) => setDuration(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-2/3 rounded"
          placeholder="Duration (e.g., 4 days 3 nights)"
        />
        <div className="flex items-end space-x-4">
        <div>
        {tourPlan.map((dayPlan, index) => (
          <div key={index} className="mb-4 w-2/3">
            <input
              type="text"
              value={dayPlan.day}
              required={index === 0}
              onChange={(e) =>
                handleTourPlanChange(index, "day", e.target.value)
              }
              className="border border-gray-300 p-2 mb-2 w-full rounded"
              placeholder={`Day ${index + 1}`}
            />
            <textarea
              value={dayPlan.details}
              required={index === 0}
              onChange={(e) =>
                handleTourPlanChange(index, "details", e.target.value)
              }
              className="border border-gray-300 p-2 w-full rounded"
              placeholder={`Plan for Day ${index + 1}`}
            />
          </div>
        ))}
        </div>
        <div>
          <button
          type="button"
          onClick={addTourPlanDay}
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded mb-4"
        >
          Add Another Day
        </button>
        </div>
        
        </div>

        <button
          type="submit"
          className="bg-genoa hover:bg-green-200 hover:text-genoa text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
