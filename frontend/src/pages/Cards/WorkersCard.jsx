import React from "react";
import { useNavigate } from "react-router-dom";

function WorkersCard({ worker }) {
  const navigate = useNavigate();

  // Safety check
  if (!worker || worker.userProfession !== "worker") {
    return null;
  }

  const handleCardClick = () => {
    if (worker.customId) {
      navigate(`/user/${worker.customId}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white border border-gray-100 rounded-[1.25rem] shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:border-blue-200
      hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.15)] hover:-translate-y-1.5 transition-all duration-500 ease-out
      cursor-pointer flex flex-col p-5 max-w-[20rem] w-full mx-auto overflow-hidden"
    >
      {/* Background Soft Glow styling on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

      {/* Header Row: Avatar & Price */}
      <div className="relative z-10 flex justify-between items-start mb-5">
        <div className="relative">
          {/* Avatar Area */}
          <div className="p-0.5 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-400 group-hover:to-indigo-500 transition-all duration-500">
            <img
              src={
                worker.profilePicture ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt={worker.username}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
          </div>
          {/* Online Indicator */}
          
        </div>

        {/* Floating Price Pill */}
        <div className="flex flex-col items-end">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[13px] font-bold border border-emerald-100 shadow-sm mt-1">
            ₹{worker.priceRange || "Negotiable"}
          </span>
          <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest mt-1 mr-1">Expected Rate</span>
        </div>
      </div>

      {/* Info section */}
      <div className="relative z-10 flex-col mb-4">
        <div className="flex items-center justify-between min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-[1.15rem] font-bold text-gray-900 capitalize group-hover:text-blue-600 transition-colors tracking-tight">
              {worker.username || "Unknown Worker"}
            </h2>
            {/* Verified Icon directly next to name */}
            {worker.isVerified && (
              <svg className="w-4 h-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>

        {/* Ability Badge */}
        <span
          className={`mt-1.5 inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider
          ${
            worker.ability
              ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
              : "bg-gray-100 text-gray-400 border border-gray-200"
          }`}
        >
          {worker.ability || "No Ability"}
        </span>
      </div>

      {/* Bio container */}
      <div className="relative z-10 mb-5 flex-grow">
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {worker.bio || "This Worker hasn't added a bio yet."}
        </p>
      </div>

      {/* Contact Box slightly redesigned */}
      
    

      {/* Action Button */}
      <div className="relative z-10 mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            handleCardClick();
          }}
          className="w-full py-3 rounded-xl text-sm font-bold tracking-wide flex justify-center items-center gap-2
          bg-gray-900 border border-gray-900 text-white 
          group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)]
          transition-all duration-300"
        >
          <span>View Full Profile</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default WorkersCard;