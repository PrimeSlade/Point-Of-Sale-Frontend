import Loading from "@/components/loading/Loading";
import { useAuth } from "@/hooks/useAuth";
import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user, error, isLoading } = useAuth();

  if (isLoading) {
    return <Loading className="h-screen" />;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PublicRoute;
