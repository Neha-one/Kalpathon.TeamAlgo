import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Briefcase } from "lucide-react";
import API from "../api/Api.js";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customId: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    userProfession: "",
    ability: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const abilityOptions = [
    "plumbers",
    "tutors",
    "electricians",
    "delivery agents",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!form.customId.trim()) return "Custom ID is required";
    if (!form.username.trim()) return "Username is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.password || form.password.length < 6)
      return "Password must be at least 6 characters";
    if (!form.userProfession) return "Please select Worker or Customer";
    if (form.userProfession === "worker" && !form.ability)
      return "Workers must select their profession";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/register", form);
      console.log("✅ Registration Success:", res.data);

      // 🔥 Redirect to verify page with token
      navigate(`/verify/${res.data.data.VerificationToken}`);
    } catch (err) {
      console.error("❌ API Error:", err.response?.data || err.message);
      const message =
        err.response?.data?.message ||
        (err.code === "ECONNABORTED"
          ? "Server timeout. Please check backend and database."
          : !err.response
            ? "Cannot connect to backend. Start backend server on port 3000."
            : "Registration failed. Please try again.");
      setError(message);
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <div className="flex items-center border rounded-lg px-3">
          <User size={18} />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 outline-none"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="customId"
          placeholder="Custom ID"
          className="w-full border p-2 rounded-lg"
          value={form.customId}
          onChange={handleChange}
          required
        />

        <div className="flex items-center border rounded-lg px-3">
          <Mail size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 outline-none"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center border rounded-lg px-3">
          <Lock size={18} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 outline-none"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center border rounded-lg px-3">
          <Briefcase size={18} />
          <select
            name="userProfession"
            className="w-full p-2 outline-none"
            value={form.userProfession}
            onChange={handleChange}
            required
          >
            <option value="">Register as</option>
            <option value="worker">Worker</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        {form.userProfession === "worker" && (
          <select
            name="ability"
            className="w-full border p-2 rounded-lg"
            value={form.ability}
            onChange={handleChange}
            required
          >
            <option value="">Select your profession</option>
            {abilityOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
        )}

        <select
          name="gender"
          className="w-full border p-2 rounded-lg"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="date"
          name="dateOfBirth"
          className="w-full border p-2 rounded-lg"
          value={form.dateOfBirth}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Register;
