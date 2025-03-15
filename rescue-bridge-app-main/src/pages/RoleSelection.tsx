
import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Building2, Ambulance, UserCircle, ArrowRight } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    navigate(`/auth/${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex-1 max-w-md mx-auto w-full p-6 bg-white shadow-sm rounded-lg my-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3 text-gray-900">Flood Relief</h1>
          <p className="text-gray-600 text-lg">Select your role to get started</p>
        </div>

        <div className="space-y-4">
          <button
            className="role-button group"
            onClick={() => handleRoleSelect("victim")}
          >
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-2 group-hover:bg-red-200 transition-colors">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1 text-left">
              <span className="block font-medium text-gray-900">Flood Victim</span>
              <span className="text-sm text-gray-500">Request assistance during flooding</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            className="role-button group"
            onClick={() => handleRoleSelect("organization")}
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-2 group-hover:bg-blue-200 transition-colors">
              <Building2 className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1 text-left">
              <span className="block font-medium text-gray-900">Relief Organization</span>
              <span className="text-sm text-gray-500">Coordinate rescue and relief efforts</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            className="role-button group"
            onClick={() => handleRoleSelect("rescuer")}
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-2 group-hover:bg-green-200 transition-colors">
              <Ambulance className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1 text-left">
              <span className="block font-medium text-gray-900">Rescue Volunteer</span>
              <span className="text-sm text-gray-500">Join rescue missions and provide help</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            className="role-button group"
            onClick={() => handleRoleSelect("admin")}
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-2 group-hover:bg-purple-200 transition-colors">
              <UserCircle className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex-1 text-left">
              <span className="block font-medium text-gray-900">Administrator</span>
              <span className="text-sm text-gray-500">Manage the platform and oversee operations</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-sm text-gray-500">
            Join the effort to provide relief during flood emergencies
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
