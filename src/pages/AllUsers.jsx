import axios from "axios";
import { useEffect, useState } from "react";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    axios.get("https://mission-scic11-server-template.vercel.app/api/users").then((res) => setUsers(res.data));
    
  }, []);
  

  const handleBlock = async (id) => {
    await axios.patch(`https://mission-scic11-server-template.vercel.app/api/users/${id}`, { status: "blocked" });
    updateUserStatus(id, "blocked");
  };

  const handleUnblock = async (id) => {
    await axios.patch(`https://mission-scic11-server-template.vercel.app/api/users/${id}`, { status: "active" });
    updateUserStatus(id, "active");
  };

  const handleMakeVolunteer = async (id) => {
    await axios.patch(`https://mission-scic11-server-template.vercel.app/api/users/${id}`, { role: "volunteer" });
    updateUserRole(id, "volunteer");
  };

  const handleMakeAdmin = async (id) => {
    await axios.patch(`https://mission-scic11-server-template.vercel.app/api/users/${id}`, { role: "admin" });
    updateUserRole(id, "admin");
  };

  const updateUserStatus = (id, status) => {
    setUsers(users.map(user => user._id === id ? { ...user, status } : user));
  };

  const updateUserRole = (id, role) => {
    setUsers(users.map(user => user._id === id ? { ...user, role } : user));
  };

  const filteredUsers = users.filter((user) =>
    
    statusFilter === "all" ? true : user.status === statusFilter
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* Filter Buttons */}
      <div className="mb-4 flex gap-2">
        {["all", "active", "blocked"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`btn btn-sm ${
              statusFilter === status ? "btn-primary" : "btn-outline"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user.avatar || `https://i.pravatar.cc/150?u=${user.email}`} />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td className="capitalize">{user.status}</td>
                <td>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-sm btn-ghost m-1">
                      ⋮
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {user.status === "active" ? (
                        <li>
                          <button onClick={() => handleBlock(user._id)} className="text-red-500">
                            🚫 Block
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button onClick={() => handleUnblock(user._id)} className="text-green-500">
                            ✅ Unblock
                          </button>
                        </li>
                      )}
                      {user.role !== "volunteer" && (
                        <li>
                          <button onClick={() => handleMakeVolunteer(user._id)}>
                            🎗 Make Volunteer
                          </button>
                        </li>
                      )}
                      {user.role !== "admin" && (
                        <li>
                          <button onClick={() => handleMakeAdmin(user._id)}>🛡 Make Admin</button>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
