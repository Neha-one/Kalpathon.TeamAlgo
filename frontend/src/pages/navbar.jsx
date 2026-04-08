import React, { useEffect, useState } from "react";
import {
  User,
  LogIn,
  LogOut,
  Filter,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    user,
    isAuthenticated,
    checkAuth,
    logout,
    isLoading,
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logout();
    setProfileMenuOpen(false);
  };

  return (
    <>
      {/* 🔥 NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b shadow-sm">

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* 🔥 HAMBURGER (ALL DEVICES) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              WorkerHub
            </Link>
          </div>

          {/* CENTER (Desktop Filter) */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition">
              <Filter size={16} />
              <select className="bg-transparent outline-none text-sm">
                <option>Select Worker</option>
                <option>Plumber</option>
                <option>Electrician</option>
                <option>Carpenter</option>
              </select>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            {/* Mobile Filter */}
            <div className="md:hidden flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
              <Filter size={14} />
              <select className="bg-transparent outline-none">
                <option>Work</option>
                <option>Plumber</option>
              </select>
            </div>

            {/* Auth */}
            {!isLoading && isAuthenticated ? (
              <div className="relative">

                {/* Avatar */}
                <button
                  onClick={() =>
                    setProfileMenuOpen(!profileMenuOpen)
                  }
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
                >
                  <div className="w-7 h-7 flex items-center justify-center bg-blue-600 text-white rounded-full text-xs font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>

                  <span className="hidden md:block text-sm font-medium">
                    {user?.username}
                  </span>
                </button>

                {/* Dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-lg p-3 w-[150px]">
                    <p className="text-center text-sm mb-2">
                      {user?.username}
                    </p>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-blue-600"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 🔥 SIDEBAR (ALL DEVICES) */}
      <div
        className={`fixed inset-0 z-50 transition ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 h-full w-[260px] bg-white shadow-xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 flex flex-col gap-6">

            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium hover:text-blue-600 transition"
            >
              About
            </Link>

            <Link
              to="/notice"
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium hover:text-blue-600 transition"
            >
              Notice
            </Link>

            {/* Divider */}
            <div className="border-t pt-4" />

            {/* User Info */}
            {isAuthenticated && (
              <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold">
                  {user?.username?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Logged in as
                  </p>
                  <p className="font-medium">
                    {user?.username}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;