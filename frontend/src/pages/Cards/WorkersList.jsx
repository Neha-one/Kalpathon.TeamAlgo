import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/Api";
import WorkersCard from "./WorkersCard";
import { useAuthStore } from "../../store/useAuthStore";

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
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Login Required
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Please sign in to view available professionals and contact them
            directly.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (workers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-gray-400"
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
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          No workers found
        </h2>
        <p className="text-gray-500 max-w-sm">
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
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Available Professionals
        </h1>
        <p className="text-gray-500">
          Browse and contact our verified professionals.
        </p>
      </div>
      {filteredWorkers.length === 0 && (
        <p className="text-center text-sm text-gray-500 mb-6">
          No workers found for selected specialization.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        {filteredWorkers.map((worker) => (
          <WorkersCard key={worker._id} worker={worker} />
        ))}
      </div>
    </div>
  );
}

export default WorkersList;
