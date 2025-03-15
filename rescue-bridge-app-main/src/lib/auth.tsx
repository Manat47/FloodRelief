
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (email: string, password: string, role: UserRole, name?: string) => Promise<boolean>;
  logout: () => void;
  verifyOtp: (otp: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data and functions for demonstration purposes
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('floodRelief_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock API call
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: '123456',
        email,
        role,
        name: role === 'admin' ? 'Admin User' : 
              role === 'organization' ? 'Relief Organization' : 
              role === 'rescuer' ? 'Rescue Volunteer' : 'Flood Victim'
      };
      
      setUser(mockUser);
      localStorage.setItem('floodRelief_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, role: UserRole, name?: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock API call
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      if (role === 'organization') {
        // Organization registration is handled differently, just return true
        setIsLoading(false);
        return true;
      }
      
      const mockUser: User = {
        id: '123456',
        email,
        role,
        name: name || 'New User'
      };
      
      setUser(mockUser);
      localStorage.setItem('floodRelief_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('floodRelief_user');
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock OTP verification
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('OTP verification failed', error);
      setIsLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout, 
      verifyOtp, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
