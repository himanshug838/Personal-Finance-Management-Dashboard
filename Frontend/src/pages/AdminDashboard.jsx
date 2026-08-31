import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../hooks/useAuth';
import SpotlightCard from '../components/reactbits/SpotlightCard';
import CountUp from '../components/reactbits/CountUp';
import DecryptedText from '../components/reactbits/DecryptedText';
import ShinyText from '../components/reactbits/ShinyText';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import Magnet from '../components/reactbits/Magnet';

const AdminDashboard = () => {
  const { user: currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Confirmation modal state for user deletion
  const [userToDelete, setUserToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      const [statsRes, usersRes] = await Promise.all([
        axiosInstance.get('/admin/stats'),
        axiosInstance.get('/admin/users'),
      ]);
      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError(err.response?.data?.error || 'Failed to load admin statistics and user list.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (targetUser) => {
    const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
    const targetId = targetUser._id || targetUser.id;

    if ((targetUser._id === currentUser?.id || targetUser.id === currentUser?.id) && newRole === 'user') {
      alert('You cannot demote your own admin account.');
      return;
    }

    const actionText = newRole === 'admin' ? 'Promote' : 'Demote';
    if (
      !window.confirm(
        `Are you sure you want to ${actionText.toLowerCase()} ${targetUser.firstName} ${targetUser.lastName} (${targetUser.email}) to ${newRole.toUpperCase()}?`
      )
    ) {
      return;
    }

    setActionLoading(true);
    setSuccessMsg('');
    setError('');

    try {
      const res = await axiosInstance.put(`/admin/users/${targetId}/role`, { role: newRole });
      if (newRole === 'admin') {
        setSuccessMsg(
          `User ${targetUser.firstName} ${targetUser.lastName} (${targetUser.email}) has been successfully PROMOTED to ADMIN!`
        );
      } else {
        setSuccessMsg(`User ${targetUser.firstName} ${targetUser.lastName} has been demoted to Standard User.`);
      }
      fetchAdminData();
    } catch (err) {
      console.error('Role update error:', err);
      setError(err.response?.data?.error || 'Failed to update user role.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    const targetId = userToDelete._id || userToDelete.id;
    if (targetId === currentUser?.id) {
      alert('You cannot delete your own admin account.');
      setUserToDelete(null);
      return;
    }

    setActionLoading(true);
    setSuccessMsg('');
    setError('');

    try {
      const res = await axiosInstance.delete(`/admin/users/${targetId}`);
      setSuccessMsg(res.data.message || 'User deleted successfully.');
      setUserToDelete(null);
      fetchAdminData();
    } catch (err) {
      console.error('Delete user error:', err);
      setError(err.response?.data?.error || 'Failed to delete user account.');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="container py-4 my-2">
      <div className="max-w-6xl mx-auto space-y-4">
        
        {/* Finanza Admin Header */}
        <AnimatedContent distance={30} direction="vertical">
          <div className="finanza-hero-banner p-4 p-md-5">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <Magnet magnetStrength={3}>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                    style={{ width: '56px', height: '56px', fontSize: '24px', backgroundColor: '#355EFC' }}
                  >
                    <i className="bi bi-shield-lock-fill"></i>
                  </div>
                </Magnet>
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <h1 className="h4 fw-bold text-white mb-0 font-jost">
                      <DecryptedText text="Admin Control Center" animateOn="view" speed={50} />
                    </h1>
                    <span className="finanza-pill-badge">
                      <ShinyText text="SYSTEM ADMIN" speed={3} />
                    </span>
                  </div>
                  <p className="text-white-50 text-sm mb-0 mt-1">
                    Manage platform registered accounts, assign admin roles, and inspect database analytics.
                  </p>
                </div>
              </div>

              <Magnet magnetStrength={4}>
                <button
                  onClick={fetchAdminData}
                  disabled={loading}
                  className="btn btn-outline-light btn-sm font-jost fw-semibold d-flex align-items-center gap-2"
                >
                  <i className={`bi bi-arrow-clockwise ${loading ? 'spin' : ''}`}></i>
                  Refresh Analytics
                </button>
              </Magnet>
            </div>
          </div>
        </AnimatedContent>

        {/* Alerts */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            {successMsg}
            <button type="button" className="btn-close" onClick={() => setSuccessMsg('')}></button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="row g-3">
          {/* Card 1: Registered Users */}
          <div className="col-12 col-sm-6 col-md-3">
            <AnimatedContent distance={25} delay={0.1}>
              <SpotlightCard className="finanza-card p-3 d-flex align-items-center gap-3 border-0 shadow-sm" spotlightColor="rgba(5, 150, 105, 0.2)">
                <div className="rounded p-3 text-white" style={{ backgroundColor: '#059669' }}>
                  <i className="bi bi-people-fill fs-3"></i>
                </div>
                <div>
                  <div className="text-muted text-xs font-jost fw-bold text-uppercase">Total Users</div>
                  <div className="fs-4 fw-bold font-jost text-dark">
                    {loading ? '...' : <CountUp to={stats?.totalUsers || 0} decimals={0} duration={1.5} />}
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          </div>

          {/* Card 2: Admins */}
          <div className="col-12 col-sm-6 col-md-3">
            <AnimatedContent distance={25} delay={0.2}>
              <SpotlightCard className="finanza-card p-3 d-flex align-items-center gap-3 border-0 shadow-sm" spotlightColor="rgba(53, 94, 252, 0.2)">
                <div className="rounded p-3 text-white" style={{ backgroundColor: '#355EFC' }}>
                  <i className="bi bi-shield-check fs-3"></i>
                </div>
                <div>
                  <div className="text-muted text-xs font-jost fw-bold text-uppercase">Admin Accounts</div>
                  <div className="fs-4 fw-bold font-jost text-dark">
                    {loading ? '...' : <CountUp to={stats?.totalAdmins || 0} decimals={0} duration={1.5} />}
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          </div>

          {/* Card 3: Total Accounts */}
          <div className="col-12 col-sm-6 col-md-3">
            <AnimatedContent distance={25} delay={0.3}>
              <SpotlightCard className="finanza-card p-3 d-flex align-items-center gap-3 border-0 shadow-sm" spotlightColor="rgba(2, 132, 199, 0.2)">
                <div className="rounded p-3 text-white" style={{ backgroundColor: '#0284c7' }}>
                  <i className="bi bi-bank fs-3"></i>
                </div>
                <div>
                  <div className="text-muted text-xs font-jost fw-bold text-uppercase">Linked Accounts</div>
                  <div className="fs-4 fw-bold font-jost text-dark">
                    {loading ? '...' : <CountUp to={stats?.totalAccounts || 0} decimals={0} duration={1.5} />}
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          </div>

          {/* Card 4: Total Transactions */}
          <div className="col-12 col-sm-6 col-md-3">
            <AnimatedContent distance={25} delay={0.4}>
              <SpotlightCard className="finanza-card p-3 d-flex align-items-center gap-3 border-0 shadow-sm" spotlightColor="rgba(233, 60, 5, 0.2)">
                <div className="rounded p-3 text-white" style={{ backgroundColor: '#E93C05' }}>
                  <i className="bi bi-receipt fs-3"></i>
                </div>
                <div>
                  <div className="text-muted text-xs font-jost fw-bold text-uppercase">Transactions</div>
                  <div className="fs-4 fw-bold font-jost text-dark">
                    {loading ? '...' : <CountUp to={stats?.totalTransactions || 0} decimals={0} duration={1.5} />}
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          </div>
        </div>

        {/* User Management Section */}
        <AnimatedContent distance={30} delay={0.3}>
          <SpotlightCard className="finanza-card overflow-hidden border-0 shadow-sm">
            <div className="p-4 border-bottom d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 bg-white">
              <div>
                <h2 className="h5 fw-bold text-dark font-jost mb-0">User Account Management</h2>
                <span className="text-muted text-sm">
                  Promote regular users to Admin, demote admins, or delete user accounts.
                </span>
              </div>

              {/* Search & Filter Controls */}
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <div className="input-group input-group-sm" style={{ width: '220px' }}>
                  <span className="input-group-text bg-light"><i className="bi bi-search"></i></span>
                  <input
                    type="text"
                    placeholder="Search user..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                  />
                </div>

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="form-select form-select-sm"
                  style={{ width: '130px' }}
                >
                  <option value="all">All Roles</option>
                  <option value="user">Standard Users</option>
                  <option value="admin">Admins Only</option>
                </select>
              </div>
            </div>

            {/* User Table */}
            <div className="table-responsive">
              <table className="table finanza-table align-middle mb-0 text-sm">
                <thead>
                  <tr>
                    <th className="py-3 px-3">User</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Joined Date</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                        Loading registered users...
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        <i className="bi bi-person-x fs-3 d-block mb-1 text-secondary"></i>
                        No user accounts found matching your query.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const userId = u._id || u.id;
                      const isSelf = userId === currentUser?.id || userId === currentUser?._id;
                      const formattedDate = u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'N/A';

                      return (
                        <tr key={userId}>
                          <td className="py-3 px-3">
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center"
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  fontSize: '12px',
                                  backgroundColor: u.role === 'admin' ? '#355EFC' : '#059669',
                                }}
                              >
                                {u.firstName?.[0]?.toUpperCase()}{u.lastName?.[0]?.toUpperCase()}
                              </div>
                              <div>
                                <strong className="text-dark">
                                  {u.firstName} {u.lastName}
                                </strong>
                                {isSelf && (
                                  <span className="badge bg-secondary ms-1 text-xs">YOU</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-monospace text-muted text-xs">{u.email}</td>
                          <td className="py-3 px-3 text-muted">{formattedDate}</td>
                          <td className="py-3 px-3">
                            {u.role === 'admin' ? (
                              <span className="badge finanza-badge-primary">
                                <i className="bi bi-shield-fill me-1"></i> Admin
                              </span>
                            ) : (
                              <span className="badge bg-secondary">
                                <i className="bi bi-person me-1"></i> Standard User
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-end">
                            <div className="d-flex align-items-center justify-content-end gap-2">
                              {/* Role Toggle Button */}
                              <Magnet magnetStrength={3}>
                                <button
                                  onClick={() => handleToggleRole(u)}
                                  disabled={isSelf || actionLoading}
                                  title={isSelf ? 'Cannot change your own role' : u.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                                  className={`btn btn-sm font-jost fw-semibold ${
                                    u.role === 'admin'
                                      ? 'btn-outline-secondary'
                                      : 'btn-finanza-outline'
                                  }`}
                                >
                                  <i className={`bi bi-${u.role === 'admin' ? 'person-dash' : 'shield-plus'} me-1`}></i>
                                  {u.role === 'admin' ? 'Demote' : 'Promote Admin'}
                                </button>
                              </Magnet>

                              {/* Delete User Button */}
                              <Magnet magnetStrength={3}>
                                <button
                                  onClick={() => setUserToDelete(u)}
                                  disabled={isSelf || actionLoading}
                                  title={isSelf ? 'Cannot delete your own account' : 'Delete user'}
                                  className="btn btn-outline-danger btn-sm"
                                >
                                  <i className="bi bi-trash3-fill"></i>
                                </button>
                              </Magnet>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </SpotlightCard>
        </AnimatedContent>

        {/* Delete Confirmation Modal */}
        {userToDelete && (
          <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1" style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content shadow">
                <div className="modal-header bg-danger text-white py-3">
                  <h5 className="modal-title fw-bold font-jost">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i> Delete User Account?
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setUserToDelete(null)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <p className="mb-3 text-dark">
                    Are you sure you want to permanently delete{' '}
                    <strong>{userToDelete.firstName} {userToDelete.lastName}</strong> ({userToDelete.email})?
                  </p>
                  <div className="alert alert-warning text-xs mb-0">
                    <i className="bi bi-info-circle-fill me-1"></i>
                    <strong>Warning:</strong> This action will delete the user along with all their linked financial accounts and transactions.
                  </div>
                </div>
                <div className="modal-footer bg-light py-2">
                  <button
                    type="button"
                    className="btn btn-secondary font-semibold"
                    onClick={() => setUserToDelete(null)}
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger font-semibold d-flex align-items-center gap-1"
                    onClick={handleDeleteUser}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                    ) : (
                      <>
                        <i className="bi bi-trash3-fill"></i> Delete User
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
