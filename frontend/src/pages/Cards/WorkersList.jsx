import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/Api";
import WorkersCard from "./WorkersCard";
import { useAuthStore } from "../../store/useAuthStore";
import { ShieldCheck, Sparkles } from "lucide-react";

function WorkersList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, selectedSpecialization } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await API.get("/user");
        if (response.data.success && response.data.data.users) {
          const filteredWorkers = response.data.data.users.filter(
            (user) => user.userProfession === "worker",
          );
          setWorkers(filteredWorkers);
        }
      } catch (error) {
        console.error("Error fetching workers:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchWorkers();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Clean, standard login prompt
  if (!isAuthenticated) {
    return (
      <div className="premium-page w-full min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="premium-card-strong fade-slide text-center max-w-sm w-full p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-extrabold text-slate-900">
            Login Required
          </h2>
          <p className="mb-6 text-sm text-slate-600">
            Please sign in to view available professionals and contact them
            directly.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="premium-button premium-button-primary w-full py-2.5 text-sm cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="premium-page flex justify-center items-center min-h-[60vh]">
        <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div>
      </div>
    );
  }

  if (workers.length === 0) {
    return (
      <div className="premium-page flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50">
          <svg
            className="w-10 h-10 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-extrabold text-slate-900">
          No workers found
        </h2>
        <p className="max-w-sm text-slate-600">
          We couldn"t find any professionals registered at the moment. Please
          check back later.
        </p>
      </div>
    );
  }

  const filteredWorkers = workers.filter((worker) => {
    if (selectedSpecialization === "all") return true;
    return worker?.ability === selectedSpecialization;
  });

  return (
    <div className="premium-page pb-12">
      <section className="premium-shell pt-10">
        <div className="premium-card fade-slide mb-8 overflow-hidden p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="premium-section-title text-3xl">
                Available Professionals
              </h1>
              <p className="premium-subtitle mt-2">
                Discover trusted workers with verified profiles and clear rates.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <ShieldCheck size={18} className="text-blue-700" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                  Trusted Profiles
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  Updated listings
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Sparkles size={16} className="text-blue-700" />
          Curated workers for your selected specialization
        </div>

        {filteredWorkers.length === 0 && (
          <p className="mb-6 text-center text-sm text-slate-500">
            No workers found for selected specialization.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {filteredWorkers.map((worker) => (
            <WorkersCard key={worker._id} worker={worker} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default WorkersList;
