
import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const API_BASE = "http://127.0.0.1:8000";

const GENERAL_HEALTH_LABELS = {
  1: "Excellent",
  2: "Very Good",
  3: "Good",
  4: "Fair",
  5: "Poor",
};

const AGE_CATEGORY_LABELS = {
  1: "18–24",
  2: "25–29",
  3: "30–34",
  4: "35–39",
  5: "40–44",
  6: "45–49",
  7: "50–54",
  8: "55–59",
  9: "60–64",
  10: "65–69",
  11: "70–74",
  12: "75–79",
  13: "80+",
};

function readLocalJSON(key) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error(`Could not read ${key}:`, error);
    return null;
  }
}

function getProbability(result) {
  if (
    result?.probability === undefined ||
    result?.probability === null ||
    result.probability === ""
  ) {
    return null;
  }

  const value = Number(result.probability);

  return Number.isFinite(value) ? value * 100 : null;
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getRiskLabel(probability, threshold) {
  if (probability === null) {
    return "No assessment yet";
  }

  const cutoff =
    threshold !== undefined &&
    threshold !== null &&
    Number.isFinite(Number(threshold))
      ? Number(threshold) * 100
      : 25;

  return probability >= cutoff
    ? "Higher estimated risk"
    : "Lower estimated risk";
}

function Dashboard() {
  const [chatCount, setChatCount] = useState(0);
  const [latestResult, setLatestResult] = useState(() =>
    readLocalJSON("medai_latest_prediction")
  );

  const [latestAssessment, setLatestAssessment] = useState(() =>
    readLocalJSON("medai_latest_assessment")
  );

  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [assessmentCount, setAssessmentCount] = useState(0);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadAssessmentHistory() {
      const userId = localStorage.getItem("medai_user_id");

      if (!userId || userId === "demo-user") {
        setHistoryError(
          "Log in with your registered account to load saved history."
        );
        setHistoryLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE}/user/${encodeURIComponent(userId)}/history`
        );

        if (!response.ok) {
          throw new Error(
            `Assessment history request failed: ${response.status}`
          );
        }

        const data = await response.json();

        if (cancelled) return;

        const history = Array.isArray(data.history)
          ? data.history
          : Array.isArray(data.assessments)
          ? data.assessments
          : [];

        setAssessmentHistory(history);

        const serverCount = Number(data.total_assessments);

        setAssessmentCount(
          Number.isFinite(serverCount) && serverCount >= 0
            ? serverCount
            : history.length
        );

        setHistoryError("");

        if (history.length > 0) {
          const latest = history[0];

          const assessment =
            latest.health_data ||
            latest.assessment_data ||
            latest.assessment ||
            latest.features ||
            null;

          if (assessment) {
            setLatestAssessment(assessment);

            localStorage.setItem(
              "medai_latest_assessment",
              JSON.stringify(assessment)
            );
          }

          const prediction = {
            prediction: latest.prediction,
            probability: latest.probability,
            threshold: latest.threshold,
            top_factors: latest.top_factors || [],
          };

          setLatestResult(prediction);

          localStorage.setItem(
            "medai_latest_prediction",
            JSON.stringify(prediction)
          );
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Could not load assessment history:",
            error
          );

          setHistoryError(
            "Assessment history could not be loaded. Showing saved data where available."
          );
        }
      } finally {
        if (!cancelled) {
          setHistoryLoading(false);
        }
      }
    }

    loadAssessmentHistory();

    return () => {
      cancelled = true;
    };
  }, []);

  const riskProbability = getProbability(latestResult);
  useEffect(() => {
  const userId = localStorage.getItem("medai_user_id");

  if (!userId) return;

  fetch(`http://127.0.0.1:8000/user/${userId}/chat-count`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch chat count");
      }
      return response.json();
    })
    .then((data) => {
      setChatCount(data.count);
    })
    .catch((error) => {
      console.error("Chat count error:", error);
    });
}, []);

  const latestRisk =
    riskProbability !== null
      ? `${riskProbability.toFixed(1)}%`
      : "—";

  const riskLabel = getRiskLabel(
    riskProbability,
    latestResult?.threshold
  );

  const bmi = latestAssessment?.BMI ?? "—";

  const healthCode = latestAssessment?.GenHlth;

  const generalHealth =
    healthCode !== undefined && healthCode !== null
      ? GENERAL_HEALTH_LABELS[Number(healthCode)] ||
        String(healthCode)
      : "—";

  const activityCode = latestAssessment?.PhysActivity;

  const physicalActivity =
    activityCode === undefined || activityCode === null
      ? "—"
      : Number(activityCode) === 1
      ? "Active"
      : Number(activityCode) === 0
      ? "Low Activity"
      : String(activityCode);

  const ageCode = latestAssessment?.Age;

  const ageGroup =
    ageCode !== undefined && ageCode !== null
      ? AGE_CATEGORY_LABELS[Number(ageCode)] ||
        String(ageCode)
      : "—";

  const latestHistory = assessmentHistory[0];

  // Prepare valid historical prediction points in chronological order.
  const chartHistory = [...assessmentHistory]
    .filter(
      (item) =>
        item.probability !== undefined &&
        item.probability !== null &&
        item.probability !== "" &&
        Number.isFinite(Number(item.probability))
    )
    .sort(
      (a, b) =>
        new Date(a.created_at || 0).getTime() -
        new Date(b.created_at || 0).getTime()
    );

  const chartPoints = chartHistory.map((item) => ({
    date: item.created_at,
    probability: Number(item.probability) * 100,
  }));

  // All chart variables are defined before the component's return.
  const chartMax = Math.max(
    20,
    Math.ceil(
      Math.max(
        ...chartPoints.map((point) => point.probability),
        0
      ) / 20
    ) * 20
  );

  const chartCoords = chartPoints.map((point, index) => ({
    ...point,
    x:
      chartPoints.length === 1
        ? 300
        : 20 + (index / (chartPoints.length - 1)) * 560,
    y: 200 - (point.probability / chartMax) * 180,
  }));

  const chartLinePoints = chartCoords
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  const chartAreaPath =
    chartCoords.length > 1
      ? `M ${chartCoords[0].x},200 L ${chartCoords
          .map((point) => `${point.x},${point.y}`)
          .join(" L ")} L ${chartCoords[chartCoords.length - 1].x},200 Z`
      : "";

  const chartYAxisLabels = [
    chartMax,
    chartMax * (2 / 3),
    chartMax * (1 / 3),
    0,
  ];

  function goTo(path) {
    window.location.href = path;
  }

  function scrollToSection(id) {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <div className="dashboard-page" id="overview">
      {/* SIDEBAR */}
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

          <a
            className="nav-item"
            href="#results"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("results");
            }}
          >
            <span>◉</span>
            Results
          </a>

          <a className="nav-item" href="/assistant">
            <span>✦</span>
            AI Assistant
          </a>

          <a
            className="nav-item"
            href="#history"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("history");
            }}
          >
            <span>↗</span>
            History
          </a>

          <a
            className="nav-item"
            href="#reports"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("reports");
            }}
          >
            <span>▤</span>
            Reports
          </a>

          <div className="nav-divider" />

          <a
            className="nav-item"
            href="#profile"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("profile");
            }}
          >
            <span>◯</span>
            Profile
          </a>

          <a
            className="nav-item"
            href="#settings"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("settings");
            }}
          >
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

      {/* MAIN DASHBOARD */}
      <main className="medai-dashboard-main">
        {/* TOPBAR */}
        <header className="dashboard-topbar">
          <div>
            <p className="dashboard-breadcrumb">
              Dashboard / Overview
            </p>
            <h1>Good morning👋</h1>
            <p className="dashboard-subtitle">
              Here's your latest health intelligence summary.
            </p>
          </div>

          <div className="dashboard-actions">
            <button
              className="notification-btn"
              type="button"
              aria-label="Notifications"
            >
              ♢
              <span />
            </button>

            <div className="user-profile" id="profile">
              <div className="user-avatar">S</div>
              <div>
                <strong>Saloni Verma</strong>
                <small>My Profile</small>
              </div>
            </div>
          </div>
        </header>

        {historyError && (
          <div className="dashboard-notice" role="status">
            {historyError}
          </div>
        )}

        {/* ASSESSMENT BANNER */}
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
              type="button"
              onClick={() => goTo("/assessment")}
            >
              Start Assessment →
            </button>
          </div>

          <div className="banner-visual">
            <div className="ai-circle">
              <div className="ai-core">M</div>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-card-top">
              <span>Latest Risk</span>
              <div className="stat-icon risk-icon">◉</div>
            </div>

            <h3>{historyLoading ? "..." : latestRisk}</h3>

            <p className="stat-positive">
              {historyLoading
                ? "Loading prediction..."
                : latestResult
                ? riskLabel
                : "Complete an assessment to view risk"}
            </p>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span>Health Score</span>
              <div className="stat-icon health-icon">♥</div>
            </div>
<h3>—<span>/100</span></h3>
<p className="stat-neutral">
  Health score not yet calculated
</p>

          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span>Assessments</span>
              <div className="stat-icon assessment-icon">▣</div>
            </div>

            <h3>
              {historyLoading
                ? "..."
                : String(assessmentCount).padStart(2, "0")}
            </h3>

            <p className="stat-neutral">Total completed</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span>AI Conversations</span>
              <div className="stat-icon ai-icon">✦</div>
            </div>

            <h3>{chatCount}</h3>

<p className="stat-neutral">
  With MedAI Assistant
</p>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="dashboard-grid">
          {/* REAL ASSESSMENT RISK CHART */}
          <div
            className="dashboard-card risk-chart-card"
            id="results"
          >
            <div className="card-header">
              <div>
                <span className="card-label">HEALTH TREND</span>
                <h3>Risk probability</h3>
              </div>

              <button
                className="period-btn"
                type="button"
                title="Based on saved assessment history"
              >
                Assessment history
              </button>
            </div>

            <div className="risk-chart">
              <div className="chart-y-axis">
                {chartYAxisLabels.map((label, index) => (
                  <span key={index}>
                    {Number(label.toFixed(1))}%
                  </span>
                ))}
              </div>

              <div className="chart-area">
                <div className="chart-grid-line" />
                <div className="chart-grid-line" />
                <div className="chart-grid-line" />
                <div className="chart-grid-line" />

                <svg
                  className="risk-line"
                  viewBox="0 0 600 220"
                  preserveAspectRatio="none"
                  role="img"
                  aria-label="Risk probability from saved health assessments"
                >
                  <defs>
                    <linearGradient
                      id="riskGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopOpacity="0.25" />
                      <stop offset="100%" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {chartCoords.length > 1 && (
                    <path
                      d={chartAreaPath}
                      fill="url(#riskGradient)"
                    />
                  )}

                  {chartCoords.length > 1 && (
                    <polyline
                      points={chartLinePoints}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {chartCoords.map((point, index) => (
                    <circle
                      key={`${point.date}-${index}`}
                      cx={point.x}
                      cy={point.y}
                      r="6"
                      fill="currentColor"
                    >
                      <title>
                        {`${formatDate(point.date)}: ${point.probability.toFixed(1)}% risk`}
                      </title>
                    </circle>
                  ))}

                  {chartCoords.length === 0 && (
                    <text
                      x="300"
                      y="110"
                      textAnchor="middle"
                      fill="currentColor"
                      fontSize="14"
                    >
                      Complete an assessment to see your trend
                    </text>
                  )}
                </svg>

                <div className="chart-months">
                  {chartPoints.length > 0 ? (
                    chartPoints.map((point, index) => (
                      <span key={`${point.date}-${index}`}>
                        {formatDate(point.date)}
                      </span>
                    ))
                  ) : (
                    <span>No assessment history</span>
                  )}
                </div>
              </div>
            </div>

            <p className="chart-data-note">
              {historyLoading
                ? "Loading saved assessment history..."
                : chartPoints.length === 0
                ? "Your saved assessment history will appear here."
                : `${chartPoints.length} saved assessment${
                    chartPoints.length === 1 ? "" : "s"
                  } shown. Each point represents an actual recorded risk probability.`}
            </p>
          </div>

          {/* HEALTH SUMMARY */}
          <div className="dashboard-card health-summary-card">
            <div className="card-header">
              <div>
                <span className="card-label">HEALTH PROFILE</span>
                <h3>Your health summary</h3>
              </div>

              <button
                className="more-btn"
                type="button"
                aria-label="More health summary options"
              >
                •••
              </button>
            </div>

            <div className="health-summary-list">
              <div className="health-summary-item">
                <div className="summary-icon">⚖</div>

                <div>
                  <span>BMI</span>
                  <strong>{bmi}</strong>
                </div>

                <small>
                  {bmi !== "—"
                    ? Number(bmi) < 18.5
                      ? "Below range"
                      : Number(bmi) < 25
                      ? "Normal"
                      : Number(bmi) < 30
                      ? "Above range"
                      : "High"
                    : "No data"}
                </small>
              </div>

              <div className="health-summary-item">
                <div className="summary-icon">♥</div>

                <div>
                  <span>General Health</span>
                  <strong>{generalHealth}</strong>
                </div>

                <small>
                  {generalHealth === "—" ? "No data" : "Reported"}
                </small>
              </div>

              <div className="health-summary-item">
                <div className="summary-icon">⌁</div>

                <div>
                  <span>Physical Activity</span>
                  <strong>{physicalActivity}</strong>
                </div>

                <small>
                  {physicalActivity === "Active"
                    ? "Active"
                    : physicalActivity === "Low Activity"
                    ? "Low activity"
                    : "Profile"}
                </small>
              </div>

              <div className="health-summary-item">
                <div className="summary-icon">◷</div>

                <div>
                  <span>Age Group</span>
                  <strong>{ageGroup}</strong>
                </div>

                <small>
                  {ageGroup === "—" ? "No data" : "Profile"}
                </small>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM GRID */}
        <section className="bottom-dashboard-grid">
          {/* RECENT ASSESSMENT */}
          <div
            className="dashboard-card recent-card"
            id="history"
          >
            <div className="card-header">
              <div>
                <span className="card-label">ACTIVITY</span>
                <h3>Recent assessment</h3>
              </div>

              <button
                className="view-all-btn"
                type="button"
                onClick={() => scrollToSection("history")}
              >
                View all →
              </button>
            </div>

            {historyLoading ? (
              <p className="recent-info">
                Loading assessment history...
              </p>
            ) : latestResult ? (
              <div className="recent-assessment">
                <div className="recent-date">
                  <strong>
                    {latestHistory?.created_at
                      ? formatDate(latestHistory.created_at)
                      : "SAVED"}
                  </strong>
                  <span>LATEST</span>
                </div>

                <div className="recent-info">
                  <h4>Diabetes Risk Assessment</h4>
                  <p>21 health indicators analyzed</p>
                </div>

                <div className="recent-risk">
                  <span>Risk Probability</span>
                  <strong>{latestRisk}</strong>
                </div>

                <div className="status-badge">Completed</div>
              </div>
            ) : (
              <div className="recent-assessment">
                <div className="recent-date">
                  <strong>—</strong>
                  <span>LATEST</span>
                </div>

                <div className="recent-info">
                  <h4>No assessment yet</h4>
                  <p>Complete your first health assessment.</p>
                </div>

                <button
                  className="primary-dashboard-btn"
                  type="button"
                  onClick={() => goTo("/assessment")}
                >
                  Start →
                </button>
              </div>
            )}

            {assessmentHistory.length > 1 && (
              <div className="recent-history-list">
                <h4>Previous assessments</h4>

                {assessmentHistory.slice(1, 4).map((item, index) => {
                  const probability =
                    item.probability !== undefined &&
                    item.probability !== null &&
                    item.probability !== ""
                      ? Number(item.probability) * 100
                      : null;

                  return (
                    <div
                      className="recent-assessment"
                      key={
                        item._id ||
                        item.id ||
                        `${item.created_at}-${index}`
                      }
                    >
                      <div className="recent-date">
                        <strong>{formatDate(item.created_at)}</strong>
                      </div>

                      <div className="recent-info">
                        <h4>Diabetes Risk Assessment</h4>
                        <p>Saved assessment</p>
                      </div>

                      <div className="recent-risk">
                        <span>Risk Probability</span>
                        <strong>
                          {probability !== null &&
                          Number.isFinite(probability)
                            ? `${probability.toFixed(1)}%`
                            : "—"}
                        </strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* AI ASSISTANT */}
          <div
            className="dashboard-card assistant-card"
            id="assistant"
          >
            <div className="assistant-small-visual">
              <div className="assistant-orb">✦</div>
            </div>

            <div className="assistant-content">
              <span className="card-label">MEDAI ASSISTANT</span>
              <h3>Have a health question?</h3>

              <p>
                Talk with your AI health assistant and get
                clear explanations about your results.
              </p>

              <button
                className="assistant-btn"
                type="button"
                onClick={() => goTo("/assistant")}
              >
                Ask MedAI →
              </button>
            </div>
          </div>
        </section>

        <footer className="dashboard-footer">
          <span>
            © {new Date().getFullYear()} MedAI Health Intelligence
          </span>

          <span>
            Risk estimates are informational, not a medical diagnosis.
          </span>
        </footer>

        <div id="reports" />
        <div id="settings" />
      </main>
    </div>
  );
}

export default Dashboard;
