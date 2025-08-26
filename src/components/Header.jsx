import { useContext, useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenuAddLine } from "react-icons/ri";
import { Link, NavLink } from "react-router"; // corrected
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPageLoad, setIsPageLoad] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const menu = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "DonationRequests", path: "/AllDonationRequests" },
    { name: "DonorSearch", path: "/DonorSearch" },
    { name: "Funding", path: "/funding" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="w-11/12 mx-auto py-5 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <img
            src="/logo.jpg"
            alt="Blood Donation Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-xl font-bold text-red-600">Blood Donation</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-5">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:text-red-600 transition ${
                  isActive ? "text-red-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {user && user?.email ? (
            <>
              {/* Profile Dropdown */}
              <div className="relative">
                <div
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-8 h-8 rounded-full overflow-hidden bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs cursor-pointer"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{user.displayName?.charAt(0) || "U"}</span>
                  )}
                </div>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        logOut();
                        setShowProfileMenu(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-3 py-2 rounded hover:text-red-600 transition text-gray-700"
              >
                Login
              </NavLink>
              <NavLink
                to="/registration"
                className="px-3 py-2 rounded hover:text-red-600 transition text-gray-700"
              >
                Register
              </NavLink>
            </>
          )}
        </ul>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          {!isMenuOpen ? (
            <RiMenuAddLine
              onClick={() => {
                setIsMenuOpen(true);
                setIsPageLoad(true);
              }}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <CgMenuMotion
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl cursor-pointer"
            />
          )}

          <ul
            className={`flex animate__animated bg-white flex-col lg:hidden gap-5 absolute z-50 bg-opacity-95 w-full top-14 left-0 ${
              isMenuOpen
                ? "animate__fadeInRight"
                : isPageLoad
                ? "animate__fadeOutRight flex"
                : "hidden"
            }`}
          >
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 border-b hover:text-red-600 transition ${
                    isActive ? "text-red-600 font-semibold" : "text-gray-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {user && user?.email ? (
              <>
                <NavLink
                  to="/dashboard/profile"
                  className="block px-4 py-2 hover:text-red-600 transition text-gray-700"
                >
                  Profile
                </NavLink>
                <button
                  className="w-full text-left px-4 py-2 hover:text-red-600 transition text-gray-700"
                  onClick={logOut}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block px-4 py-2 hover:text-red-600 transition text-gray-700"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/registration"
                  className="block px-4 py-2 hover:text-red-600 transition text-gray-700"
                >
                  Register
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
