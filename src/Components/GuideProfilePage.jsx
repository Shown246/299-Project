import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";

const fetchGuide = async (query) => {
  const id = query.queryKey[0];
  const response = await axios.get(`https://ph-assignment12-server.vercel.app/guide/${id}`);
  return response.data;
};

const GuideProfilePage = () => {
  const { id } = useParams();
  
  const { status, data, error } = useQuery({
    queryKey: [id],
    queryFn: fetchGuide,
  });
  if (status === 'pending') {
    return <div className="mx-auto flex justify-center items-center"><span className="loading loading-bars loading-lg"></span></div>
  }
  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="container90">
      <div className="flex items-center p-16">
        <img src={data.img} className="h-40 object-cover" />
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

export default GuideProfilePage