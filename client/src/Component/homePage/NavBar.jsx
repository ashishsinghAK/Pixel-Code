import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { logout } from '../../Service/authAPI';
import { getCourseCategory } from '../../Service/courseDetailAPI';
import { ProfileDropdown } from '../Auth/ProfileDropdown';

const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subLink, setSubLink] = useState([]);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout(navigate));
    setProfileMenuOpen(false);
  };

  useEffect(() => {
    const fetchSubLink = async () => {
      try {
        const result = await getCourseCategory();
        if (result) setSubLink(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSubLink();
  }, []);

  return (
    <nav className="bg-slate-900 text-white">
      <div className="w-11/12 mx-auto flex justify-between items-center h-14">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">Logo</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-semibold">
          <Link to="/" className="text-yellow-500">Home</Link>

          {user?.accountType === "Student" && (
            <div className="relative group">
              <div className="flex items-center gap-1 cursor-pointer">
                <span>Category</span>
                <IoIosArrowDropdown />
              </div>
              <div className="absolute left-0 top-full mt-1 bg-white text-slate-900 shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 min-w-[200px] z-50">
                {subLink.length > 0 ? (
                  subLink.map((link, idx) => (
                    <Link
                      key={idx}
                      to={`/catalog/${link.name.split(" ").join("-").toLowerCase()}`}
                      className="block px-4 py-2 hover:bg-yellow-300"
                    >
                      {link.name}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2">No Category Added</div>
                )}
              </div>
            </div>
          )}

          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {!token ? (
            <>
              <Link to="/login" className="bg-slate-800 px-3 py-1 rounded-md">Login</Link>
              <Link to="/signup" className="bg-slate-800 px-3 py-1 rounded-md">Signup</Link>
            </>
          ) : (
            <>
              <ProfileDropdown />
              <button onClick={handleLogout} className="border px-3 py-1 rounded-md">Logout</button>
            </>
          )}
        </div>

        {/* Mobile: Profile Icon instead of Hamburger */}
        <div className="md:hidden relative">
          <button onClick={() => setProfileMenuOpen((prev) => !prev)}>
            <FaUserCircle size={26} />
          </button>

          {/* Mobile Dropdown */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 bg-slate-800 text-white w-52 p-4 rounded shadow-lg z-50">
              <Link to="/" onClick={() => setProfileMenuOpen(false)} className="block py-2 text-yellow-400">Home</Link>

              {user?.accountType === "Student" && (
                <div className="py-2">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                  >
                    <span>Category</span>
                    <IoIosArrowDropdown />
                  </div>
                  {categoryOpen && (
                    <div className="pl-4 mt-2">
                      {subLink.length > 0 ? (
                        subLink.map((link, idx) => (
                          <Link
                            key={idx}
                            to={`/catalog/${link.name.split(" ").join("-").toLowerCase()}`}
                            className="block py-1"
                            onClick={() => setProfileMenuOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))
                      ) : (
                        <div>No Category Added</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <Link to="/about" onClick={() => setProfileMenuOpen(false)} className="block py-2">About Us</Link>
              <Link to="/contact" onClick={() => setProfileMenuOpen(false)} className="block py-2">Contact Us</Link>

              {token && user?.accountType !== "Instructor" && (
                <Link
                  to="/dashboard"
                  onClick={() => setProfileMenuOpen(false)}
                  className="block py-2"
                >
                  Go to Dashboard
                </Link>
              )}

              {!token ? (
                <>
                  <Link to="/login" onClick={() => setProfileMenuOpen(false)} className="block py-2">Login</Link>
                  <Link to="/signup" onClick={() => setProfileMenuOpen(false)} className="block py-2">Signup</Link>
                </>
              ) : (
                <>
                  <button onClick={handleLogout} className="w-full text-left py-2">
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
