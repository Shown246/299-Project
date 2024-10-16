import { useContext } from 'react';
import { AuthContext } from "../AuthContextProvider";
import axios from 'axios';
import { toast } from 'react-toastify';

const TouristProfile = () => {
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const story = e.target.story.value;
    const newStory = {
      email: user.email,
      name: user.displayName,
      date: new Date().toLocaleDateString(),
      story: story
    };
    axios.post('http://localhost:5000/stories', newStory, { withCredentials: true })
      .then(() => {
        toast.success("Story shared successfully");
        e.target.reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to share story");
      });
  }
  return (
    <div>
      <div className="flex items-center p-16">
        <img src={user.photoURL} className="h-40 object-cover" />
        <div>
          <p className="ml-4 text-2xl font-medium">{user.displayName}</p>
          <p className="ml-4 text-2xl font-medium">{user.email}</p>
        </div>
      </div>
      <div className='pl-16'>
        <form onSubmit={(e) => {handleSubmit(e)}}>
          <label className='block mb-2 text-lg font-semibold text-gray-900 dark:text-white'>Share your Story</label>
          <textarea name='story' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-xl flex items-center gap-1'>Share</button>
        </form>
      </div>
    </div>
  )
}

export default TouristProfile