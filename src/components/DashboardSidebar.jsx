import { NavLink } from "react-router";
import useRole from "../Hook/useRole";
// import useRole from "../hooks/useRole";

export default function DashboardSidebar() {
  const NavItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );

  const { role, loading } = useRole();

  if (loading) return <h1>Loading...</h1>;

  if (role === "admin")
    return (
      <nav className="flex flex-col gap-4">
        <NavItem
          to="/dashboard"
          // icon={<Home size={20} />}
          label="Admin"
        />
        <NavItem
          to="/dashboard/AllUsers"
          // icon={<Plus size={20} />}
          label="All Users"
        />
        {/* <NavItem
          to="/dashboard/addBlog"
          // icon={<List size={20} />}
          label="Add Blog"
        /> */}
        <NavItem
          to="/dashboard/AllDonationRequests"
          // icon={<BookOpen size={20} />}
          label="All Donation Requests"
        />
        <NavItem
          to="/dashboard/ContentManagementPage"
          // icon={<BookOpen size={20} />}

          label="ContentManagementPage"
        />
        <NavItem
          to="/dashboard/funding"
          // icon={<User size={20} />}
          label="Funding "
        />
        <NavItem
          to="/dashboard/profile"
          // icon={<User size={20} />}
          label="Profile"
        />
      </nav>
    );
  if (role === "volunteer")
    return (
      <nav className="flex flex-col gap-4">
        <NavItem
          to="/dashboard"
          // icon={<Home size={20} />}
          label="Volunteer"
        />
        <NavItem
          to="/dashboard/AllDonationRequests"
          // icon={<BookOpen size={20} />}
          label="All Donation Requests"
        />
        <NavItem
          to="/dashboard/ContentManagementPage"
          // icon={<BookOpen size={20} />}

          label="ContentManagementPage"
        />
        <NavItem
          to="/dashboard/profile"
          // icon={<User size={20} />}
          label="Profile"
        />
      </nav>
    );

  // donor sidebar
  return (
    <nav className="flex flex-col gap-4">
      <NavItem
        to="/dashboard"
        // icon={<Home size={20} />}
        label="Donor"
      />

      {/* <NavItem
        to="/dashboard/addblog"
        // icon={<Plus size={20} />}
        label="Add Blog"
      /> */}
      <NavItem
        to="/dashboard/MyDonationRequests"
        // icon={<List size={20} />}
        label="MyDonationRequests"
      />
      <NavItem
        to="/dashboard/DonationRequests"
        // icon={<BookOpen size={20} />}
        label="DonationRequests"
      />
      <NavItem
        to="/dashboard/profile"
        // icon={<User size={20} />}
        label="Profile"
      />
    </nav>
  );
}
