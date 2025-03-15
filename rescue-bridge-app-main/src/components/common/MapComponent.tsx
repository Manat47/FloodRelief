import React, { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Set default icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

interface MapComponentProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
  readOnly?: boolean;
}

interface LocationMarkerProps {
  position: [number, number];
  onLocationSelect?: (lat: number, lng: number) => void;
  readOnly?: boolean;
}

// Component to handle map click events and marker positioning
const LocationMarker: React.FC<LocationMarkerProps> = ({
  position,
  onLocationSelect,
  readOnly,
}) => {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>(position);

  useMapEvents({
    click(e) {
      if (readOnly) return;
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      if (onLocationSelect) {
        onLocationSelect(lat, lng);
        toast({
          title: "Location selected",
          description: `Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`,
        });
      }
    },
  });

  return <Marker position={markerPosition} />;
};

const MapComponent: React.FC<MapComponentProps> = ({
  onLocationSelect,
  initialLat = 13.7563,
  initialLng = 100.5018,
  readOnly = false,
}) => {
  const position: [number, number] = [initialLat, initialLng];

  return (
    <div className="h-64 rounded-lg overflow-hidden relative">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          position={position}
          onLocationSelect={onLocationSelect}
          readOnly={readOnly}
        />
      </MapContainer>
      
      {!readOnly && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-100 bg-black/50 py-1 z-10 pointer-events-none">
          Click to set location
        </div>
      )}
    </div>
  );
};

export default MapComponent;
