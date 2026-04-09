import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import API from "../api/Api";

const VerifyPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const hasTriggered = useRef(false);

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    const verifyUser = async () => {
      try {
        const res = await API.get(`/auth/verification/${token}`);
        setStatus("success");
        setMessage(res.data.message);

        // redirect after 2 sec
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed");
      }
    };

    verifyUser();
  }, [token, navigate]);

  return (
    <div className="premium-page flex items-center justify-center px-4 py-12">
      <div className="premium-card-strong fade-slide max-w-md w-full space-y-5 p-8 text-center">
        <div className="flex justify-center">
          {status === "loading" && (
            <Loader className="animate-spin text-blue-600" size={40} />
          )}
          {status === "success" && (
            <CheckCircle className="text-green-500" size={50} />
          )}
          {status === "error" && <XCircle className="text-red-500" size={50} />}
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900">
          {status === "loading" && "Verifying..."}
          {status === "success" && "Verification Successful 🎉"}
          {status === "error" && "Verification Failed"}
        </h2>

        <p className="text-sm text-slate-600">{message}</p>

        {status === "success" && (
          <button
            onClick={() => navigate("/login")}
            className="premium-button w-full rounded-lg bg-emerald-500 py-2 text-white hover:bg-emerald-600"
          >
            Go to Login
          </button>
        )}

        {status === "error" && (
          <button
            onClick={() => navigate("/register")}
            className="premium-button w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
