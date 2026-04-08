import React from "react";
import { AlertTriangle } from "lucide-react";

const Notice = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 px-4">
      
      <div className="max-w-md w-full bg-white/80 backdrop-blur-lg border border-yellow-200 rounded-2xl shadow-xl p-8 text-center space-y-5">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-yellow-100 p-3 rounded-full">
            <AlertTriangle className="text-yellow-600" size={32} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          🚧 Website Under Development
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-sm leading-relaxed">
          Our platform is currently under production.  
          We sincerely apologize for any inconvenience you may face.
          <br /><br />
          We are working hard to bring you a smooth and reliable experience.
        </p>

        {/* Footer */}
        <p className="text-xs text-gray-500">
          Thank you for your patience 🙏
        </p>

      </div>
    </div>
  );
};

export default Notice;