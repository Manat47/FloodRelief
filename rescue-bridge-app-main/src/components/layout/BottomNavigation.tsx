
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ClipboardList, Map, User, Users } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  const getNavItems = () => {
    const baseItems = [
      {
        label: "Home",
        icon: Home,
        path: "/dashboard",
      },
      {
        label: "Requests",
        icon: ClipboardList,
        path: "/requests",
      },
      {
        label: "Map",
        icon: Map,
        path: "/map",
      },
      {
        label: "Profile",
        icon: User,
        path: "/profile",
      },
    ];

    if (user.role === 'organization' || user.role === 'rescuer') {
      baseItems.splice(2, 0, {
        label: "Teams",
        icon: Users,
        path: "/teams",
      });
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t h-16 flex items-center justify-around z-50">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={cn(
            "bottom-tab",
            location.pathname === item.path
              ? "text-primary"
              : "text-gray-400"
          )}
          onClick={() => navigate(item.path)}
        >
          <item.icon size={20} />
          <span className="mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
