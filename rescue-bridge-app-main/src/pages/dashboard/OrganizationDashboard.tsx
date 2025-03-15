
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, CheckCircle, Clock, Users } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

const OrganizationDashboard = () => {
  const navigate = useNavigate();

  // Mock stats
  const stats = {
    totalRequests: 50,
    inProgress: 20,
    completed: 30,
  };

  // Mock request data
  const requests = [
    {
      id: "A",
      cases: 10,
      status: "pending" as const,
    },
    {
      id: "B",
      cases: 5,
      needs: {
        food: 0,
        water: 5,
        medicine: 7,
      },
      status: "in_progress" as const,
    },
  ];

  // Mock team data
  const teams = [
    {
      id: "A",
      members: 5,
      status: "Active - Working on Request B",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Request Overview</h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <BarChart className="w-5 h-5 text-gray-500 mr-2" />
                <span className="font-medium">Total Requests:</span>
                <span className="ml-auto">{stats.totalRequests}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                <span className="font-medium">In Progress:</span>
                <span className="ml-auto">{stats.inProgress}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-medium">Completed:</span>
                <span className="ml-auto">{stats.completed}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Request list</h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-start">
                  <div>
                    <p className="font-medium">Request Zone {request.id}:</p>
                    <p className="text-sm">- Contains {request.cases} cases</p>
                    <p className="text-sm flex items-center">
                      - Status: <StatusBadge status={request.status} className="ml-1" />
                    </p>
                    {request.needs && (
                      <p className="text-sm">
                        - Needs: {request.needs.water ? `${request.needs.water} water packages, ` : ""}
                        {request.needs.medicine ? `${request.needs.medicine} medicine kits` : ""}
                      </p>
                    )}
                  </div>
                </div>
                <Button 
                  variant="link" 
                  className="text-blue-500 p-0 h-auto text-sm"
                  onClick={() => navigate(`/organization/zones/${request.id}/requests`)}
                >
                  [ View Details ]
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Manage team</h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-4">
            {teams.map((team) => (
              <div key={team.id} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Team {team.id}:</p>
                    <p className="text-sm">- Status: {team.status}</p>
                  </div>
                </div>
                <Button 
                  variant="link" 
                  className="text-blue-500 p-0 h-auto text-sm"
                  onClick={() => navigate(`/teams/${team.id}`)}
                >
                  [ View Details ]
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => navigate("/request-list")}
          className="bg-primary hover:bg-primary/90"
        >
          View All Requests
        </Button>
        <Button
          onClick={() => navigate("/manage-teams")} 
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
        >
          Manage Teams
        </Button>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
