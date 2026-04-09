import React, { useEffect, useState } from "react";
import API from "../api/Api";
import { Link } from "react-router-dom";
import { 
  Camera, 
  Edit2, 
  Save, 
  X,
  Mail,
  Phone,
  User,
  Calendar,
  IndianRupee,
  BriefcaseBusiness,
  Quote
} from "lucide-react";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/user/me");
      const user = data?.data?.user || data?.user || data;
      setProfile(user);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile. Please login.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setFormData({
      username: profile.username || "",
      customId: profile.customId || "",
      bio: profile.bio || "",
      phoneNumber: profile.phoneNumber || "",
      gender: profile.gender || "",
      dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split("T")[0] : "",
      ability: profile.ability || "",
      priceRange: profile.priceRange || "",
    });
    setImageFile(null);
    setImagePreview(profile.profilePicture || null);
    setUpdateError("");
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError("");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== undefined && formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });
      if (imageFile) {
        data.append("profilePicture", imageFile);
      }

      // the route expects :userIdFromParams
      const res = await API.put(`/user/bioupdate/${profile._id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedProfile = res.data?.data || res.data;
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setUpdateError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setUpdateLoading(false);
    }
  };

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
        <Link to="/login" className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition shadow-sm font-medium">
          Go to Login
        </Link>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header Actions */}
        <div className="h-16 bg-white relative overflow-hidden">
          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="absolute top-4 right-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2 transition text-sm font-semibold z-10 shadow-sm"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          /* EDIT MODE */
          <form onSubmit={handleUpdate} className="px-6 md:px-12 pb-12 pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 sm:space-x-6 z-10 relative">
              <div className="relative group cursor-pointer shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-md bg-white block"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-md bg-slate-100 flex items-center justify-center text-4xl sm:text-5xl font-bold text-slate-400">
                    {profile.username?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <label className="absolute inset-0 bg-slate-900/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                  <Camera className="w-8 h-8 mb-1" />
                  <span className="text-xs font-semibold">Change</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="mt-4 sm:mt-0 w-full text-center sm:text-left text-sm text-slate-500 font-medium pt-2">
                Update your profile picture and personal details.
              </div>
            </div>

            {updateError && (
              <div className="bg-red-50/50 text-red-600 p-4 rounded-xl mb-8 border border-red-100 text-sm font-medium flex items-center">
                <span className="mr-2">⚠️</span> {updateError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Custom ID <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="customId"
                    value={formData.customId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium text-slate-900"
                    placeholder="+91 0000000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium text-slate-900 appearance-none cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {profile.userProfession === "worker" && (
                  <div className="flex flex-col sm:flex-row gap-5">
                      <div className="w-full">
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ability</label>
                      <select
                          name="ability"
                          value={formData.ability}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium text-slate-900 appearance-none bg-white"
                      >
                        <option value="">Select Ability</option>
                        <option value="plumbers">Plumber</option>
                        <option value="tutors">Tutor</option>
                        <option value="electricians">Electrician</option>
                        <option value="delivery agents">Delivery Agent</option>
                      </select>
                      </div>
                      <div className="w-full">
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price (₹)</label>
                      <select
                          name="priceRange"
                          value={formData.priceRange}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium text-slate-900 appearance-none bg-white"
                      >
                        <option value="">Select Price Range</option>
                        <option value="500-1000">₹500 - ₹1000</option>
                        <option value="1000-5000">₹1000 - ₹5000</option>
                        <option value="5000-10000">₹5000 - ₹10,000</option>
                        <option value="10000+">₹10,000+</option>
                      </select>
                      </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium text-slate-900 resize-none"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-4 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2 transition-all focus:ring-2 focus:ring-slate-200 outline-none"
                disabled={updateLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 flex items-center gap-2 shadow-sm focus:ring-2 focus:ring-slate-900/40 focus:ring-offset-2 outline-none transition-all"
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <><Save size={18} /> Save Details</>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* VIEW MODE */
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
                    <Quote size={16} className="text-slate-400" /> About Me
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
        )}
      </div>
    </div>
  );
};

export default UserProfile;
