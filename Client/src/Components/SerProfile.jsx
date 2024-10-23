import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContextProvider";
import { MdOutlineSaveAs, MdOutlineModeEdit } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MaterialSelect from "@mui/material/Select";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 1;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


const SerProfile = () => {
  const { user } = useContext(AuthContext);
  //Skills selection
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  // Toggle modal visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option); // Set selected option
    setIsOpen(false); // Close modal
  };

  //Gender selection
  const [gender, setGender] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const [eduData, setEduData] = useState("");
  const [sklData, setsklData] = useState("");
  const [expData, setexpData] = useState("");
  const [phnData, setphnData] = useState("");
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/guide/profile?email=${user.email}`)
      .then((res) => {
        const data = res.data;
        setEduData(data.eduData);
        setsklData(data.sklData);
        setexpData(data.expData);
        setphnData(data.phnData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.email]);
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
    setIsSaveEnabled(true);
  };
  const handleSaveClick = () => {
    const updatedData = {
      email: user.email,
      name: user.displayName,
      img: user.photoURL,
      eduData,
      sklData,
      expData,
      phnData,
    };
    console.log(updatedData);
    axios
      .post("http://localhost:5000/guide/profile", updatedData, {
        withCredentials: true,
      })
      .then(() => {
        setIsEditing(false);
        toast.success("Changes saved successfully");
      })
      .then((err) => {
        console.log(err);
      });
  };

  const handleEduChange = (e) => {
    setEduData(e.target.value);
  };
  const handleexpChange = (e) => {
    setexpData(e.target.value);
  };
  const handlephnChange = (e) => {
    setphnData(e.target.value);
  };
  return (
    <div>
      <div className="flex items-center p-16">
        <img src={user.photoURL} className="h-40 object-cover" />
        <div>
          <p className="ml-4 text-2xl font-medium">{user.displayName}</p>
          <p className="ml-4 text-2xl font-medium">{user.email}</p>
        </div>
      </div>
      <div className="pl-16">
        <div className="flex gap-16 mb-8">
          <div>
            {isEditing ? (
              <div>
                <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                  Select your Operating Location
                </label>
                <div className="flex">
                  <div className="flex w-full flex-col items-center justify-center">
                    <button
                      onClick={toggleModal}
                      className="max-w-1/2 pl-3 pr-4 py-2 bg-genoa text-teal rounded-lg hover:bg-teal hover:text-accent flex gap-2"
                    >
                      <img src="assets/map.png" alt="" />
                      {selectedOption ? `${selectedOption}` : "Location"}
                    </button>

                    {/* Modal */}
                    {isOpen && (
                      <div className="text-accent fixed inset-0 flex items-center justify-center bg-teal bg-opacity-50 z-50">
                        <div className="bg-teal relative rounded-lg shadow-lg w-80 p-6">
                          <h2 className="text-lg font-semibold mb-4">
                            Select a Location
                          </h2>

                          {/* Scrollable content */}
                          <div className="max-h-60 overflow-y-auto">
                            <ul className="grid grid-cols-2 gap-2">
                              {/* Options */}
                              {[
                                "Option 1",
                                "Option 2",
                                "Option 3",
                                "Option 4",
                                "Option 5",
                                "Option 6",
                                "Option 7",
                                "Option 8",
                                "Option 9",
                                "Option 10",
                                "Option 11",
                                "Option 12",
                                // Add more options here
                              ].map((option) => (
                                <li
                                  key={option}
                                  onClick={() => handleOptionSelect(option)}
                                  className="py-2 px-4 cursor-pointer hover:bg-genoa rounded"
                                >
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Close button */}
                          <button
                            onClick={toggleModal}
                            className="btn btn-sm btn-circle btn-ghost hover:text-red-700 hover:border-accent bg-red-800 absolute right-2 top-2"
                          >
                            x
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Educational Qualification
                  </label>
                  <p className="text-lg w-60 p-2">{eduData}</p>
                </div>
              </div>
            )}
          </div>
          <div>
            {isEditing ? (
              <div>
                <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                  Skills
                </label>
                <div className="flex w-full">
                  <FormControl sx={{ m: 1, width: 230 }}>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                      size="small"
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={personName.includes(name)} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            ) : (
              <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Skills
                  </label>
                  <p className="text-lg w-60 p-2">{sklData}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-16 mb-8">
          <div>
            {isEditing ? (
              <div>
                <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                  Educational Qualification
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="shadow-sm bg-gray-400  text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-60 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    value={eduData}
                    onChange={handleEduChange}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Educational Qualification
                  </label>
                  <p className="text-lg w-60 p-2">{eduData}</p>
                </div>
              </div>
            )}
          </div>
          <div>
            {isEditing ? (
              <div>
                <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                  Gender
                </label>
                <div className="flex">
                  <Box sx={{ minWidth: 230 }}>
                    <FormControl fullWidth>
                      <MaterialSelect
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        onChange={handleGenderChange}
                        size="small"
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                        <MenuItem value={"none"}>None</MenuItem>
                      </MaterialSelect>
                    </FormControl>
                  </Box>
                </div>
              </div>
            ) : (
              <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Skills
                  </label>
                  <p className="text-lg w-60 p-2">{sklData}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-16 mb-8">
          <div>
            {isEditing ? (
              <div>
                <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                  Work Experience
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="shadow-sm bg-gray-400  text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-60 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    value={expData}
                    onChange={handleexpChange}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Work Experience
                  </label>
                  <p className="text-lg w-60 p-2">{expData}</p>
                </div>
              </div>
            )}
          </div>
          <div>
            {isEditing ? (
              <div>
                <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                  Phone Number
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="shadow-sm bg-gray-400 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-60 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    value={phnData}
                    onChange={handlephnChange}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Phone Number
                  </label>
                  <p className="text-lg w-60 p-2">{phnData}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-12 pl-10">
          <button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 pl-4  pr-6 rounded-xl flex items-center gap-1"
          >
            <span>
              <MdOutlineModeEdit size={25} />
            </span>
            Edit
          </button>
          <button
            onClick={handleSaveClick}
            id="saveBtn"
            disabled={!isSaveEnabled}
            className={`${
              isSaveEnabled
                ? "bg-blue-500 hover:bg-blue-700 cursor-pointer"
                : "bg-gray-500 cursor-not-allowed"
            } text-white font-bold py-2 px-4 rounded-xl flex items-center gap-1`}
          >
            <span>
              <MdOutlineSaveAs size={30} />
            </span>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SerProfile;