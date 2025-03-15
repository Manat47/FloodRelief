
import React from "react";
import { cn } from "@/lib/utils";
import { RequestStatus, MissionStatus } from "@/types";

interface StatusBadgeProps {
  status: RequestStatus | MissionStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "reserved":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "preparing":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "on_way":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "arrived":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "pending":
        return "Pending";
      case "reserved":
        return "Reserved";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      case "preparing":
        return "Preparing";
      case "on_way":
        return "On the way";
      case "arrived":
        return "Arrived";
      default:
        return status;
    }
  };

  return (
    <span
      className={cn(
        "inline-block px-2 py-1 text-xs font-medium rounded border",
        getStatusStyles(),
        className
      )}
    >
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;
