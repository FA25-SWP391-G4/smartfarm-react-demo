import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
// Test API mapping
import ApiTester from './tests/ApiTester';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import SearchReports from './pages/SearchReports';
import CustomizeDashboard from './pages/CustomizeDashboard';
import Thresholds from './pages/Thresholds';
import Zones from './pages/Zones';
import Upgrade from './pages/Upgrade';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to dashboard if role doesn't match
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Protected Routes - Any authenticated user */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/change-password" element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              } />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/search-reports" element={
                <ProtectedRoute>
                  <SearchReports />
                </ProtectedRoute>
              } />
              
              {/* Premium User Routes */}
              <Route path="/customize-dashboard" element={
                <ProtectedRoute requiredRole="Premium">
                  <CustomizeDashboard />
                </ProtectedRoute>
              } />
              <Route path="/thresholds" element={
                <ProtectedRoute requiredRole="Premium">
                  <Thresholds />
                </ProtectedRoute>
              } />
              <Route path="/zones" element={
                <ProtectedRoute requiredRole="Premium">
                  <Zones />
                </ProtectedRoute>
              } />
              
              {/* Regular User Routes */}
              <Route path="/upgrade" element={
                <ProtectedRoute>
                  <Upgrade />
                </ProtectedRoute>
              } />
              
              {/* Test Routes */}
              <Route path="/api-test" element={<ApiTester />} />
              
              {/* Default route - redirects to Dashboard */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
