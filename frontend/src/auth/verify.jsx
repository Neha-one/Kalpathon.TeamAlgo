import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import API from "../api/Api";

const VerifyPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await API.get(`/auth/verify/${token}`);
        setStatus("success");
        setMessage(res.data.message);

        // redirect after 2 sec
        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.message || "Verification failed"
        );
      }
    };

    verifyUser();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-5">
        
        {/* Icon */}
        <div className="flex justify-center">
          {status === "loading" && (
            <Loader className="animate-spin text-blue-600" size={40} />
          )}
          {status === "success" && (
            <CheckCircle className="text-green-500" size={50} />
          )}
          {status === "error" && (
            <XCircle className="text-red-500" size={50} />
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold">
          {status === "loading" && "Verifying..."}
          {status === "success" && "Verification Successful 🎉"}
          {status === "error" && "Verification Failed"}
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-sm">{message}</p>

        {/* Action Buttons */}
        {status === "success" && (
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
          >
            Go to Login
          </button>
        )}

        {status === "error" && (
          <button
            onClick={() => navigate("/register")}
            className="w-full py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;