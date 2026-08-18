import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading, refreshUser } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="spinner-border text-primary w-12 h-12" role="status">
          <span className="visually-hidden">Loading session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    const handleRefresh = async () => {
      setRefreshing(true);
      const updatedUser = await refreshUser();
      setRefreshing(false);
      if (updatedUser && updatedUser.role !== 'admin') {
        alert('Your account role is currently listed as Standard User. If you were recently promoted, please ask an Admin to confirm your promotion in the Admin Portal, or try logging out and logging back in.');
      }
    };

    return (
      <div className="container py-5 my-4">
        <div className="max-w-md mx-auto card shadow-sm border-1 border-secondary-subtle">
          <div className="card-body p-4 text-center">
            <div className="rounded-circle bg-danger bg-opacity-10 text-danger d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
              <i className="bi bi-shield-lock-fill fs-2"></i>
            </div>
            
            <h3 className="h5 fw-bold text-dark mb-2">Admin Portal Access Restricted</h3>
            
            <p className="text-muted text-sm mb-4">
              This area is strictly reserved for <strong>Admin accounts</strong>. Only users who have been promoted to Admin by an Administrator can view and access the Admin Portal.
            </p>

            <div className="alert alert-info text-start text-xs mb-4">
              <i className="bi bi-info-circle-fill me-1"></i>
              <strong>If an Admin recently promoted you:</strong> Click the <em>Refresh Status</em> button below to update your login permissions.
            </div>

            <div className="d-grid gap-2">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="btn btn-outline-primary font-semibold d-flex align-items-center justify-content-center gap-2"
              >
                <i className={`bi bi-arrow-clockwise ${refreshing ? 'spin' : ''}`}></i>
                {refreshing ? 'Checking status...' : 'Refresh My Status'}
              </button>

              <Link to="/dashboard" className="btn btn-secondary font-semibold">
                <i className="bi bi-speedometer2 me-1"></i> Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
