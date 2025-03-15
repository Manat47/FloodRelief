
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

const VictimDashboard = () => {
  const navigate = useNavigate();

  // Mock data for active requests
  const activeRequests = [
    {
      id: "REQ-001",
      status: "pending" as const,
      location: "123 Flood St, Bangkok",
      createdAt: "2023-10-01T10:00:00Z",
      needs: {
        food: true,
        water: true,
        medicine: false,
        other: false,
      },
    },
    {
      id: "REQ-002",
      status: "in_progress" as const,
      location: "456 River Rd, Bangkok",
      createdAt: "2023-10-02T15:30:00Z",
      needs: {
        food: true,
        water: true,
        medicine: true,
        other: false,
      },
      rescueTeam: "Team Alpha",
      estimatedArrival: "2023-10-05T12:00:00Z",
    },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome!</h1>
        <p className="text-gray-600">
          We're here to support you in this difficult time
        </p>
      </div>

      <div className="mb-8">
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Create a new help request or check the status of your existing requests</h2>
            <div className="grid gap-4">
              <Button
                className="bg-primary hover:bg-primary/90 text-white w-full"
                onClick={() => navigate("/request-help")}
              >
                Create New Request
              </Button>
              <Button
                className="border border-primary bg-white text-primary hover:bg-primary/10 w-full"
                onClick={() => navigate("/requests")}
                variant="outline"
              >
                View My Requests
              </Button>
            </div>
            <p className="text-center text-sm text-blue-600 mt-4">
              You're not alone—help is on the way! 💙
            </p>
          </CardContent>
        </Card>
      </div>

      {activeRequests.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Your Active Requests</h2>
          <div className="space-y-4">
            {activeRequests.map((request) => (
              <Card key={request.id} className="bg-white shadow-sm border-0">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{request.id}</span>
                    <StatusBadge status={request.status} />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {request.location}
                  </p>
                  <div className="flex gap-2 mb-3">
                    {request.needs.food && (
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                        Food
                      </span>
                    )}
                    {request.needs.water && (
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                        Water
                      </span>
                    )}
                    {request.needs.medicine && (
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                        Medicine
                      </span>
                    )}
                  </div>

                  {request.status === "in_progress" && (
                    <div className="border-t pt-2">
                      <p className="text-sm font-medium">
                        Rescue Team: {request.rescueTeam}
                      </p>
                      <p className="text-sm text-gray-600">
                        Estimated arrival:{" "}
                        {new Date(request.estimatedArrival).toLocaleString()}
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full mt-2 text-primary border border-primary bg-white hover:bg-primary/10"
                    variant="outline"
                    onClick={() => navigate(`/requests/${request.id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VictimDashboard;
