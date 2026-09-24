import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="medai-dashboard-sidebar">

        <div className="dashboard-logo">
          <div className="logo-icon">M</div>

          <div>
            <h2>MedAI</h2>
            <span>Health Intelligence</span>
          </div>
        </div>

        <nav className="dashboard-nav">

          <a className="nav-item active" href="#overview">
            <span>⌂</span>
            Overview
          </a>

        <a className="nav-item" href="/assessment">
            <span>🩺</span>
             Health Assessment
        </a>

          <a className="nav-item" href="#results">
            <span>◉</span>
            Results
          </a>

          <a className="nav-item" href="#assistant">
            <span>✦</span>
            AI Assistant
          </a>

          <a className="nav-item" href="#history">
            <span>↗</span>
            History
          </a>

          <a className="nav-item" href="#reports">
            <span>▤</span>
            Reports
          </a>

          <div className="nav-divider"></div>

          <a className="nav-item" href="#profile">
            <span>◯</span>
            Profile
          </a>

          <a className="nav-item" href="#settings">
            <span>⚙</span>
            Settings
          </a>

        </nav>

        <div className="sidebar-help">

          <div className="help-icon">?</div>

          <div>
            <strong>Need help?</strong>
            <p>Ask MedAI Assistant</p>
          </div>

        </div>

      </aside>


      {/* ================= MAIN DASHBOARD ================= */}

      <main className="medai-dashboard-main">

        {/* TOPBAR */}

        <header className="dashboard-topbar">

          <div>

            <p className="dashboard-breadcrumb">
              Dashboard / Overview
            </p>

            <h1>
              Good morning👋
            </h1>

            <p className="dashboard-subtitle">
              Here's your latest health intelligence summary.
            </p>

          </div>


          <div className="dashboard-actions">

            <button className="notification-btn">
              ♢
              <span></span>
            </button>

            <div className="user-profile">

              <div className="user-avatar">
                S
              </div>

              <div>
                <strong>Saloni Verma</strong>
                <small>My Profile</small>
              </div>

            </div>

          </div>

        </header>


        {/* ================= ASSESSMENT BANNER ================= */}

        <section className="assessment-banner">

          <div className="banner-content">

            <span className="banner-label">
              AI HEALTH ASSESSMENT
            </span>

            <h2>
              Understand your health risks
              <br />
              with <span>MedAI</span>.
            </h2>

            <p>
              Complete a short health assessment and receive
              an AI-powered risk analysis with explainable insights.
            </p>

            <button
              className="primary-dashboard-btn"
              onClick={() => window.location.href = "/assessment"}
            >
               Start Assessment →
            </button>
          </div>


          <div className="banner-visual">

            <div className="ai-circle">

              <div className="ai-core">
                M
              </div>

              <div className="orbit orbit-one"></div>

              <div className="orbit orbit-two"></div>

            </div>

          </div>

        </section>


        {/* ================= STATISTICS ================= */}

        <section className="dashboard-stats">

          {/* Risk */}

          <div className="stat-card">

            <div className="stat-card-top">

              <span>
                Latest Risk
              </span>

              <div className="stat-icon risk-icon">
                ◉
              </div>

            </div>

            <h3>
              24.8%
            </h3>

            <p className="stat-positive">
              ↓ 4.2% from last assessment
            </p>

          </div>


          {/* Health Score */}

          <div className="stat-card">

            <div className="stat-card-top">

              <span>
                Health Score
              </span>

              <div className="stat-icon health-icon">
                ♥
              </div>

            </div>

            <h3>
              78<span>/100</span>
            </h3>

            <p className="stat-positive">
              ↑ 6 points this month
            </p>

          </div>


          {/* Assessments */}

          <div className="stat-card">

            <div className="stat-card-top">

              <span>
                Assessments
              </span>

              <div className="stat-icon assessment-icon">
                ▣
              </div>

            </div>

            <h3>
              08
            </h3>

            <p className="stat-neutral">
              Total completed
            </p>

          </div>


          {/* AI Conversations */}

          <div className="stat-card">

            <div className="stat-card-top">

              <span>
                AI Conversations
              </span>

              <div className="stat-icon ai-icon">
                ✦
              </div>

            </div>

            <h3>
              24
            </h3>

            <p className="stat-neutral">
              With MedAI Assistant
            </p>

          </div>

        </section>


        {/* ================= MAIN GRID ================= */}

        <section className="dashboard-grid">


          {/* ================= RISK CHART ================= */}

          <div className="dashboard-card risk-chart-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  HEALTH TREND
                </span>

                <h3>
                  Risk probability
                </h3>

              </div>

              <button className="period-btn">
                Last 6 months ▾
              </button>

            </div>


            <div className="risk-chart">

              <div className="chart-y-axis">

                <span>60%</span>
                <span>40%</span>
                <span>20%</span>
                <span>0%</span>

              </div>


              <div className="chart-area">

                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>


                <svg
                  className="risk-line"
                  viewBox="0 0 600 220"
                  preserveAspectRatio="none"
                >

                  <defs>

                    <linearGradient
                      id="riskGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopOpacity="0.25"
                      />

                      <stop
                        offset="100%"
                        stopOpacity="0"
                      />

                    </linearGradient>

                  </defs>


                  <path
                    d="
                      M20 70
                      C80 90, 110 60, 160 105
                      C210 145, 240 125, 290 140
                      C340 155, 370 120, 420 135
                      C470 150, 510 110, 580 125
                      L580 220
                      L20 220
                      Z
                    "
                    fill="url(#riskGradient)"
                  />


                  <path
                    d="
                      M20 70
                      C80 90, 110 60, 160 105
                      C210 145, 240 125, 290 140
                      C340 155, 370 120, 420 135
                      C470 150, 510 110, 580 125
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />


                  <circle
                    cx="580"
                    cy="125"
                    r="7"
                  />

                </svg>


                <div className="chart-months">

                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>

                </div>

              </div>

            </div>

          </div>


          {/* ================= HEALTH SUMMARY ================= */}

          <div className="dashboard-card health-summary-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  HEALTH PROFILE
                </span>

                <h3>
                  Your health summary
                </h3>

              </div>

              <button className="more-btn">
                •••
              </button>

            </div>


            <div className="health-summary-list">


              <div className="health-summary-item">

                <div className="summary-icon">
                  ⚖
                </div>

                <div>

                  <span>
                    BMI
                  </span>

                  <strong>
                    24.8
                  </strong>

                </div>

                <small>
                  Normal
                </small>

              </div>


              <div className="health-summary-item">

                <div className="summary-icon">
                  ♥
                </div>

                <div>

                  <span>
                    General Health
                  </span>

                  <strong>
                    Very Good
                  </strong>

                </div>

                <small>
                  Good
                </small>

              </div>


              <div className="health-summary-item">

                <div className="summary-icon">
                  ⌁
                </div>

                <div>

                  <span>
                    Physical Activity
                  </span>

                  <strong>
                    Regular
                  </strong>

                </div>

                <small>
                  Active
                </small>

              </div>


              <div className="health-summary-item">

                <div className="summary-icon">
                  ◷
                </div>

                <div>

                  <span>
                    Age Group
                  </span>

                  <strong>
                    25–34
                  </strong>

                </div>

                <small>
                  Profile
                </small>

              </div>

            </div>

          </div>

        </section>


        {/* ================= BOTTOM GRID ================= */}

        <section className="bottom-dashboard-grid">


          {/* RECENT ASSESSMENT */}

          <div className="dashboard-card recent-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  ACTIVITY
                </span>

                <h3>
                  Recent assessment
                </h3>

              </div>

              <button className="view-all-btn">
                View all →
              </button>

            </div>


            <div className="recent-assessment">


              <div className="recent-date">

                <strong>
                  18
                </strong>

                <span>
                  SEP
                </span>

              </div>


              <div className="recent-info">

                <h4>
                  Diabetes Risk Assessment
                </h4>

                <p>
                  21 health indicators analyzed
                </p>

              </div>


              <div className="recent-risk">

                <span>
                  Risk Probability
                </span>

                <strong>
                  24.8%
                </strong>

              </div>


              <div className="status-badge">
                Completed
              </div>

            </div>

          </div>


          {/* AI ASSISTANT */}

          <div className="dashboard-card assistant-card">

            <div className="assistant-small-visual">

              <div className="assistant-orb">
                ✦
              </div>

            </div>


            <div className="assistant-content">

              <span className="card-label">
                MEDAI ASSISTANT
              </span>

              <h3>
                Have a health question?
              </h3>

              <p>
                Talk with your AI health assistant and
                get clear explanations about your results.
              </p>

              <button className="assistant-btn">
                Ask MedAI →
              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;