import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PrivateRoute({ children }) {
  const GetAuthentication = Cookies.get('Authentication');
  if (!GetAuthentication) {
    return <Navigate to="/login" replace />; 
  }
  
  return children;
}