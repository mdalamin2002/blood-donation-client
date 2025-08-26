import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://mission-scic11-server-template.vercel.app/api/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Blog data loading error");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://mission-scic11-server-template.vercel.app/api/blogs/${id}`, blog);
      toast.success("Blog sucessfully updated");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Blog update error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">✏️ Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="author"
          value={blog.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="image"
          value={blog.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          placeholder="Content"
          className="w-full p-2 border rounded h-40"
        />
        <select
          name="status"
          value={blog.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
