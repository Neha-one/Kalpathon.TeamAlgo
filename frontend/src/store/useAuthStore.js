import { create } from "zustand";
import API from "../api/Api.js";

const getErrorMessage = (error, fallback) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.errors ||
    error?.message ||
    fallback
  );
};

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: "",
  success: "",

  clearMessages: () => set({ error: "", success: "" }),

  register: async (formData) => {
    set({ isLoading: true, error: "", success: "" });
    try {
      const res = await API.post("/auth/register", formData);
      const message = res?.data?.message || "User registered successfully";
      const verificationToken = res?.data?.data?.VerificationToken || "";

      set({ isLoading: false, success: message });
      return { ok: true, verificationToken, response: res.data };
    } catch (error) {
      const message = getErrorMessage(error, "Registration failed");
      set({ isLoading: false, error: message });
      return { ok: false, message };
    }
  },

  login: async (payload) => {
    set({ isLoading: true, error: "", success: "" });
    try {
      const res = await API.post("/auth/login", payload);
      const userData = res?.data?.data || null;

      set({
        user: userData,
        token: userData?.accessToken || null,
        isAuthenticated: true,
        isLoading: false,
        success: res?.data?.message || "Login successful",
      });

      return { ok: true, user: userData, response: res.data };
    } catch (error) {
      const message = getErrorMessage(error, "Login failed");
      set({ isLoading: false, isAuthenticated: false, error: message });
      return { ok: false, message };
    }
  },

  verifyEmail: async (token) => {
    set({ isLoading: true, error: "", success: "" });
    try {
      const res = await API.get(`/auth/verification/${token}`);
      set({
        isLoading: false,
        success: res?.data?.message || "Email verified",
      });
      return { ok: true, response: res.data };
    } catch (error) {
      const message = getErrorMessage(error, "Verification failed");
      set({ isLoading: false, error: message });
      return { ok: false, message };
    }
  },

  logout: async () => {
    set({ isLoading: true, error: "", success: "" });
    try {
      const res = await API.post("/auth/logout");
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        success: res?.data?.message || "Logged out",
      });
      return { ok: true };
    } catch (error) {
      const message = getErrorMessage(error, "Logout failed");
      set({ isLoading: false, error: message });
      return { ok: false, message };
    }
  },

  checkAuth: async () => {
    set({ isLoading: true, error: "" });
    try {
      const res = await API.get("/user/checkauth");
      const userData = res?.data?.data || null;
      set({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });
      return { ok: true, user: userData };
    } catch (_error) {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return { ok: false };
    }
  },
}));
