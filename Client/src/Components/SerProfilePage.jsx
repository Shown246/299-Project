import axios from "axios";
import { useState, useEffect } from "react";


const SerProfilePage = () => {
  const [data, setData] = useState({});
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/userProfile", {withCredentials: true})
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(data);
  return (
    <div className="container90">
      <div className="flex items-center p-16">
        <img src={data.photoURL} className="h-40 object-cover" />
        <div>
          <p className="ml-4 text-2xl font-medium">{data.name}</p>
          <p className="ml-4 text-2xl font-medium">{data.email}</p>
        </div>
      </div>
      <div className="pl-16">
        <div className="flex gap-16 mb-8">
          <div>
          <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Educational Qualification
                  </label>
                  <p className="text-lg w-60 p-2">{data.eduData}</p>
                </div>
              </div>
          </div>
          <div>
          <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Skills
                  </label>
                  <p className="text-lg w-60 p-2">{data.sklData}</p>
                </div>
              </div>
          </div>
        </div>
        <div className="flex gap-16 mb-8">
          <div>
          <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Work Experience
                  </label>
                  <p className="text-lg w-60 p-2">{data.expData}</p>
                </div>
              </div>
          </div>
          <div>
          <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Phone Number
                  </label>
                  <p className="text-lg w-60 p-2">{data.phnData}</p>
                </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SerProfilePage;