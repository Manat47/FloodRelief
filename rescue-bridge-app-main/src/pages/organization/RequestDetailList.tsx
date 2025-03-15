
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, User, MapPin, CalendarClock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { HelpRequest } from "@/types";

const RequestDetailList = () => {
  const navigate = useNavigate();
  const { zoneId } = useParams();
  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
  
  // Mock data for the requests in this zone
  const requestsInZone: HelpRequest[] = [
    {
      id: "#82",
      userId: "user1",
      location: {
        lat: 13.7563,
        lng: 100.5018,
        address: "123 ถนนสุขุมวิท ซอยสุขุมวิท 21 แขวงคลองเตย เขตวัฒนา กรุงเทพฯ 10110",
      },
      needs: {
        food: true,
        water: true,
        medicine: true,
        other: false,
      },
      peopleCount: 4,
      details: "คนป่วยไข้ มีเด็กอายุต่ำกว่าสามปีอยู่ในบ้านไม่มีอาหาร น้ำดื่ม และการช่วยเหลือจากทางการกักตัวอยู่ในบ้านมาหลายวัน",
      status: "pending",
      createdAt: "2024-04-20T09:30:00Z",
      images: ["public/lovable-uploads/6575e90c-0c62-4e7f-930f-afc9b8571a6c.png"],
    },
    {
      id: "#83",
      userId: "user2",
      location: {
        lat: 13.7563,
        lng: 100.5018,
        address: "456 ถนนพระราม 4 เขตคลองเตย กรุงเทพฯ 10110",
      },
      needs: {
        food: true,
        water: true,
        medicine: false,
        other: false,
      },
      peopleCount: 2,
      details: "น้ำท่วมบ้าน ไม่สามารถออกไปหาซื้ออาหารได้",
      status: "pending",
      createdAt: "2024-04-20T10:15:00Z",
    },
    {
      id: "#84",
      userId: "user3",
      location: {
        lat: 13.7563,
        lng: 100.5018,
        address: "789 ถนนเพชรบุรี เขตราชเทวี กรุงเทพฯ 10400",
      },
      needs: {
        food: true,
        water: true,
        medicine: true,
        other: true,
        otherDetails: "ต้องการผ้าอ้อมเด็ก",
      },
      peopleCount: 5,
      details: "มีเด็กเล็กและผู้สูงอายุ ต้องการความช่วยเหลือด่วน",
      status: "pending",
      createdAt: "2024-04-20T11:00:00Z",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()} เม.ย. ${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()} เม.ย. ${date.getFullYear()}`;
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <Button 
        variant="ghost" 
        className="mb-4 pl-0" 
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> กลับไป
      </Button>
      
      <h1 className="text-center font-bold text-xl mb-6">
        กลับไป<br />
        รายละเอียดเคส
      </h1>
      
      <div className="space-y-4">
        {requestsInZone.map((request) => (
          <Card 
            key={request.id} 
            className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedRequest(request)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold">เคสที่ {request.id}</div>
                <div className="text-sm text-gray-500">{formatDate(request.createdAt)}</div>
              </div>
              
              <div className="text-sm mb-2">
                <div className="flex items-start gap-2 mb-1">
                  <MapPin className="h-4 w-4 shrink-0 mt-1 text-red-500" />
                  <span>{request.location.address.split(' ').slice(0, 3).join(' ')}...</span>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {request.needs.food && (
                  <span className="px-2 py-0.5 bg-gray-100 text-xs rounded-full">อาหาร</span>
                )}
                {request.needs.water && (
                  <span className="px-2 py-0.5 bg-gray-100 text-xs rounded-full">น้ำ</span>
                )}
                {request.needs.medicine && (
                  <span className="px-2 py-0.5 bg-gray-100 text-xs rounded-full">ยา</span>
                )}
                {request.needs.other && (
                  <span className="px-2 py-0.5 bg-gray-100 text-xs rounded-full">อื่นๆ</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              เคสที่ {selectedRequest?.id} <span className="text-sm font-normal text-gray-500">{selectedRequest && formatDate(selectedRequest.createdAt)}</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">พื้นที่ ปริมาณน้ำ:</div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-5 w-5 text-gray-700" />
                  <div className="font-medium">ขอความช่วยเหลือ, ปฐมพยาบาล</div>
                </div>
                
                <div className="text-sm mb-2">
                  <strong>รายละเอียด: </strong> 
                  {selectedRequest.details}
                </div>
                
                <div className="text-sm">
                  <strong>จำนวน: </strong> {selectedRequest.peopleCount} คน
                </div>
              </div>
              
              <div>
                <div className="flex items-start gap-2 mb-1">
                  <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <div className="font-medium">ที่อยู่</div>
                    <div className="text-sm">{selectedRequest.location.address}</div>
                  </div>
                </div>
              </div>
              
              {selectedRequest.images && selectedRequest.images.length > 0 && (
                <div>
                  <img 
                    src={selectedRequest.images[0]} 
                    alt="Request image" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button className="bg-green-500 hover:bg-green-600">
                  จัดทีม
                </Button>
                <Button variant="destructive">
                  ยกเลิกคำขอ
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestDetailList;
