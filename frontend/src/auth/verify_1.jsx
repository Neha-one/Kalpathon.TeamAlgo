import React from "react";
import { MailCheck } from "lucide-react";

const VerifyPage_1 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        
        {/* Icon */}
        <div className="flex justify-center">
          <MailCheck size={50} className="text-blue-600" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          Verify Your Email 📩
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-sm leading-relaxed">
          We have sent a verification link to your email address.
          <br />
          Please check your inbox and click the link to activate your account.
        </p>

        {/* Tips */}
        <div className="text-xs text-gray-500">
          Didn’t receive the email? Check your spam folder.
        </div>

      </div>
    </div>
  );
};

export default VerifyPage_1;