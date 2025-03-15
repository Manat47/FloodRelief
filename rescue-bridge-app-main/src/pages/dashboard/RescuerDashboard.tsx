
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Plus, AlertTriangle } from "lucide-react";
import MapComponent from "@/components/common/MapComponent";
import StatusBadge from "@/components/common/StatusBadge";

const RescuerDashboard = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    name: "Somchai",
    isTeamLeader: true,
    team: "A",
  };
  
  // Mock active mission
  const activeMission = {
    id: "RA-001",
    zone: "A",
    location: "Bang Khen, Bangkok",
    peopleCount: 50,
    distance: "10+ km",
    status: "in_progress" as const,
  };
  
  // Mock team members
  const teamMembers = [
    { id: "1", name: "Somchai", isLeader: true },
    { id: "2", name: "Somsak", isLeader: false },
    { id: "3", name: "Somying", isLeader: false },
  ];
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold">Volunteer Dashboard</h1>
        <div className="flex items-center mt-3">
          <Avatar className="h-16 w-16 border">
            <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="font-semibold text-lg">{user.name}</h2>
            <p className="text-sm text-gray-600">
              {user.isTeamLeader ? "Team Leader" : "Team Member"}
            </p>
          </div>
        </div>
      </div>
      
      {activeMission && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Current Mission</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">Request #{activeMission.id}</p>
                    <StatusBadge status={activeMission.status} />
                  </div>
                  <p className="text-sm">Zone {activeMission.zone} (Team A)</p>
                  <p className="text-sm flex items-center">
                    <MapPin className="w-3 h-3 mr-1" /> {activeMission.location}
                  </p>
                  <p className="text-sm">People affected: {activeMission.peopleCount}</p>
                  <p className="text-sm">Distance: {activeMission.distance}</p>
                  <Button 
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700" 
                    onClick={() => navigate(`/missions/${activeMission.id}`)}
                  >
                    View Mission Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Map</h2>
        <MapComponent readOnly />
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Team Members</h2>
        <div className="flex overflow-x-auto gap-2 py-2">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="flex-shrink-0 flex flex-col items-center"
            >
              <Avatar className="h-12 w-12 border">
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs mt-1">
                {member.isLeader ? "Leader" : ""}
              </span>
            </div>
          ))}
          <button className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Plus className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Step Indicator</h2>
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded">
            <div className="h-2 bg-primary rounded w-1/4"></div>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span className="text-primary font-medium">Preparing</span>
            <span className="text-gray-500">On Way</span>
            <span className="text-gray-500">Arrived</span>
            <span className="text-gray-500">Completed</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => navigate("/team-members")}
        >
          View Team
        </Button>
        <Button 
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
          onClick={() => navigate("/notifications")}
        >
          Notifications
        </Button>
      </div>
    </div>
  );
};

export default RescuerDashboard;
