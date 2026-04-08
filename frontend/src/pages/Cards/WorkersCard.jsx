import React, { useState } from "react";

function WorkersCard({ worker }) {
  const [showPhone, setShowPhone] = useState(false);

  // Safety check
  if (!worker || worker.userProfession !== "worker") {
    return null;
  }

  return (
    <div className="bg-blue-50/20 border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 flex flex-col w-full mx-auto max-w-[20rem] overflow-hidden group">
      
      {/* Top Banner Area */}
      <div className="w-full bg-gradient-to-r from-blue-50/60 to-white pt-5 px-5 pb-4 border-b border-blue-50 relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={worker.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                alt={worker.username}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
              />
              {worker.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full border-2 border-white" title="Verified">
                  <svg className="w-3 h-3 text-white m-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>

            {/* Title & Badge */}
            <div className="flex-1 min-w-0 pt-0.5 mt-1">
              <h2 className="text-base font-bold text-gray-900 truncate capitalize leading-tight pr-8 group-hover:text-blue-600 transition-colors">
                {worker.username || "Anonymous"}
              </h2>
              <div className="mt-1.5 flex flex-wrap gap-2">
                 <span className={`inline-flex px-2 py-[3px] text-[10px] font-bold uppercase tracking-widest rounded shadow-sm border ${worker.ability ? "bg-blue-100/60 text-blue-700 border-blue-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}>
                   {worker.ability || "General Work"}
                 </span>
              </div>
            </div>
          </div>
        </div>

        {/* Small Phone Button in Header Corner */}
        <button 
           onClick={() => setShowPhone(true)}
           className="absolute top-4 right-4 w-9 h-9 flex justify-center items-center rounded-full bg-white border border-blue-100 text-blue-500 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 shadow-sm hover:shadow transition-all duration-200 z-10"
           title="Contact Worker"
        >
           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
           </svg>
        </button>
      </div>

      {/* Main Content Body */}
      <div className="p-5 flex-grow font-sans bg-white flex flex-col">
        
        {/* Rate Row */}
        <div className="flex items-center justify-between mb-4 bg-blue-50/50 px-4 py-2.5 rounded-xl border border-blue-100/50">
           <div>
              <p className="text-[10px] text-blue-600/80 font-bold uppercase tracking-widest mb-0.5">Expected Rate</p>
           </div>
           <div className="font-extrabold text-blue-900 text-sm">₹{worker.priceRange || "Negotiable"}</div>
        </div>

        {/* Description */}
        <div className="mb-2 flex-grow">
          <p className="text-[13px] text-gray-500 line-clamp-3 leading-relaxed">
            {worker.bio || "No professional bio provided by this worker yet. Please contact for more details."}
          </p>
        </div>

      </div>

      {/* Modal Overlay */}
      {showPhone && (
        <div 
          onClick={() => setShowPhone(false)}
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-[18rem] text-center border border-blue-100 overflow-hidden transform scale-100 animate-in zoom-in-95 duration-200"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 ring-4 ring-blue-50/50">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            </div>
            <h3 className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">Phone Number</h3>
            <p className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {worker.phoneNumber || "Not Available"}
            </p>
            <button 
              onClick={() => setShowPhone(false)}
              className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkersCard;