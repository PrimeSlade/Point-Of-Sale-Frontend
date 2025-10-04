import { useAuth } from "@/hooks/useAuth";
import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loading from "@/components/loading/Loading";

type ProtectedRouteProps = {
  children: ReactNode;
  action?: string;
  subject?: string[];
};

const ProtectedRoute = ({ children, action, subject }: ProtectedRouteProps) => {
  const { user, isLoading, can } = useAuth();

  if (isLoading) {
    return <Loading className="h-screen" />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (action && subject && !can(action, subject)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
