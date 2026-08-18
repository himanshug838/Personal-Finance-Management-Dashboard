import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="finanza-footer pt-5 pb-3">
      <div className="container-fluid px-4 px-lg-5 max-w-7xl mx-auto">
        <div className="row g-4 justify-content-between mb-4">
          {/* Brand Column */}
          <div className="col-12 col-lg-4">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none mb-3">
              <div className="rounded-3 p-1 px-2.5 text-white fw-bold shadow-sm" style={{ backgroundColor: '#355EFC' }}>
                <i className="bi bi-graph-up-arrow fs-5"></i>
              </div>
              <span className="fs-3 fw-bold text-white font-jost">Finanza</span>
            </Link>
            <p className="text-sm mb-4 text-white-50">
              Empowering your personal financial journey with real-time analytics, secure account management, and smart budget tracking. Your financial status is our goal.
            </p>
            <div className="d-flex align-items-center gap-2">
              <a
                href="#facebook"
                className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f text-primary"></i>
              </a>
              <a
                href="#twitter"
                className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                aria-label="Twitter"
              >
                <i className="fa-brands fa-twitter text-primary"></i>
              </a>
              <a
                href="#linkedin"
                className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in text-primary"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="mb-3 text-white">Platform</h5>
            <ul className="list-unstyled space-y-2 mb-0 text-sm">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              <li>
                <a href="#accounts">Linked Accounts</a>
              </li>
              <li>
                <a href="#budgets">Budget Planner</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="mb-3 text-white">Services</h5>
            <ul className="list-unstyled space-y-2 mb-0 text-sm">
              <li>
                <a href="#security">Financial Planning</a>
              </li>
              <li>
                <a href="#investments">Investment Care</a>
              </li>
              <li>
                <a href="#tax">Tax Advisory</a>
              </li>
              <li>
                <a href="#terms">Terms & Policies</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="mb-3 text-white">Contact Us</h5>
            <div className="text-sm text-white-50 space-y-2">
              <div>
                <i className="fa-solid fa-location-dot me-2 text-primary"></i> 123 Financial Tower, NY, USA
              </div>
              <div>
                <i className="fa-solid fa-phone me-2 text-primary"></i> +1 (800) 555-FINANZA
              </div>
              <div>
                <i className="fa-solid fa-envelope me-2 text-primary"></i> support@finanza.com
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-3 mt-4 border-top border-secondary border-opacity-25 text-xs text-center d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2 text-white-50">
          <div>
            © {new Date().getFullYear()} Finanza | Personal Finance Dashboard. All rights reserved.
          </div>
          <div className="d-flex align-items-center gap-3">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
