import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-4 my-2">
      <div className="max-w-6xl mx-auto space-y-4">
        
        {/* Finanza Hero Welcome Banner */}
        <div className="finanza-hero-banner p-4 p-md-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="finanza-pill-badge mb-3">
                <i className="fa-solid fa-chart-line me-1.5"></i> Welcome to Finanza
              </span>
              <h1 className="display-6 fw-bold text-white mb-2 font-jost">
                Welcome back, <span style={{ color: '#355EFC' }}>{user?.firstName || 'User'}</span>! 
              </h1>
              <p className="text-white-50 fs-6 mb-4">
                Your Financial Status Is Our Goal. Here is your personal overview, account analytics, and recent transactions.
              </p>
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <Link to="/profile" className="btn btn-finanza-primary px-4 py-2.5">
                  <i className="bi bi-person-fill me-1"></i> View Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="btn btn-finanza-secondary px-4 py-2.5">
                    <i className="bi bi-shield-lock-fill me-1"></i> Admin Portal
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Finance Overview Metric Cards */}
        <div className="row g-3">
          {/* Card 1: Total Net Worth */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="finanza-card p-4 h-100">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="text-muted text-xs font-jost text-uppercase fw-bold">Total Net Worth</span>
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '40px', height: '40px', backgroundColor: '#355EFC' }}>
                  <i className="bi bi-currency-dollar fs-5"></i>
                </div>
              </div>
              <h3 className="fs-3 fw-bold mb-1 font-jost text-dark">$24,850.00</h3>
              <span className="text-success text-xs fw-semibold d-flex align-items-center gap-1">
                <i className="bi bi-graph-up-arrow"></i> +12.4% this month
              </span>
            </div>
          </div>

          {/* Card 2: Monthly Income */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="finanza-card p-4 h-100">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="text-muted text-xs font-jost text-uppercase fw-bold">Monthly Income</span>
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '40px', height: '40px', backgroundColor: '#059669' }}>
                  <i className="bi bi-arrow-down-left-circle fs-5"></i>
                </div>
              </div>
              <h3 className="fs-3 fw-bold mb-1 font-jost text-dark">$6,200.00</h3>
              <span className="text-muted text-xs fw-semibold">Salary & Investments</span>
            </div>
          </div>

          {/* Card 3: Monthly Expenses */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="finanza-card p-4 h-100">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="text-muted text-xs font-jost text-uppercase fw-bold">Monthly Expenses</span>
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '40px', height: '40px', backgroundColor: '#E93C05' }}>
                  <i className="bi bi-arrow-up-right-circle fs-5"></i>
                </div>
              </div>
              <h3 className="fs-3 fw-bold mb-1 font-jost text-dark">$2,410.50</h3>
              <span className="text-danger text-xs fw-semibold d-flex align-items-center gap-1">
                <i className="bi bi-dash-circle"></i> 38.8% of budget
              </span>
            </div>
          </div>

          {/* Card 4: Savings Goal */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="finanza-card p-4 h-100">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="text-muted text-xs font-jost text-uppercase fw-bold">Savings Target</span>
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '40px', height: '40px', backgroundColor: '#0284c7' }}>
                  <i className="bi bi-piggy-bank fs-5"></i>
                </div>
              </div>
              <h3 className="fs-3 fw-bold mb-1 font-jost text-dark">$15,000.00</h3>
              <div className="progress mt-2" style={{ height: '8px' }}>
                <div className="progress-bar" role="progressbar" style={{ width: '68%', backgroundColor: '#355EFC' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Section: Recent Transactions & Budget Allocation */}
        <div className="row g-4">
          {/* Recent Transactions List */}
          <div className="col-12 col-lg-8">
            <div className="finanza-card p-4 h-100">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded p-2 text-white" style={{ backgroundColor: '#355EFC' }}>
                    <i className="bi bi-receipt fs-5"></i>
                  </div>
                  <h4 className="fw-bold mb-0 text-dark font-jost">Recent Transactions</h4>
                </div>
                <button className="btn btn-finanza-outline btn-sm px-3 py-1.5">
                  View All
                </button>
              </div>

              <div className="table-responsive">
                <table className="table finanza-table align-middle mb-0 text-sm">
                  <thead>
                    <tr>
                      <th className="py-3">Description</th>
                      <th className="py-3">Category</th>
                      <th className="py-3">Date</th>
                      <th className="py-3 text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2.5">
                          <div className="rounded-circle text-white p-1 px-2 font-bold text-xs" style={{ backgroundColor: '#355EFC' }}>
                            <i className="bi bi-laptop"></i>
                          </div>
                          <div>
                            <strong className="text-dark">Tech Subscription</strong>
                            <div className="text-xs text-muted">Software & Cloud</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge finanza-badge-primary">Services</span>
                      </td>
                      <td className="text-xs text-muted">Aug 12, 2026</td>
                      <td className="text-end fw-bold text-danger">-$49.99</td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2.5">
                          <div className="rounded-circle text-white p-1 px-2 font-bold text-xs" style={{ backgroundColor: '#059669' }}>
                            <i className="bi bi-building"></i>
                          </div>
                          <div>
                            <strong className="text-dark">Salary Deposit</strong>
                            <div className="text-xs text-muted">Direct Transfer</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">Income</span>
                      </td>
                      <td className="text-xs text-muted">Aug 01, 2026</td>
                      <td className="text-end fw-bold text-success">+$4,500.00</td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2.5">
                          <div className="rounded-circle text-white p-1 px-2 font-bold text-xs" style={{ backgroundColor: '#E93C05' }}>
                            <i className="bi bi-cart3"></i>
                          </div>
                          <div>
                            <strong className="text-dark">Organic Grocery Market</strong>
                            <div className="text-xs text-muted">Food & Supplies</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge finanza-badge-secondary">Groceries</span>
                      </td>
                      <td className="text-xs text-muted">Jul 28, 2026</td>
                      <td className="text-end fw-bold text-danger">-$142.30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Budget Allocation */}
          <div className="col-12 col-lg-4">
            <div className="finanza-card p-4 h-100">
              <div className="d-flex align-items-center gap-2 mb-4">
                <div className="rounded p-2 text-white" style={{ backgroundColor: '#0284c7' }}>
                  <i className="bi bi-pie-chart fs-5"></i>
                </div>
                <h4 className="fw-bold mb-0 text-dark font-jost">Budget Allocation</h4>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <div className="d-flex justify-content-between text-xs font-jost fw-bold mb-1">
                    <span className="text-dark">Housing & Utilities</span>
                    <span style={{ color: '#355EFC' }}>45%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '45%', backgroundColor: '#355EFC' }}></div>
                  </div>
                </div>

                <div>
                  <div className="d-flex justify-content-between text-xs font-jost fw-bold mb-1">
                    <span className="text-dark">Food & Dining</span>
                    <span className="text-success">25%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '25%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="d-flex justify-content-between text-xs font-jost fw-bold mb-1">
                    <span className="text-dark">Entertainment & Leisure</span>
                    <span style={{ color: '#E93C05' }}>15%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '15%', backgroundColor: '#E93C05' }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-top">
                <button className="btn btn-finanza-primary w-100 py-2.5 font-jost fw-bold d-flex align-items-center justify-content-center gap-2">
                  <i className="bi bi-plus-circle"></i> Add New Expense
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
