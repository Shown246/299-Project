import{ useState, useContext } from 'react';
import { AuthContext } from '../AuthContextProvider';
import axios from 'axios';
import { AiOutlineLike, AiOutlineComment } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const { user } = useContext(AuthContext);
  const fetchPosts = async () => {
    const response = await axios.get('https://ph-assignment12-server.vercel.app/communityPosts');
    setPosts(response.data);
    return response.data;
  };
  const { status, error } = useQuery({ queryKey: '', queryFn: fetchPosts });
  if (status === 'pending') {
    return <div className="mx-auto flex justify-center items-center"><span className="loading loading-bars loading-lg"></span></div>
  }
  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const newPostData = {
      author: user.displayName,
      content: newPost,
      date: new Date(),
    };
    setPosts([newPostData, ...posts]);
    setNewPost('');
    e.target.reset();
  };

  return (
    <div className="container mx-auto p-4 dark:text-white">
      <header className="text-center my-4">
        <h1 className="text-4xl font-bold text-blue-600">Community</h1>
        <p className="">Share your travel experiences, ask questions, and connect with other travelers!</p>
      </header>

      <section className="my-8">
        <form onSubmit={handlePostSubmit} className="p-4 shadow rounded-lg">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full p-2 border rounded-lg"
            rows="4"
            required
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-700">
            Post
          </button>
        </form>
      </section>

      <section>
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="p-4 shadow rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{post.author}</h2>
                <span className=" text-sm">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <p className="">{post.content}</p>
              <div className="flex mt-2">
                <button className="flex items-center text-blue-600 mr-4">
                  <AiOutlineLike className="mr-1" /> Like
                </button>
                <button className="flex items-center text-blue-600">
                  <AiOutlineComment className="mr-1" /> Comment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center ">No posts yet. Be the first to share something!</p>
        )}
      </section>
    </div>
  );
};

export default Community;
