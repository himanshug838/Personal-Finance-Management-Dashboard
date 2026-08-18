import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (localError) setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!formData.email || !formData.password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(formData.email, formData.password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setLocalError(result.error);
    }
  };

  return (
    <div className="py-5 d-flex align-items-center justify-content-center px-3" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <div className="finanza-card border-0 overflow-hidden shadow-lg">
          <div className="card-body p-4 p-sm-5">
            <div className="text-center mb-4">
              <div className="rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3 shadow-sm" style={{ width: '60px', height: '60px', backgroundColor: '#355EFC' }}>
                <i className="bi bi-shield-lock-fill fs-2"></i>
              </div>
              <h2 className="fw-bold font-jost text-dark fs-3 mb-1">Sign In to Finanza</h2>
              <p className="text-muted text-sm">
                Enter your credentials to manage your finances.
              </p>
            </div>

            {/* Error Alert */}
            {localError && (
              <div className="alert alert-danger text-sm d-flex align-items-center gap-2 mb-4">
                <i className="bi bi-exclamation-triangle-fill fs-5 text-danger"></i>
                <div>{localError}</div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label text-dark text-xs font-jost fw-bold text-uppercase mb-1">
                  Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-primary">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="form-control py-2 text-sm"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label text-dark text-xs font-jost fw-bold text-uppercase mb-1">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-primary">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-control py-2 text-sm"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-finanza-primary w-100 py-2.5 font-jost fw-bold d-flex align-items-center justify-content-center gap-2 mb-3"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <i className="bi bi-arrow-right"></i>
                  </>
                )}
              </button>
            </form>

            {/* Switch link */}
            <div className="text-center pt-3 border-top">
              <p className="text-muted text-sm mb-0">
                Don't have an account?{' '}
                <Link to="/register" className="fw-bold text-decoration-none" style={{ color: '#355EFC' }}>
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
