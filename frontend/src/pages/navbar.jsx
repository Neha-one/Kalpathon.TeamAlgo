import React, { useEffect, useState } from "react";
import {
  LogOut,
  Filter,
  Menu,
  X,
  BriefcaseBusiness,
  Bell,
  Info,
  ChevronDown,
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
    selectedSpecialization,
    setSelectedSpecialization,
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
      <nav className="sticky top-0 z-50 border-b border-white/70 bg-white/72 backdrop-blur-xl">
        <div className="premium-shell flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              aria-label="Open menu"
            >
              <Menu size={20} className="mx-auto" />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30">
                <BriefcaseBusiness size={18} />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-slate-900 md:text-xl">
                WorkerHub Pro
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center rounded-2xl border border-blue-100 bg-white/90 px-2 py-2 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <div className="mr-2 grid h-8 w-8 place-items-center rounded-xl bg-blue-50 text-blue-700">
              <Filter size={14} />
            </div>
            <div className="relative">
              <select
                className="min-w-38 cursor-pointer appearance-none rounded-xl border border-transparent bg-transparent py-1.5 pl-2 pr-8 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-200 focus:bg-blue-50/40"
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                <option value="all">All Workers</option>
                <option value="plumbers">Plumber</option>
                <option value="electricians">Electrician</option>
                <option value="tutors">Tutors</option>
                <option value="delivery agents">Delivery Agents</option>
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="md:hidden flex items-center rounded-xl border border-blue-100 bg-white/90 px-2 py-1.5 shadow-sm transition hover:border-blue-200">
              <div className="mr-1.5 grid h-6 w-6 place-items-center rounded-lg bg-blue-50 text-blue-700">
                <Filter size={12} />
              </div>
              <div className="relative">
                <select
                  className="max-w-27 cursor-pointer appearance-none rounded-lg border border-transparent bg-transparent py-1 pl-1 pr-5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-200 focus:bg-blue-50/40"
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="plumbers">Plumber</option>
                  <option value="electricians">Electrician</option>
                  <option value="tutors">Tutors</option>
                  <option value="delivery agents">Delivery</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>

            {!isLoading && isAuthenticated ? (
              <div className="relative flex items-center">
                <div
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm transition hover:border-blue-200"
                >
                  <Link
                    to="/me"
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-xs font-bold text-white shadow-sm group-hover:shadow-md transition">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden max-w-24 truncate text-sm font-bold text-slate-800 group-hover:text-blue-600 md:block transition-colors">
                      {user?.username}
                    </span>
                  </Link>

                  <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>

                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex h-8 w-6 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>

                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                    <button
                      onClick={handleLogout}
                      className="premium-button w-full flex items-center justify-center gap-2 rounded-lg bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
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
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-blue-700"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="premium-button premium-button-primary hidden rounded-lg px-4 py-2 text-sm md:block"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 transition ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px]"
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`absolute left-0 top-0 h-full w-70 border-r border-white/50 bg-white/92 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Navigation</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 hover:border-blue-200 hover:text-blue-700"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 space-y-2">
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              <Info size={16} /> About
            </Link>

            <Link
              to="/notice"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              <Bell size={16} /> Notice
            </Link>
          </div>

          {isAuthenticated && (
            <div className="mt-8 premium-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Logged in as
              </p>
              <p className="mt-1 truncate text-sm font-bold text-slate-900">
                {user?.username}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
