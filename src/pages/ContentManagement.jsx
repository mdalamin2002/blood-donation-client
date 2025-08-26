import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useRole from "../Hook/useRole";

const ContentManagementPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const { role } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://mission-scic11-server-template.vercel.app/api/blogs").then((res) => {
      setBlogs(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`https://mission-scic11-server-template.vercel.app/api/blogs/${id}`);
    setBlogs(blogs.filter((b) => b._id !== id));
  };

  const handlePublishToggle = async (id) => {
    const blog = blogs.find((b) => b._id === id);
    const newStatus = blog.status === "published" ? "draft" : "published";
    await axios.patch(`https://mission-scic11-server-template.vercel.app/api/blogs/${id}`, { status: newStatus });
    setBlogs(
      blogs.map((b) =>
        b._id === id ? { ...b, status: newStatus } : b
      )
    );
  };

  const handleEdit = (id) => {
  navigate(`/dashboard/addBlog/${id}`);
};
  const filteredBlogs = blogs.filter((blog) =>
    statusFilter === "all" ? true : blog.status === statusFilter
  );

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-primary">📝 Manage Blog Content</h2>
        <button
          className="btn btn-primary btn-sm md:btn-md"
          onClick={() => navigate("/dashboard/addBlog")}
        >
          ➕ Add New Blog
        </button>
      </div>

      {/* Filter Dropdown */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text font-semibold">Filter by status</span>
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="card bg-base-100 shadow-md border border-base-200"
            >
              <figure>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body space-y-2">
                <h2 className="card-title text-lg">{blog.title}</h2>
                <p className="text-gray-600">{blog.description?.slice(0, 100)}...</p>
                <p className="text-sm text-gray-500">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      blog.status === "published" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {blog.status}
                  </span>
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {/* ✏️ Edit available for both admin and volunteer */}
                  <button
                    onClick={() => handleEdit(blog._id)}
                    className="btn btn-outline btn-sm"
                  >
                    ✏️ Edit
                  </button>

                  {/* ✅ Only Admin can Publish/Unpublish and Delete */}
                  {role === "admin" && (
                    <>
                      <button
                        onClick={() => handlePublishToggle(blog._id)}
                        className={`btn btn-sm ${
                          blog.status === "draft" ? "btn-success" : "btn-warning"
                        }`}
                      >
                        {blog.status === "draft" ? "Publish" : "Unpublish"}
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">
            😕 No blog posts found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagementPage;
