import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StatusBadge from "@/components/common/StatusBadge";
import { MapPin, ArrowLeft, Clock, CheckCircle, UserCircle, HomeIcon, Phone } from "lucide-react";
import { HelpRequest, MissionStatus } from "@/types";

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data for the request
  const request: HelpRequest = {
    id: id || "REQ-001",
    userId: "user-123",
    location: {
      lat: 13.756331,
      lng: 100.501762,
      address: "123 Flood St, Bangkok 10330",
    },
    needs: {
      food: true,
      water: true,
      medicine: true,
      other: false,
    },
    peopleCount: 4,
    details: "We need urgent help. Water is rising. We have elderly people and children.",
    status: "in_progress",
    createdAt: "2023-06-28T10:30:00Z",
    images: ["/lovable-uploads/752a656b-91d7-4948-ad7b-684230379824.png"]
  };

  // Mock rescue team data with properly typed status
  const rescueTeam = {
    id: "team-A",
    name: "Team Alpha",
    leader: {
      name: "John Smith",
      phone: "+66 81-234-5678"
    },
    members: 3,
    estimatedArrival: "2023-06-29T14:30:00Z",
    currentLocation: "2 km away",
    status: "on_way" as MissionStatus,
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case "pending": return 0;
      case "reserved": return 25;
      case "in_progress": return 50;
      case "on_way": return 75;
      case "arrived": return 90;
      case "completed": return 100;
      default: return 0;
    }
  };

  // Timeline steps based on request status
  const timelineSteps = [
    { label: "รับคำขอแล้ว", active: true, date: new Date(request.createdAt) },
    { 
      label: "ทีมช่วยเหลือกำลังมาหา", 
      active: rescueTeam.status === "on_way" || rescueTeam.status === "arrived" || rescueTeam.status === "completed", 
      date: (rescueTeam.status === "on_way" || rescueTeam.status === "arrived" || rescueTeam.status === "completed") ? 
        new Date(Date.now() - 3600000) : null 
    },
    { 
      label: "ถึงที่หมายแล้ว", 
      active: rescueTeam.status === "arrived" || rescueTeam.status === "completed", 
      date: null 
    },
  ];

  return (
    <div className="pb-16">
      <div className="bg-white p-4 flex items-center sticky top-0 z-10 border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">คำขอที่กำลังดำเนินการ</h1>
      </div>

      <div className="p-4">
        {/* Progress Tracker */}
        <Card className="mb-4 border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="mb-4">
              <Progress value={getProgressValue(rescueTeam.status)} className="h-2" />
            </div>
            <div className="flex justify-between text-xs mt-1">
              {timelineSteps.map((step, index) => (
                <div key={index} className={`text-center ${step.active ? 'text-primary font-medium' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full mx-auto mb-1 flex items-center justify-center ${step.active ? 'bg-primary' : 'bg-gray-200'}`}>
                    {step.active && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  {step.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rescue Team Info */}
        <Card className="mb-4 border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start mb-4">
              <div className="bg-primary/10 p-3 rounded-full mr-3">
                <UserCircle className="text-primary h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">ศูนย์ช่วยเหลือด้านอาหารและน้ำดื่ม {rescueTeam.id}</h3>
                <p className="text-sm text-gray-500 mt-1">ทีมกำลังเดินทางมาหาคุณ</p>
              </div>
            </div>

            <div className="rounded-lg border p-4 mb-4">
              <div className="mb-4">
                <p className="font-medium text-sm mb-1">คาดว่าจะถึงที่หมายภายใน</p>
                <p className="text-xs text-gray-600">ประมาณ {new Date(rescueTeam.estimatedArrival).toLocaleTimeString()} น.</p>
                <p className="text-xs text-gray-600">วันที่ {new Date(rescueTeam.estimatedArrival).toLocaleDateString()}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden mr-2">
                    <UserCircle className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Leader</p>
                    <p className="text-xs text-gray-600">{rescueTeam.leader.name}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs h-8 rounded-full">
                  <Phone className="h-3 w-3 mr-1" />
                  ติดต่อ
                </Button>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200">
              <div className="mb-6 relative">
                <div className="absolute left-[-24px] top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-sm font-medium">ศูนย์ช่วยเหลือรับคำขอของคุณแล้ว</p>
                <p className="text-xs text-gray-500">{new Date(request.createdAt).toLocaleString()}</p>
              </div>
              
              <div className="mb-6 relative">
                <div className="absolute left-[-24px] top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-sm font-medium">ทีมช่วยเหลือกำลังมาหาคุณ</p>
                <p className="text-xs text-gray-500">{new Date(Date.now() - 3600000).toLocaleString()}</p>
              </div>
              
              <div className="relative">
                <div className="absolute left-[-24px] top-0 w-4 h-4 rounded-full bg-gray-200"></div>
                <p className="text-sm font-medium text-gray-400">รอทีมช่วยเหลือมาถึง</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Details */}
        <Card className="mb-4 border-0 shadow-sm">
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4">รายละเอียดคำขอ</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">ที่อยู่:</p>
                  <p className="text-sm text-gray-600">{request.location.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <HomeIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">จำนวนคน: {request.peopleCount} คน</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">สิ่งที่ต้องการ:</p>
                <div className="flex flex-wrap gap-2">
                  {request.needs.food && (
                    <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">อาหาร</span>
                  )}
                  {request.needs.water && (
                    <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">น้ำดื่ม</span>
                  )}
                  {request.needs.medicine && (
                    <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">ยา</span>
                  )}
                  {request.needs.other && (
                    <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">อื่นๆ</span>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">รายละเอียดเพิ่มเติม:</p>
                <p className="text-sm text-gray-600">{request.details}</p>
              </div>
              
              {request.images && request.images.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">รูปภาพ:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {request.images.map((image, index) => (
                      <div 
                        key={index} 
                        className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                      >
                        <img 
                          src={image} 
                          alt={`Request image ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestDetail;
