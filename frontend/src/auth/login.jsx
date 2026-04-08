import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import API from "../api/Api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    customId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [useEmail, setUseEmail] = useState(true); // toggle login type

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if ((!form.email && !form.customId) || !form.password) {
      return setError("Please fill required fields");
    }

    setLoading(true);

    try {
      const payload = {
        password: form.password,
        ...(useEmail ? { email: form.email } : { customId: form.customId }),
      };

      const res = await API.post("/auth/login", payload);

      console.log("✅ Login Success:", res.data);

      // 🔥 Redirect after login
      navigate("/");

    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8 space-y-5"
      >
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">
            Login to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-2 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Toggle */}
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setUseEmail(true)}
            className={`px-3 py-1 rounded-full text-sm ${
              useEmail ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setUseEmail(false)}
            className={`px-3 py-1 rounded-full text-sm ${
              !useEmail ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Custom ID
          </button>
        </div>

        {/* Email / Custom ID */}
        <div className="flex items-center gap-2 border rounded-xl px-3 focus-within:ring-2 focus-within:ring-blue-500">
          {useEmail ? <Mail size={18} /> : <User size={18} />}
          <input
            type="text"
            name={useEmail ? "email" : "customId"}
            placeholder={useEmail ? "Enter Email" : "Enter Custom ID"}
            value={useEmail ? form.email : form.customId}
            onChange={handleChange}
            className="w-full p-2 outline-none bg-transparent"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-2 border rounded-xl px-3 focus-within:ring-2 focus-within:ring-blue-500">
          <Lock size={18} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 outline-none bg-transparent"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;