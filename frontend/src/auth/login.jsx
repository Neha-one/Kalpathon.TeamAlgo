import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

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
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);

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

      const result = await login(payload);

      if (!result.ok) {
        setError(result.message || "Login failed");
        return;
      }

      console.log("✅ Login Success:", result.response);

      // 🔥 Redirect after login
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-page flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="premium-card-strong fade-slide w-full max-w-md p-8 space-y-5"
      >
        <div className="text-center">
          <h2 className="premium-section-title text-[2rem]">Welcome Back</h2>
          <p className="premium-subtitle mt-1">Login to your account</p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex justify-center gap-2 rounded-xl bg-slate-100 p-1.5">
          <button
            type="button"
            onClick={() => setUseEmail(true)}
            className={`premium-button w-1/2 px-3 py-2 rounded-lg text-sm ${
              useEmail
                ? "bg-linear-to-r from-blue-600 to-indigo-700 text-white"
                : "bg-transparent text-slate-600"
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setUseEmail(false)}
            className={`premium-button w-1/2 px-3 py-2 rounded-lg text-sm ${
              !useEmail
                ? "bg-linear-to-r from-blue-600 to-indigo-700 text-white"
                : "bg-transparent text-slate-600"
            }`}
          >
            Custom ID
          </button>
        </div>

        <div className="premium-input flex items-center gap-2 px-3">
          {useEmail ? (
            <Mail size={18} className="text-slate-500" />
          ) : (
            <User size={18} className="text-slate-500" />
          )}
          <input
            type="text"
            name={useEmail ? "email" : "customId"}
            placeholder={useEmail ? "Enter Email" : "Enter Custom ID"}
            value={useEmail ? form.email : form.customId}
            onChange={handleChange}
            className="w-full bg-transparent p-2.5 text-sm outline-none"
            required
          />
        </div>

        <div className="premium-input flex items-center gap-2 px-3">
          <Lock size={18} className="text-slate-500" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-transparent p-2.5 text-sm outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-slate-500 hover:text-slate-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="premium-button premium-button-primary w-full py-3"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-slate-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer font-semibold text-blue-700 hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
