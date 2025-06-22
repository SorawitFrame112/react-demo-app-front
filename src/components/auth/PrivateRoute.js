import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore'; 

const PrivateRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user, initializeAuth } = useAuthStore();
  const location = useLocation(); 

  useEffect(() => {
  }, [initializeAuth, isAuthenticated, user]);


  // 1. ตรวจสอบยืนยันตัวตน
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 2. ตรวจสอบสิทธิ์
  if (allowedRoles && user && user.roles) {
    const hasRequiredRole = allowedRoles.some(role => user.roles.includes(role));
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  // ถ้าผ่านการตรวจสอบทั้งหมด
  return  <Outlet />;
};

export default PrivateRoute;