import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BloodLoader from "../components/BloodLoader";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://mission-scic11-server-template.vercel.app/api/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
       
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, [id]);
   

  if (loading) {
    return <BloodLoader></BloodLoader>;
  }

  if (!blog) {
    return <div className="text-center py-10 text-red-500">Blog not found.</div>;
  }

  return (
    <section className="py-10 px-4 md:px-10 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-md mb-6" />
        <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
        <p className="text-gray-600 mb-4">Written by: {blog.author}</p>
        <p className="text-gray-700 text-lg leading-relaxed">{blog.content}</p>
      </div>
    </section>
  );
};

export default BlogDetails;
