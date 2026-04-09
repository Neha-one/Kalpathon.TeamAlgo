import React, { useState } from "react";
import { Menu, X, User, LogIn, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          WorkerHub
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">

          {/* Filter */}
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition">
            <Filter size={18} className="text-gray-500" />
            <select className="bg-transparent outline-none text-sm font-medium">
              <option>Select Worker</option>
              <option>Plumber</option>
              <option>Electrician</option>
              <option>Carpenter</option>
              <option>Painter</option>
              <option>Mechanic</option>
            </select>
          </div>

          {/* Sign In */}
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition"
          >
            <LogIn size={18} />
            Sign In
          </Link>

          {/* Sign Up */}
          <Link
            to="/register"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            <User size={18} />
            Get Started
          </Link>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-6 pb-6 flex flex-col gap-4 bg-white/90 backdrop-blur-md">

          {/* Filter */}
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl">
            <Filter size={18} />
            <select className="bg-transparent outline-none w-full">
              <option>Select Worker</option>
              <option>Plumber</option>
              <option>Electrician</option>
              <option>Carpenter</option>
              <option>Painter</option>
              <option>Mechanic</option>
            </select>
          </div>

          {/* Buttons */}
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 py-3 border rounded-xl font-medium hover:bg-gray-100 transition"
          >
            <LogIn size={18} />
            Sign In
          </Link>

          <Link
            to="/register"
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:scale-[1.02] transition"
          >
            <User size={18} />
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;