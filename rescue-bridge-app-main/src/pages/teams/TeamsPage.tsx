
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Plus, User } from "lucide-react";
import { useAuth } from "@/lib/auth";

const TeamsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock team data
  const teams = [
    {
      id: "A",
      name: "Rescue Team Alpha",
      members: 5,
      lead: "Somchai",
      status: "Active",
      location: "Zone A, Bangkok",
    },
    {
      id: "B",
      name: "Medical Response Team",
      members: 3,
      lead: "Somsak",
      status: "On Standby",
      location: "Headquarters",
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Teams</h1>
        {user?.role === 'organization' && (
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-1" /> Create Team
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {teams.map((team) => (
          <Card key={team.id} className="border-0 shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">{team.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">ID: {team.id}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm flex items-center gap-1">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{team.members}</span> members
                    </p>
                    <p className="text-sm">Lead: {team.lead}</p>
                    <p className="text-sm">Status: <span className="font-medium">{team.status}</span></p>
                    <p className="text-sm">Location: {team.location}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-primary border-primary hover:bg-primary/10"
                  onClick={() => navigate(`/teams/${team.id}`)}
                >
                  View Details
                </Button>
                {user?.role === 'organization' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    Manage Members
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teams.length === 0 && (
        <div className="text-center py-10">
          <Users className="h-12 w-12 mx-auto text-gray-300" />
          <h3 className="mt-2 text-xl font-medium">No Teams Found</h3>
          <p className="text-gray-500 mt-1">There are no teams available to display.</p>
          {user?.role === 'organization' && (
            <Button className="mt-4 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-1" /> Create a Team
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
