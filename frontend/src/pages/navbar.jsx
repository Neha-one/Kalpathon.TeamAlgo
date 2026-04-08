import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  User,
  LogIn,
  LogOut,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
    setOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-gray-200 shadow-sm">

        {/* 🔥 TOP BAR */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            WorkerHub
          </Link>

          {/* 🔥 MOBILE CENTER (Filter + Username) */}
          <div className="flex items-center gap-2 md:hidden flex-1 justify-center">

            {/* Filter */}
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1.5 rounded-full text-xs">
              <Filter size={14} />
              <select className="bg-transparent outline-none text-xs">
                <option>Work</option>
                <option>Plumber</option>
                <option>Electrician</option>
                <option>Carpenter</option>
              </select>
            </div>

            {/* Username */}
            {!isLoading && isAuthenticated && (
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1.5 rounded-full text-xs">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[70px] truncate">
                  {user?.username}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5">

            {/* Filter */}
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

                {/* Avatar */}
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">
                    {user?.username}
                  </span>
                </div>

                {/* Logout */}
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

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* 🔥 MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-[80%] bg-white shadow-lg transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 flex flex-col gap-6">

            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Menu</h2>
              <button onClick={() => setOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* User */}
            {isAuthenticated && (
              <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full">
                  {user?.username?.charAt(0)}
                </div>
                <span>{user?.username}</span>
              </div>
            )}

            {/* Actions */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;