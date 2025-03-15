
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const OrganizationRegistrationPending = () => {
  const navigate = useNavigate();
  const [randomDate] = React.useState(() => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() - Math.floor(Math.random() * 5))).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="h-10 w-10 text-gray-500" />
        </div>
        
        <h1 className="text-xl font-bold mb-2">
          Your request to register as an organization is being reviewed.
        </h1>
        
        <div className="bg-green-50 rounded-lg p-3 my-6 inline-block">
          <p className="text-green-700 font-medium">Pending Approval</p>
        </div>
        
        <div className="text-left mb-6">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Status:</span>
            <span className="font-medium">Under Review</span>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Submitted on:</span>
            <span className="font-medium">{randomDate}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          For inquiries, contact <a href="mailto:support@floodrelief.org" className="text-primary">support@floodrelief.org</a>
        </p>
        
        <Button
          className="w-full"
          variant="outline"
          onClick={() => navigate("/")}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default OrganizationRegistrationPending;
