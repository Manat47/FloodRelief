
export type UserRole = 'victim' | 'organization' | 'rescuer' | 'admin';

export type RequestStatus = 'pending' | 'reserved' | 'in_progress' | 'completed' | 'cancelled';

export type MissionStatus = 'preparing' | 'on_way' | 'arrived' | 'completed';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  phone?: string;
  organization?: string;
}

export interface HelpRequest {
  id: string;
  userId: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  needs: {
    food: boolean;
    water: boolean;
    medicine: boolean;
    other: boolean;
    otherDetails?: string;
  };
  peopleCount: number;
  details: string;
  images?: string[];
  status: RequestStatus;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  representativeName: string;
  position: string;
  documents: string[];
  isVerified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface Team {
  id: string;
  name: string;
  organizationId: string;
  leaderId: string;
  members: string[];
  isActive: boolean;
}

export interface Mission {
  id: string;
  teamId: string;
  requestIds: string[];
  status: MissionStatus;
  startTime?: string;
  endTime?: string;
  statusUpdates: {
    status: MissionStatus;
    timestamp: string;
  }[];
}

export interface Rescuer {
  id: string;
  organizationId: string;
  name: string;
  age: number;
  idNumber: string;
  phone: string;
  email: string;
  createdAt: string;
  isTeamLeader?: boolean;
}
