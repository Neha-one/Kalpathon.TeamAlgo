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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8 space-y-5"
      >
        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm">Join as a worker or customer</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-2 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Input UI Helper */}
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
            className="flex items-center gap-2 border rounded-xl px-3 focus-within:ring-2 focus-within:ring-blue-500 transition"
          >
            {field.icon}
            <input
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              className="w-full p-2 outline-none bg-transparent"
              required
            />
          </div>
        ))}

        <div className="flex items-center gap-2 border rounded-xl px-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <Lock size={18} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 outline-none bg-transparent"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Custom ID */}
        <input
          type="text"
          name="customId"
          placeholder="Custom ID"
          value={form.customId}
          onChange={handleChange}
          className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Role */}
        <div className="flex items-center gap-2 border rounded-xl px-3 focus-within:ring-2 focus-within:ring-blue-500">
          <Briefcase size={18} />
          <select
            name="userProfession"
            value={form.userProfession}
            onChange={handleChange}
            className="w-full p-2 outline-none bg-transparent"
          >
            <option value="">Register as</option>
            <option value="worker">Worker</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        {/* Ability */}
        {form.userProfession === "worker" && (
          <div className="grid grid-cols-1 gap-3">
            <select
              name="ability"
              value={form.ability}
              onChange={handleChange}
              className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-blue-500"
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
              className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-blue-500"
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
              className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}

        {/* Gender + DOB */}
        <div className="grid grid-cols-2 gap-3">
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border rounded-xl p-2 focus:ring-2 focus:ring-blue-500"
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
            className="border rounded-xl p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
