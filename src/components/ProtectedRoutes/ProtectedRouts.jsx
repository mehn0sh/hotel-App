import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

const ProtectedRouts = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(!isAuthenticated) return navigate("/login");
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
};

export default ProtectedRouts;
