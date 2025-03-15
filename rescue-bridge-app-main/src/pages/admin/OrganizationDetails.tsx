
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building2, ArrowLeft, Calendar, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

const OrganizationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock organization data - in a real app, this would come from an API
  const organization = {
    id: id,
    name: id === "ORG-001" ? "Bangkok Relief Foundation" : "Thailand Flood Response",
    status: "pending",
    submittedDate: id === "ORG-001" ? "2023-09-27T13:45:00Z" : "2023-09-30T10:22:00Z",
    email: id === "ORG-001" ? "contact@bangkokrelief.org" : "info@thaifloodresponse.org",
    phone: id === "ORG-001" ? "+66 2 123 4567" : "+66 2 987 6543",
    address: id === "ORG-001" 
      ? "123 Sukhumvit Road, Bangkok, Thailand" 
      : "456 Silom Road, Bangkok, Thailand",
    representative: id === "ORG-001" ? "Somchai Jaidee" : "Apirak Thongsuk",
    position: id === "ORG-001" ? "Executive Director" : "Operations Manager",
    description: id === "ORG-001"
      ? "A non-profit organization dedicated to providing emergency relief during flooding in Bangkok."
      : "Specialized in coordinating flood response efforts across Thailand.",
    documents: ["registration.pdf", "financial_statement.pdf", "support_letter.pdf"]
  };
  
  return (
    <div className="pb-20">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/dashboard")}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Organization Details</h1>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-500" />
            <CardTitle>{organization.name}</CardTitle>
          </div>
          <span className="text-sm text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded inline-block mt-2">
            Pending
          </span>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Submitted: {new Date(organization.submittedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span>{organization.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{organization.phone}</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <User className="h-4 w-4 mt-0.5" />
              <div>
                <p>{organization.representative}</p>
                <p className="text-xs text-gray-500">{organization.position}</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h3 className="font-medium mb-2">About</h3>
            <p className="text-sm text-gray-600">{organization.description}</p>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h3 className="font-medium mb-2">Documents</h3>
            <div className="space-y-2">
              {organization.documents.map((doc, index) => (
                <div key={index} className="text-sm flex items-center gap-2">
                  <div className="bg-blue-50 text-blue-600 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-green-600 hover:bg-green-700"
            >
              Approve
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve Organization</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Are you sure you want to approve "{organization.name}"?</p>
              <p className="text-sm text-gray-500 mt-2">
                This will grant them access to create and manage rescue teams.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/dashboard")}
              >
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-red-600 hover:bg-red-700"
            >
              Reject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Organization</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Are you sure you want to reject "{organization.name}"?</p>
              <textarea 
                className="w-full mt-2 p-2 border rounded-md text-sm" 
                placeholder="Reason for rejection (optional)"
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => navigate("/dashboard")}
              >
                Reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OrganizationDetails;
