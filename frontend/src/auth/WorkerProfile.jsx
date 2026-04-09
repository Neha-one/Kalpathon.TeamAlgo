import React, { useEffect, useState } from "react";
import API from "../api/Api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  Mail,
  Phone,
  User,
  Calendar,
  IndianRupee,
  BriefcaseBusiness,
  Quote,
  ArrowLeft
} from "lucide-react";

const WorkerProfile = () => {
  const { customId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const { data } = await API.get(`/user/userprofile/${customId}`);
      const user = data?.data?.user || data?.user || data;
      setProfile(user);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [customId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-red-500">
        <p className="text-xl font-semibold">{error}</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition shadow-sm font-medium flex items-center gap-2">
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto mb-6">
        <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-900 flex items-center gap-2 font-medium transition-colors">
           <ArrowLeft size={16} /> Back to Workers
        </button>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header Actions */}
        <div className="h-16 bg-white relative overflow-hidden">
        </div>

        <div className="px-6 md:px-12 pb-12 pt-2">
          {/* Profile Picture & Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center mb-8 sm:space-x-6 z-10 relative">
              <div className="relative shrink-0">
                {profile.profilePicture ? (
                  <img
                    src={profile.profilePicture}
                    alt={profile.username}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-md bg-white block"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-md bg-slate-100 flex items-center justify-center text-4xl sm:text-5xl font-bold text-slate-400">
                    {profile.username?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
              </div>

              <div className="mt-4 sm:mt-0 text-center sm:text-left flex-1 pb-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {profile.username}
                </h1>
                <p className="text-slate-500 font-medium tracking-wide mt-1">@{profile.customId}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg uppercase tracking-wider border border-blue-100/50">
                  <User size={14} />
                  {profile.userProfession || "User"}
                </div>
              </div>
            </div>

            <hr className="my-8 border-slate-100" />

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Column - Contact & Personal details */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" /> Contact Info
                  </h3>
                  <div className="bg-white rounded-2xl p-5 space-y-4 border border-slate-100 shadow-sm">
                    <div className="flex flex-col text-slate-700">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</span>
                      <span className="font-medium truncate text-slate-900">{profile.email}</span>
                    </div>
                    
                    <hr className="border-slate-50" />
                    
                    <div className="flex flex-col text-slate-700">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number</span>
                      {(profile.phoneNumber && profile.phoneNumber.trim() !== "") ? (
                        <span className="font-medium text-slate-900 flex items-center gap-2">
                           {profile.phoneNumber}
                        </span>
                      ) : (
                         <span className="text-slate-400 text-sm italic">Not provided</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" /> Personal
                  </h3>
                  <div className="bg-white rounded-2xl p-5 space-y-4 border border-slate-100 shadow-sm">
                    <div className="flex flex-col text-slate-700">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Gender</span>
                      {profile.gender ? (
                        <span className="font-medium capitalize text-slate-900">{profile.gender}</span>
                      ) : (
                        <span className="text-slate-400 text-sm italic">Not specified</span>
                      )}
                    </div>
                    
                    <hr className="border-slate-50" />

                    <div className="flex flex-col text-slate-700">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Date of Birth</span>
                      {profile.dateOfBirth ? (
                        <span className="font-medium text-slate-900">{new Date(profile.dateOfBirth).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})}</span>
                      ) : (
                        <span className="text-slate-400 text-sm italic">Not specified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Bio & Professional */}
              <div className="lg:col-span-3 space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Quote size={16} className="text-slate-400" /> About 
                  </h3>
                  {profile.bio && profile.bio.trim() !== "" ? (
                    <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 leading-relaxed border-l-4 border-slate-900 text-[15px]">
                      {profile.bio}
                    </div>
                  ) : (
                    <div className="text-slate-400 text-sm italic bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                      No bio written yet.
                    </div>
                  )}
                </div>

                {profile.userProfession === "worker" && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <BriefcaseBusiness size={16} className="text-slate-400" /> Professional Details
                    </h3>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/30 rounded-2xl p-6 border border-blue-100/50 shadow-sm flex flex-col sm:flex-row gap-6">
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1 block">Specialization</span>
                        {profile.ability && profile.ability.trim() !== "" ? (
                          <span className="text-lg font-bold text-slate-900 capitalize block mt-1">
                            {profile.ability}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm italic mt-1 block">Not specified</span>
                        )}
                      </div>
                      
                      <div className="hidden sm:block w-px bg-blue-200/50"></div>
                      <div className="sm:hidden h-px w-full bg-blue-200/50 my-2"></div>
                      
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1 block">Service Rate</span>
                        {profile.priceRange && profile.priceRange.trim() !== "" ? (
                          <span className="text-2xl font-black text-green-700 flex items-center gap-1 mt-1">
                            ₹{profile.priceRange}
                          </span>
                        ) : (
                           <span className="text-slate-400 text-sm italic mt-1 block">Not specified</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default WorkerProfile;
