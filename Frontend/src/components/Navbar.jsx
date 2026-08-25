import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ShinyText from './reactbits/ShinyText';
import Magnet from './reactbits/Magnet';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky-top">
      {/* Finanza Top Info Bar */}
      <div className="finanza-top-bar py-1.5 px-3 px-lg-5 d-none d-md-block">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <span className="text-xs">
              <i className="bi bi-shield-check me-1 text-primary"></i> Secure Personal Finance Management Portal
            </span>
          </div>
          <div className="d-flex align-items-center gap-4">
            <span className="text-xs">
              <i className="bi bi-clock-history me-1 text-primary"></i> Realtime Analytics & Budget Tracking
            </span>
          </div>
        </div>
      </div>

      {/* Finanza Navbar Header */}
      <nav className="navbar navbar-expand-lg finanza-navbar px-3 px-lg-5 py-2">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
            <Magnet magnetStrength={4}>
              <div className="rounded-3 p-1 px-2.5 text-white fw-bold shadow-sm" style={{ backgroundColor: '#355EFC' }}>
                <i className="bi bi-graph-up-arrow fs-5"></i>
              </div>
            </Magnet>
            <span className="finanza-brand">
              <ShinyText text="Finanza" speed={4} />
            </span>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-2">
              {isAuthenticated && (
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link finanza-nav-link d-flex align-items-center gap-1.5">
                    <i className="bi bi-speedometer2 text-primary"></i> Dashboard
                  </Link>
                </li>
              )}
              {isAuthenticated && user?.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link finanza-nav-link d-flex align-items-center gap-1.5">
                    <i className="bi bi-shield-lock-fill text-danger"></i> Admin Portal
                  </Link>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center gap-2.5">
              {isAuthenticated ? (
                <div className="d-flex align-items-center gap-2.5">
                  <Link
                    to="/profile"
                    className="btn btn-light border d-flex align-items-center gap-2 px-3 py-1.5 rounded-3 text-decoration-none shadow-sm"
                    title="View My Profile"
                  >
                    <div
                      className={`rounded-circle text-white d-flex align-items-center justify-content-center fw-bold ${
                        user?.role === 'admin' ? 'bg-primary' : 'bg-success'
                      }`}
                      style={{ width: '30px', height: '30px', fontSize: '13px' }}
                    >
                      {user?.firstName?.[0]?.toUpperCase()}
                    </div>
                    <span className="text-sm font-jost text-dark fw-bold">
                      {user?.firstName} {user?.lastName || ''}
                    </span>
                    <span className={`badge ${user?.role === 'admin' ? 'bg-primary' : 'bg-success'}`}>
                      {user?.role === 'admin' ? 'ADMIN' : 'USER'}
                    </span>
                  </Link>

                  <Magnet magnetStrength={3}>
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline-danger btn-sm px-3 py-2 fw-semibold rounded-3 d-flex align-items-center gap-1.5"
                    >
                      <i className="bi bi-box-arrow-right"></i> Logout
                    </button>
                  </Magnet>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <Magnet magnetStrength={3}>
                    <Link
                      to="/login"
                      className="btn btn-outline-primary btn-sm px-3.5 py-2 fw-semibold rounded-3"
                    >
                      Sign In
                    </Link>
                  </Magnet>
                  <Magnet magnetStrength={3}>
                    <Link
                      to="/register"
                      className="btn btn-finanza-primary btn-sm px-4 py-2 fw-semibold rounded-3"
                    >
                      Create Account
                    </Link>
                  </Magnet>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
