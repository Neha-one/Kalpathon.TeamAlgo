import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Briefcase, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

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
    priceRange: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const register = useAuthStore((state) => state.register);

  const abilityOptions = [
    "plumbers",
    "tutors",
    "electricians",
    "delivery agents",
  ];

  const priceRangeOptions = ["500-1000", "1000-5000", "5000-10000", "10000+"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "userProfession" && value !== "worker") {
        next.ability = "";
        next.priceRange = "";
        next.phoneNumber = "";
      }

      return next;
    });
    setError("");
  };

  const validateForm = () => {
    if (!form.customId.trim()) return "Custom ID is required";
    if (!form.username.trim()) return "Username is required";
    if (!form.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      return "Please enter a valid email";
    if (!form.password || form.password.length < 6)
      return "Password must be at least 6 characters";
    if (!form.userProfession) return "Please select Worker or Customer";
    if (
      form.userProfession === "worker" &&
      !form.ability &&
      !form.priceRange &&
      !form.phoneNumber.trim()
    )
      return "For workers, add ability or price range or phone number";

    if (!form.dateOfBirth) return "Date of Birth is required";
    const today = new Date();
    const birthDate = new Date(form.dateOfBirth);
    if (birthDate > today) return "Date of Birth cannot be in the future.";
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 14) return "You must be at least 14 years old to register.";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) return setError(validationError);

    setLoading(true);

    try {
      const payload = {
        customId: form.customId.trim().toLowerCase(),
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        gender: form.gender || undefined,
        dateOfBirth: form.dateOfBirth || undefined,
        userProfession: form.userProfession,
        ability: form.userProfession === "worker" ? form.ability : undefined,
        priceRange:
          form.userProfession === "worker" ? form.priceRange : undefined,
        phoneNumber:
          form.userProfession === "worker"
            ? form.phoneNumber.trim() || undefined
            : undefined,
      };

      const result = await register(payload);
      if (!result.ok) {
        setError(result.message || "Registration failed");
        return;
      }

      navigate(`/verify/${result.verificationToken}`);
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
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
        <div className="text-center space-y-1">
          <h2 className="premium-section-title text-[2rem]">Create Account</h2>
          <p className="premium-subtitle">Join as a worker or customer</p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {[
          {
            icon: <User size={18} />,
            name: "username",
            placeholder: "Username",
          },
          {
            icon: <Mail size={18} />,
            name: "email",
            placeholder: "Email",
            type: "email",
          },
        ].map((field) => (
          <div
            key={field.name}
            className="premium-input flex items-center gap-2 px-3 transition"
          >
            <span className="text-slate-500">{field.icon}</span>
            <input
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              className="w-full bg-transparent p-2.5 text-sm outline-none"
              required
            />
          </div>
        ))}

        <div className="premium-input flex items-center gap-2 px-3 transition">
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

        <input
          type="text"
          name="customId"
          placeholder="Custom ID"
          value={form.customId}
          onChange={handleChange}
          className="premium-input p-2.5 text-sm"
        />

        <div className="premium-input flex items-center gap-2 px-3">
          <Briefcase size={18} className="text-slate-500" />
          <select
            name="userProfession"
            value={form.userProfession}
            onChange={handleChange}
            className="w-full bg-transparent p-2.5 text-sm outline-none"
          >
            <option value="">Register as</option>
            <option value="worker">Worker</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        {form.userProfession === "worker" && (
          <div className="premium-card rounded-xl p-3 grid grid-cols-1 gap-3">
            <select
              name="ability"
              value={form.ability}
              onChange={handleChange}
              className="premium-input p-2.5 text-sm"
            >
              <option value="">Select your profession</option>
              {abilityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <select
              name="priceRange"
              value={form.priceRange}
              onChange={handleChange}
              className="premium-input p-2.5 text-sm"
            >
              <option value="">Select your price range</option>
              {priceRangeOptions.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>

            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              className="premium-input p-2.5 text-sm outline-none"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="premium-input p-2.5 text-sm"
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            className="premium-input p-2.5 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="premium-button premium-button-primary w-full py-3"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold text-blue-700 hover:underline"
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
