
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Image, MapPin, HelpCircle, Users, Info } from "lucide-react";
import MapComponent from "@/components/common/MapComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RequestHelp = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    address: "",
    needs: {
      food: false,
      water: false,
      medicine: false,
      other: false,
    },
    otherDetails: "",
    peopleCount: 1,
    details: "",
    images: [] as File[],
  });

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  const handleCheckboxChange = (name: string) => {
    setFormData({
      ...formData,
      needs: {
        ...formData.needs,
        [name]: !formData.needs[name as keyof typeof formData.needs],
      },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(files)],
      });
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && (!location.lat || !location.lng)) {
      toast({
        title: "Error",
        description: "Please select a location on the map",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 2 && !Object.values(formData.needs).some(value => value)) {
      toast({
        title: "Error",
        description: "Please select at least one item you need help with",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Request Submitted",
        description: "Your help request has been submitted successfully",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between items-center mb-6 px-2">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === step 
                  ? "bg-primary text-primary-foreground" 
                  : currentStep > step 
                    ? "bg-primary/20 text-primary" 
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {step}
            </div>
            <span className="text-xs mt-1 text-gray-500">
              {step === 1 ? "Location" : 
               step === 2 ? "Needs" : 
               step === 3 ? "Details" : "Photos"}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border border-border shadow-sm">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center text-lg">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Your Location
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <MapComponent onLocationSelect={handleLocationSelect} />
                <div className="pt-2">
                  <Label htmlFor="address">Additional Address Details</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter house number, street name, landmark, etc."
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                {location.lat !== 0 && location.lng !== 0 && (
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Location selected
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className="border border-border shadow-sm">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center text-lg">
                <HelpCircle className="w-5 h-5 mr-2 text-primary" />
                What Do You Need Help With?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${formData.needs.food ? "bg-primary/10 border-primary" : "hover:bg-gray-50"}`}
                      onClick={() => handleCheckboxChange("food")}>
                    <div className="flex items-center">
                      <Checkbox
                        id="food"
                        checked={formData.needs.food}
                        onCheckedChange={() => handleCheckboxChange("food")}
                        className="mr-2"
                      />
                      <Label htmlFor="food" className="cursor-pointer">Food</Label>
                    </div>
                  </div>
                  <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${formData.needs.water ? "bg-primary/10 border-primary" : "hover:bg-gray-50"}`}
                      onClick={() => handleCheckboxChange("water")}>
                    <div className="flex items-center">
                      <Checkbox
                        id="water"
                        checked={formData.needs.water}
                        onCheckedChange={() => handleCheckboxChange("water")}
                        className="mr-2"
                      />
                      <Label htmlFor="water" className="cursor-pointer">Water</Label>
                    </div>
                  </div>
                  <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${formData.needs.medicine ? "bg-primary/10 border-primary" : "hover:bg-gray-50"}`}
                      onClick={() => handleCheckboxChange("medicine")}>
                    <div className="flex items-center">
                      <Checkbox
                        id="medicine"
                        checked={formData.needs.medicine}
                        onCheckedChange={() => handleCheckboxChange("medicine")}
                        className="mr-2"
                      />
                      <Label htmlFor="medicine" className="cursor-pointer">Medicine</Label>
                    </div>
                  </div>
                  <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${formData.needs.other ? "bg-primary/10 border-primary" : "hover:bg-gray-50"}`}
                      onClick={() => handleCheckboxChange("other")}>
                    <div className="flex items-center">
                      <Checkbox
                        id="other"
                        checked={formData.needs.other}
                        onCheckedChange={() => handleCheckboxChange("other")}
                        className="mr-2"
                      />
                      <Label htmlFor="other" className="cursor-pointer">Other</Label>
                    </div>
                  </div>
                </div>
                
                {formData.needs.other && (
                  <div className="pt-2">
                    <Label htmlFor="otherDetails">Please specify other needs</Label>
                    <Input
                      id="otherDetails"
                      name="otherDetails"
                      placeholder="Describe what else you need"
                      value={formData.otherDetails}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card className="border border-border shadow-sm">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Additional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="peopleCount">How many people need assistance?</Label>
                  <Input
                    id="peopleCount"
                    name="peopleCount"
                    type="number"
                    min="1"
                    value={formData.peopleCount}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="details">Situation Details</Label>
                  <Textarea
                    id="details"
                    name="details"
                    placeholder="Please provide any additional details that might help rescuers (e.g., current situation, specific needs, challenges)"
                    value={formData.details}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card className="border border-border shadow-sm">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center text-lg">
                <Image className="w-5 h-5 mr-2 text-primary" />
                Upload Photos (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="images"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Image className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-primary">Click to upload images</span>
                    <span className="text-xs text-gray-500 mt-1">
                      Photos help rescuers understand the situation better
                    </span>
                  </Label>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {formData.images.length} image(s) selected
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(formData.images).map((file, index) => (
                        <div key={index} className="relative bg-gray-100 rounded h-16 w-16 flex items-center justify-center overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pb-16">
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-1 mr-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Request Help</h1>
      </div>
      
      {renderStepIndicator()}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStepContent()}
        
        <div className="flex justify-between mt-6">
          {currentStep > 1 ? (
            <Button 
              type="button" 
              variant="outline"
              onClick={handlePrevStep}
              className="px-6"
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {currentStep < 4 ? (
            <Button 
              type="button"
              onClick={handleNextStep}
              className="px-6"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full sm:w-auto px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span> Submitting...
                </span>
              ) : (
                "Submit Request"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RequestHelp;
