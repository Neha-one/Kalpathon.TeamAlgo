import React from "react";
import { MailCheck } from "lucide-react";

const VerifyPage_1 = () => {
  return (
    <div className="premium-page flex items-center justify-center px-4 py-12">
      <div className="premium-card-strong fade-slide max-w-md w-full space-y-6 p-8 text-center">
        <div className="flex justify-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-100 text-blue-700">
            <MailCheck size={34} />
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900">
          Verify Your Email 📩
        </h2>

        <p className="text-sm leading-relaxed text-slate-600">
          We have sent a verification link to your email address.
          <br />
          Please check your inbox and click the link to activate your account.
        </p>

        <div className="rounded-xl bg-blue-50 px-3 py-2 text-xs text-slate-500">
          Didn’t receive the email? Check your spam folder.
        </div>
      </div>
    </div>
  );
};

export default VerifyPage_1;
