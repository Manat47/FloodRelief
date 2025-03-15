
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Check, X, Info } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Mock organization applications
  const pendingOrganizations = [
    {
      id: "ORG-001",
      name: "Bangkok Relief Foundation",
      status: "pending",
      submittedDate: "2023-09-27T13:45:00Z",
    },
    {
      id: "ORG-002",
      name: "Thailand Flood Response",
      status: "pending",
      submittedDate: "2023-09-30T10:22:00Z",
    },
  ];
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Organization Applications</h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            {pendingOrganizations.length > 0 ? (
              <div className="space-y-4">
                {pendingOrganizations.map((org) => (
                  <div key={org.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div 
                      className="flex items-start cursor-pointer" 
                      onClick={() => navigate(`/admin/organizations/${org.id}/details`)}
                    >
                      <Building2 className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{org.name}</span>
                          <span className="text-sm text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">
                            Pending
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Submitted: {new Date(org.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-3 gap-2">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => navigate(`/admin/organizations/${org.id}/approve`)}
                      >
                        <Check className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={() => navigate(`/admin/organizations/${org.id}/reject`)}
                      >
                        <X className="w-4 h-4 mr-1" /> Reject
                      </Button>
                      <Button
                        variant="outline"
                        className="w-10 p-0 flex-none"
                        onClick={() => navigate(`/admin/organizations/${org.id}/details`)}
                      >
                        <Info className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No pending applications</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => navigate("/admin/organizations")}
        >
          All Organizations
        </Button>
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
          onClick={() => navigate("/admin/statistics")}
        >
          View Statistics
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
