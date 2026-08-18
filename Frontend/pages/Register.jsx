import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  // Password strength checker logic
  const calculatePasswordStrength = (pwd) => {
    let score = 0;
    if (!pwd) return { score: 0, label: '', color: '' };
    if (pwd.length >= 6) score += 25;
    if (pwd.length >= 10) score += 25;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 25;

    if (score <= 25) return { score: 25, label: 'Weak', color: 'bg-danger' };
    if (score <= 50) return { score: 50, label: 'Fair', color: 'bg-warning' };
    if (score <= 75) return { score: 75, label: 'Good', color: 'bg-info' };
    return { score: 100, label: 'Strong', color: 'bg-success' };
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (localError) setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password) {
      setLocalError('Please fill out all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    const result = await register(firstName, lastName, email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setLocalError(result.error);
    }
  };

  return (
    <div className="py-5 d-flex align-items-center justify-content-center px-3" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div className="finanza-card border-0 overflow-hidden shadow-lg">
          <div className="card-body p-4 p-sm-5">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3 shadow-sm" style={{ width: '60px', height: '60px', backgroundColor: '#355EFC' }}>
                <i className="bi bi-person-plus-fill fs-2"></i>
              </div>
              <h2 className="fw-bold font-jost text-dark fs-3 mb-1">Create Finanza Account</h2>
              <p className="text-muted text-sm">
                Start managing your personal finances with precision.
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
              {/* First & Last Name Grid */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-sm-6">
                  <label className="form-label text-dark text-xs font-jost fw-bold text-uppercase mb-1">
                    First Name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-primary">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control py-2 text-sm"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <label className="form-label text-dark text-xs font-jost fw-bold text-uppercase mb-1">
                    Last Name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-primary">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control py-2 text-sm"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

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
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
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
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                  </button>
                </div>

                {/* Password strength bar */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="d-flex justify-content-between align-items-center text-xs text-muted mb-1">
                      <span>Strength</span>
                      <span className="fw-bold">{passwordStrength.label}</span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div
                        className={`progress-bar ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.score}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="form-label text-dark text-xs font-jost fw-bold text-uppercase mb-1">
                  Confirm Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-primary">
                    <i className="bi bi-check2-circle"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="form-control py-2 text-sm"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Register Account</span>
                    <i className="bi bi-arrow-right"></i>
                  </>
                )}
              </button>
            </form>

            {/* Footer / Switch link */}
            <div className="text-center pt-3 border-top">
              <p className="text-muted text-sm mb-0">
                Already have an account?{' '}
                <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#355EFC' }}>
                  Sign In here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
