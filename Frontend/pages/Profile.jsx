import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [infoLoading, setInfoLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setErrorMsg('All fields (First Name, Last Name, Email) are required.');
      return;
    }

    setInfoLoading(true);
    const result = await updateProfile({
      firstName,
      lastName,
      email,
    });
    setInfoLoading(false);

    if (result.success) {
      setSuccessMsg('Profile details updated successfully!');
    } else {
      setErrorMsg(result.error || 'Failed to update profile.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!currentPassword) {
      setErrorMsg('Please enter your current password.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('New password and confirm password do not match.');
      return;
    }

    setPasswordLoading(true);
    const result = await updateProfile({
      currentPassword,
      newPassword,
    });
    setPasswordLoading(false);

    if (result.success) {
      setSuccessMsg('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setErrorMsg(result.error || 'Failed to change password.');
    }
  };

  const getInitials = () => {
    const f = firstName?.[0] || user?.firstName?.[0] || 'U';
    const l = lastName?.[0] || user?.lastName?.[0] || '';
    return (f + l).toUpperCase();
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <div className="container py-4 my-2">
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Finanza Profile Banner Header */}
        <div className="finanza-hero-banner p-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-3"
                style={{ width: '64px', height: '64px', backgroundColor: user?.role === 'admin' ? '#355EFC' : '#059669' }}
              >
                {getInitials()}
              </div>
              <div>
                <h2 className="h4 fw-bold text-white mb-1 font-jost">
                  {user?.firstName} {user?.lastName}
                </h2>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-white-50 text-sm">{user?.email}</span>
                  <span
                    className={`badge ${
                      user?.role === 'admin' ? 'bg-primary' : 'bg-success'
                    }`}
                  >
                    {user?.role === 'admin' ? 'ADMIN' : 'USER'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-sm text-white-50 bg-white bg-opacity-10 p-2 px-3 rounded border border-white border-opacity-25 font-jost">
              <i className="bi bi-calendar3 me-1.5 text-primary"></i> Member since: <strong className="text-white">{formattedDate}</strong>
            </div>
          </div>
        </div>

        {/* Feedback Alerts */}
        {successMsg && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            {successMsg}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMsg('')}
            ></button>
          </div>
        )}

        {errorMsg && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {errorMsg}
            <button
              type="button"
              className="btn-close"
              onClick={() => setErrorMsg('')}
            ></button>
          </div>
        )}

        <div className="row g-4">
          {/* Edit Personal Information Card */}
          <div className="col-12 col-md-6">
            <div className="finanza-card h-100 p-4">
              <div className="pb-3 mb-3 border-bottom">
                <h3 className="h6 mb-0 fw-bold text-dark font-jost">
                  <i className="bi bi-person-fill me-2 text-primary"></i>
                  Edit Personal Information
                </h3>
              </div>
              <form onSubmit={handleUpdateInfo}>
                <div className="mb-3">
                  <label className="form-label text-sm fw-semibold text-dark">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-sm fw-semibold text-dark">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-sm fw-semibold text-dark">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={infoLoading}
                  className="btn btn-finanza-primary w-100 py-2.5 font-jost fw-semibold d-flex align-items-center justify-content-center gap-2"
                >
                  {infoLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    <>
                      <i className="bi bi-save"></i> Save Profile Changes
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Change Password Card */}
          <div className="col-12 col-md-6">
            <div className="finanza-card h-100 p-4">
              <div className="pb-3 mb-3 border-bottom">
                <h3 className="h6 mb-0 fw-bold text-dark font-jost">
                  <i className="bi bi-shield-lock-fill me-2" style={{ color: '#E93C05' }}></i>
                  Change Password
                </h3>
              </div>
              <form onSubmit={handleChangePassword}>
                <div className="mb-3">
                  <label className="form-label text-sm fw-semibold text-dark">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-sm fw-semibold text-dark">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-sm fw-semibold text-dark">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="btn btn-finanza-secondary w-100 py-2.5 font-jost fw-semibold d-flex align-items-center justify-content-center gap-2"
                >
                  {passwordLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    <>
                      <i className="bi bi-key-fill"></i> Update Password
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
