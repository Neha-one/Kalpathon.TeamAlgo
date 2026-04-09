import React from "react";
import { AlertTriangle } from "lucide-react";

const Notice = () => {
  return (
    <div className="premium-page flex items-center justify-center px-4 py-12">
      <div className="premium-card-strong fade-slide max-w-md w-full space-y-5 border-yellow-100 p-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-2xl bg-yellow-100 p-3">
            <AlertTriangle className="text-yellow-600" size={32} />
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900">
          Service Update In Progress
        </h2>

        <p className="text-sm leading-relaxed text-slate-600">
          Our platform is currently under production. We sincerely apologize for
          any inconvenience you may face.
          <br />
          <br />
          We are working hard to bring you a smooth and reliable experience.
        </p>

        <p className="rounded-xl bg-yellow-50 px-3 py-2 text-xs text-slate-500">
          Thank you for your patience.
        </p>
      </div>
    </div>
  );
};

export default Notice;
