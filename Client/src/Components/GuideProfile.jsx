import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContextProvider";
import { MdOutlineSaveAs, MdOutlineModeEdit } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const GuideProfile = () => {
  const { user } = useContext(AuthContext);
  const [eduData, setEduData] = useState("");
  const [sklData, setsklData] = useState("");
  const [expData, setexpData] = useState("");
  const [phnData, setphnData] = useState("");
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  useEffect(() => {
    axios
      .get(`https://ph-assignment12-server.vercel.app/guide/profile?email=${user.email}`)
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
      .post("https://ph-assignment12-server.vercel.app/guide/profile", updatedData, {
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
  const handlesklChange = (e) => {
    setsklData(e.target.value);
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
                  Skills
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="shadow-sm bg-gray-400 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-60 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    value={sklData}
                    onChange={handlesklChange}
                  />
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

export default GuideProfile;
