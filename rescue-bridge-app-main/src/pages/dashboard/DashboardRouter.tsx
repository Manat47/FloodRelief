
import React from "react";
import { useAuth } from "@/lib/auth";
import VictimDashboard from "./VictimDashboard";
import OrganizationDashboard from "./OrganizationDashboard";
import RescuerDashboard from "./RescuerDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case "victim":
      return <VictimDashboard />;
    case "organization":
      return <OrganizationDashboard />;
    case "rescuer":
      return <RescuerDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <VictimDashboard />;
  }
};

export default DashboardRouter;
