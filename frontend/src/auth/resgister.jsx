import React, { useState } from "react";
import axios from "axios";
import { User, Mail, Lock, Briefcase } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    customId: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    userProfession: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form,
        { withCredentials: true } // IMPORTANT for cookies
      );

      alert(res.data.message);
      console.log(res.data);

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Create Account
        </h2>

        {/* Username */}
        <div className="flex items-center border rounded-lg px-3">
          <User size={18} />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 outline-none"
            onChange={handleChange}
            required
          />
        </div>

        {/* Custom ID */}
        <input
          type="text"
          name="customId"
          placeholder="Custom ID"
          className="w-full border p-2 rounded-lg"
          onChange={handleChange}
          required
        />

        {/* Email */}
        <div className="flex items-center border rounded-lg px-3">
          <Mail size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 outline-none"
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-lg px-3">
          <Lock size={18} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 outline-none"
            onChange={handleChange}
            required
          />
        </div>

        {/* Profession */}
        <div className="flex items-center border rounded-lg px-3">
          <Briefcase size={18} />
          <select
            name="userProfession"
            className="w-full p-2 outline-none"
            onChange={handleChange}
            required
          >
            <option value="">Register as</option>
            <option value="user">User</option>
            <option value="worker">Worker</option>
            
          </select>
        </div>

        {/* Gender */}
        <select
          name="gender"
          className="w-full border p-2 rounded-lg"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* DOB */}
        <input
          type="date"
          name="dateOfBirth"
          className="w-full border p-2 rounded-lg"
          onChange={handleChange}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Register;