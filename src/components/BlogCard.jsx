export default function BlogCard({ blog, userRole, onDelete, onPublish }) {
  const { _id, title, image, status } = blog;

  return (
    <div className="border p-4 rounded shadow space-y-2">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded"
        />
      )}

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">Status: {status}</p>

      {userRole === "admin" && (
        <div className="flex gap-2">
          <button
            onClick={() => onPublish(_id)}
            className={`px-3 py-1 text-white rounded ${
              status === "draft" ? "bg-green-600" : "bg-yellow-600"
            }`}
          >
            {status === "draft" ? "Publish" : "Unpublish"}
          </button>

          <button
            onClick={() => onDelete(_id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
