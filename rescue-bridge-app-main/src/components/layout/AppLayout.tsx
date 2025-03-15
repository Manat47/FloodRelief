
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import BottomNavigation from "./BottomNavigation";
import { Loader2 } from "lucide-react";

const AppLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-sm">
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default AppLayout;
