import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Blogs = () => {

  const fetchBlogs = async () => {
    const response = await axios.get('https://ph-assignment12-server.vercel.app/blogs');
    return response.data;
  };
  const { status,data, error } = useQuery({ queryKey: '', queryFn: fetchBlogs });
  if (status === 'pending') {
    return <div className="mx-auto flex justify-center items-center"><span className="loading loading-bars loading-lg"></span></div>
  }
  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((blog) => (
          <div key={blog._id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">By {blog.author} on {new Date(blog.date).toLocaleDateString()}</p>
            <p className="text-gray-700">{blog.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
