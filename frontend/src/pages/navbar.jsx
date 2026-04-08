import React, { useEffect, useState } from "react";
import { User, LogIn, LogOut, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const {
    user,
    isAuthenticated,
    checkAuth,
    logout,
    isLoading,
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    await logout();
    setProfileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm">

      {/* 🔥 TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          WorkerHub
        </Link>

        {/* 🔥 MOBILE CENTER */}
        <div className="relative flex items-center gap-2 md:hidden">

          {/* Filter */}
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-xs shadow-sm">
            <Filter size={14} />
            <select className="bg-transparent outline-none text-xs">
              <option>Work</option>
              <option>Plumber</option>
              <option>Electrician</option>
              <option>Carpenter</option>
            </select>
          </div>

          {/* USER / LOGIN */}
          {!isLoading && isAuthenticated ? (
            <button
              onClick={() => setProfileMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-xs shadow-sm"
            >
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[80px] truncate font-medium">
                {user?.username}
              </span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs shadow-sm"
            >
              <LogIn size={14} />
              Sign In
            </Link>
          )}

          {/* 🔥 DROPDOWN FIXED */}
          {profileMenuOpen && isAuthenticated && (
            <div className="absolute top-12 right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-3 w-[140px]">

              <div className="text-center text-sm font-medium mb-2">
                {user?.username}
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-sm bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5">

          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <Filter size={16} />
            <select className="bg-transparent outline-none text-sm">
              <option>Select Worker</option>
              <option>Plumber</option>
              <option>Electrician</option>
              <option>Carpenter</option>
              <option>Painter</option>
            </select>
          </div>

          {!isLoading && isAuthenticated ? (
            <div className="flex items-center gap-4">

              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">
                  {user?.username}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm">
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;