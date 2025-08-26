import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function AddBlog() {
  const { register, handleSubmit, reset } = useForm();
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");

  // ✅ userRole fixed as 'admin'
  const [userRole] = useState("admin");

  // ✅ API key from .env
  const imageBBApiKey = import.meta.env.VITE_IMAGEBB_API_KEY;

  // 🔁 Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://mission-scic11-server-template.vercel.app/api/blogs");
      setBlogs(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch blogs", "error");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Submit new blog
  const onSubmit = async (data) => {
    if (!imageURL) return Swal.fire("Please upload an image");

    const blogData = {
      title: data.title,
      author: data.author,
      image: imageURL,
      content,
      status: "draft",
    };

    try {
      await axios.post("https://mission-scic11-server-template.vercel.app/api/blogs", blogData);
      Swal.fire("Success", "Blog submitted as draft", "success");
      reset();
      setContent("");
      setImageURL("");
      fetchBlogs();
    } catch (error) {
      Swal.fire("Error", "Failed to submit blog", "error");
    }
  };

  // ✅ Upload image to imageBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`,
        formData
      );
      setImageURL(res.data.data.url);
    } catch (error) {
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  // // ✅ Publish/Unpublish blog
  // const handleStatusChange = async (id, status) => {
  //   if (userRole !== "admin") return;
  //   const newStatus = status === "draft" ? "published" : "draft";
  //   try {
  //     await axios.patch(`https://mission-scic11-server-template.vercel.app/api/blogs/${id}`, {
  //       status: newStatus,
  //     });
  //     fetchBlogs();
  //   } catch (error) {
  //     Swal.fire("Error", "Failed to update blog status", "error");
  //   }
  // };

  // // ✅ Delete blog
  // const handleDelete = async (id) => {
  //   if (userRole !== "admin") return;
  //   try {
  //     await axios.delete(`https://mission-scic11-server-template.vercel.app/api/blogs/${id}`);
  //     fetchBlogs();
  //   } catch (error) {
  //     Swal.fire("Error", "Failed to delete blog", "error");
  //   }
  // };

  // // ✅ Filter blogs
  // const filteredBlogs = blogs.filter((blog) => {
  //   if (filter === "all") return true;
  //   return blog.status === filter;
  // });

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-10">
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 border p-4 rounded shadow"
      >
        <input
          {...register("title")}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <input
          {...register("author")}
          placeholder="Author"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write blog content here..."
          className="w-full p-2 border rounded h-40"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Blog
        </button>
      </form>

      {/* Blog Filter Dropdown */}
      {/* <div className="flex justify-between items-center mt-10">
        <h2 className="text-xl font-bold">All Blogs</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div> */}

      {/* Blog Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="border p-4 rounded shadow space-y-2"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-sm text-gray-600">Status: {blog.status}</p>
            <div className="flex gap-2">
              {userRole === "admin" && (
                <>
                  <button
                    onClick={() =>
                      handleStatusChange(blog._id, blog.status)
                    }
                    className={`px-3 py-1 text-white rounded ${
                      blog.status === "draft"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {blog.status === "draft" ? "Publish" : "Unpublish"}
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
