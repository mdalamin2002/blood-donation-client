import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import BloodLoader from "../components/BloodLoader";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://mission-scic11-server-template.vercel.app/api/blogs")
      .then((res) => {
       
        const publishedPosts = res.data.filter((post) => post.status === "published");
        setBlogPosts(publishedPosts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <BloodLoader></BloodLoader>
  }

  return (
    <section className="py-12 px-4 md:px-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">Our Latest Blogs</h2>

      {blogPosts.length === 0 ? (
        <div className="text-center text-gray-600">No published blogs found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <Link to={`/blogs/${post._id}`}>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;
