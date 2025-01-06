import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import ForgetPassword from './ForgetPassword';
import Signup from './Signup';
import ConfirmPassword from './ConfirmPassword';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoutes';

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/confirm-password/:token" element={<ConfirmPassword />} />
        <Route path="/login" element={<Login />} />

      
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
