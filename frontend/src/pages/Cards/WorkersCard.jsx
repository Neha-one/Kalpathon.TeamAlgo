import React, { useState } from "react";
import { Link } from "react-router-dom";

function WorkersCard({ worker }) {
  const [showPhone, setShowPhone] = useState(false);

  // Safety check
  if (!worker || worker.userProfession !== "worker") {
    return null;
  }

  return (
    <Link 
      to={`/user/${worker.customId}`}
      className="premium-card-strong fade-slide flex w-full max-w-[20rem] flex-col overflow-hidden mx-auto group border border-blue-100/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-900/10 cursor-pointer block"
    >
      <div className="relative w-full border-b border-blue-100/70 bg-linear-to-r from-blue-50/80 via-white to-sky-50/70 px-5 pb-4 pt-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={
                  worker.profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt={worker.username}
                className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm"
              />
              {worker.isVerified && (
                <div
                  className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-blue-500"
                  title="Verified"
                >
                  <svg
                    className="w-3 h-3 text-white m-px"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 pt-0.5 mt-1">
              <h2 className="pr-8 text-base font-extrabold leading-tight text-slate-900 capitalize truncate transition-colors group-hover:text-blue-700">
                {worker.username || "Anonymous"}
              </h2>
              <div className="mt-1.5 flex flex-wrap gap-2">
                <span
                  className={`inline-flex rounded-md border px-2 py-0.75 text-[10px] font-bold uppercase tracking-widest shadow-sm ${worker.ability ? "border-blue-200 bg-blue-100/70 text-blue-700" : "border-slate-200 bg-slate-100 text-slate-500"}`}
                >
                  {worker.ability || "General Work"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowPhone(true);
          }}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-white text-blue-600 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          title="Contact Worker"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </button>
      </div>

      <div className="flex grow flex-col bg-white p-5 font-sans">
        <div className="mb-4 flex items-center justify-between rounded-xl border border-blue-100/70 bg-blue-50/70 px-4 py-2.5">
          <div>
            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-blue-700/80">
              Expected Rate
            </p>
          </div>
          <div className="text-sm font-extrabold text-blue-900">
            ₹{worker.priceRange || "Negotiable"}
          </div>
        </div>

        <div className="mb-2 grow">
          <p className="line-clamp-3 text-[13px] leading-relaxed text-slate-600">
            {worker.bio ||
              "No professional bio provided by this worker yet. Please contact for more details."}
          </p>
        </div>
      </div>

      {showPhone && (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowPhone(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[18rem] overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-xl"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 ring-4 ring-blue-50/50">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">
              Phone Number
            </h3>
            <p className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {worker.phoneNumber || "Not Available"}
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPhone(false);
              }}
              className="premium-button premium-button-soft w-full rounded-xl py-2.5 text-sm font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Link>
  );
}

export default WorkersCard;
