import HealthAssessment from "./pages/HealthAssessment";
import "./pages/Login.css";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="medai-app">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-mark">✚</span>
          <span>MedAI</span>
        </div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#assessment">Assessment</a>
          <a href="#technology">Technology</a>
          <a href="#assistant">AI Assistant</a>
          <a href="#safety">Safety</a>
        </nav>

        <div className="nav-actions">
          <a href="/login" className="login-link">Log in</a>
          <a href="#assessment" className="nav-button">
            Get Started →
          </a>
        </div>
      </header>

      <main>

        {/* ================= HERO ================= */}
        <section className="hero" id="home">

          <div className="hero-content">

            <div className="hero-badge">
              <span className="status-dot"></span>
              AI-powered health intelligence
            </div>

            <h1>
              Your health.
              <br />
              <span>Understood by AI.</span>
            </h1>

            <p>
              MedAI combines machine learning, explainable AI and
              intelligent assistance to transform your health information
              into clear, understandable risk insights.
            </p>

            <div className="hero-buttons">
              <a href="#assessment" className="primary-button">
                Start Health Assessment
                <span>→</span>
              </a>

              <a href="#assistant" className="secondary-button">
                ✦ Talk to MedAI
              </a>
            </div>

            <div className="hero-stats">

              <div className="hero-stat">
                <strong>AI</strong>
                <span>Powered</span>
              </div>

              <div className="hero-stat">
                <strong>ML</strong>
                <span>Risk Analysis</span>
              </div>

              <div className="hero-stat">
                <strong>XAI</strong>
                <span>Explainable</span>
              </div>

              <div className="hero-stat">
                <strong>24/7</strong>
                <span>AI Assistant</span>
              </div>

            </div>
          </div>

          {/* AI VISUAL */}
          <div className="hero-visual">

            <div className="glow-circle"></div>

            <div className="ai-orb">

              <div className="orb-ring ring-one"></div>
              <div className="orb-ring ring-two"></div>
              <div className="orb-ring ring-three"></div>

              <div className="orb-core">
                <div className="orb-symbol">✚</div>
              </div>

            </div>

            <div className="floating-card card-risk">
              <span className="card-icon">⌁</span>

              <div>
                <small>Risk Analysis</small>
                <strong>AI Assessment</strong>
              </div>
            </div>

            <div className="floating-card card-ai">
              <span className="card-icon">✦</span>

              <div>
                <small>MedAI Assistant</small>
                <strong>Ready to help</strong>
              </div>
            </div>

            <div className="floating-card card-health">
              <span className="card-icon">♥</span>

              <div>
                <small>Health Insights</small>
                <strong>Personalized</strong>
              </div>
            </div>

            <div className="visual-label">
              <span className="pulse"></span>
              Intelligent Health Analysis
            </div>

          </div>
        </section>


        {/* ================= TRUST BAR ================= */}
        <section className="trust-bar">

          <div>
            <span>✓</span>
            Machine Learning
          </div>

          <div>
            <span>✓</span>
            Explainable AI
          </div>

          <div>
            <span>✓</span>
            Secure Architecture
          </div>

          <div>
            <span>✓</span>
            Research Driven
          </div>

        </section>


        {/* ================= HEALTH CATEGORIES ================= */}
        <section className="section categories-section">

          <div className="section-heading">
            <span className="eyebrow">HEALTH INTELLIGENCE</span>

            <h2>
              One platform for
              <br />
              smarter health insights.
            </h2>

            <p>
              MedAI is designed as an expandable health intelligence
              platform with multiple assessment and assistance modules.
            </p>
          </div>

          <div className="category-grid">

            <div className="category-card active-category">
              <div className="category-icon">◉</div>

              <span className="category-status">AVAILABLE</span>

              <h3>Diabetes Risk</h3>

              <p>
                Machine learning based diabetes risk assessment using
                health and lifestyle indicators.
              </p>

              <a href="#assessment">Start Assessment →</a>
            </div>

            <div className="category-card">
              <div className="category-icon">♥</div>

              <span className="category-status coming">COMING SOON</span>

              <h3>Heart Health</h3>

              <p>
                Future cardiovascular risk analysis and personalized
                health insights.
              </p>

              <span className="category-link">Explore module →</span>
            </div>

            <div className="category-card">
              <div className="category-icon">◌</div>

              <span className="category-status coming">COMING SOON</span>

              <h3>Lifestyle Health</h3>

              <p>
                Understand how activity, nutrition and lifestyle
                indicators influence health.
              </p>

              <span className="category-link">Explore module →</span>
            </div>

            <div className="category-card">
              <div className="category-icon">✦</div>

              <span className="category-status coming">EXPANDING</span>

              <h3>AI Health Assistant</h3>

              <p>
                Ask questions and understand your assessment results
                through conversational AI.
              </p>

              <a href="#assistant">Talk to AI →</a>
            </div>

          </div>
        </section>


        {/* ================= ASSESSMENT ================= */}
        <section className="section assessment-section" id="assessment">

          <div className="assessment-layout">

            <div className="assessment-info">

              <span className="eyebrow">AI HEALTH ASSESSMENT</span>

              <h2>
                Turn health information
                <span> into meaningful insight.</span>
              </h2>

              <p>
                Complete a guided assessment using your health,
                lifestyle and medical indicators. MedAI processes
                the information through its machine learning model
                and returns a probability-based risk assessment.
              </p>

              <div className="assessment-points">

                <div>
                  <span>01</span>
                  <p>Guided health questionnaire</p>
                </div>

                <div>
                  <span>02</span>
                  <p>Machine learning prediction</p>
                </div>

                <div>
                  <span>03</span>
                  <p>Explainable AI analysis</p>
                </div>

                <div>
                  <span>04</span>
                  <p>Personalized result explanation</p>
                </div>

              </div>
            <a href="/assessment" className="primary-button light-button">
                Start Assessment →
            </a>

            </div>


            <div className="assessment-preview">

              <div className="preview-header">
                <div>
                  <small>MEDAI ASSESSMENT</small>
                  <h3>Health Profile</h3>
                </div>

                <span className="secure-badge">● Secure</span>
              </div>

              <div className="progress-container">
                <div className="progress-top">
                  <span>Assessment progress</span>
                  <strong>64%</strong>
                </div>

                <div className="progress-bar">
                  <div></div>
                </div>
              </div>

              <div className="input-preview-grid">

                <div className="input-preview">
                  <small>General Health</small>
                  <strong>Very Good</strong>
                </div>

                <div className="input-preview">
                  <small>BMI</small>
                  <strong>24.8</strong>
                </div>

                <div className="input-preview">
                  <small>Physical Activity</small>
                  <strong>Regular</strong>
                </div>

                <div className="input-preview">
                  <small>Age Group</small>
                  <strong>25–34</strong>
                </div>

              </div>

              <div className="assessment-footer">
                <span>AI analysis ready</span>
                <span>→</span>
              </div>

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}
        <section className="section how-section" id="how-it-works">

          <div className="section-heading centered">

            <span className="eyebrow">HOW MEDAI WORKS</span>

            <h2>
              From your data
              <br />
              to an understandable result.
            </h2>

            <p>
              A transparent multi-stage process combines machine learning
              and explainable AI.
            </p>

          </div>


          <div className="steps-grid">

            <div className="step-card">
              <span className="step-number">01</span>
              <div className="step-icon">⌘</div>
              <h3>Provide</h3>
              <p>
                Enter relevant health, lifestyle and medical indicators
                through the guided assessment.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number">02</span>
              <div className="step-icon">◈</div>
              <h3>Predict</h3>
              <p>
                The XGBoost machine learning model analyzes the provided
                indicators and estimates risk probability.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number">03</span>
              <div className="step-icon">✦</div>
              <h3>Explain</h3>
              <p>
                SHAP-based explainability helps identify the factors
                influencing the model prediction.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number">04</span>
              <div className="step-icon">◎</div>
              <h3>Understand</h3>
              <p>
                The AI assistant translates technical results into
                simple and understandable information.
              </p>
            </div>

          </div>

        </section>


        {/* ================= TECHNOLOGY ================= */}
        <section className="section technology-section" id="technology">

          <div className="technology-layout">

            <div className="technology-copy">

              <span className="eyebrow">THE TECHNOLOGY</span>

              <h2>
                AI that doesn't
                <span> hide the reasoning.</span>
              </h2>

              <p>
                MedAI is designed around machine learning and
                explainability. Instead of showing only a prediction,
                the system is designed to help users understand the
                factors behind the model output.
              </p>

              <div className="tech-tags">

                <span>Python</span>
                <span>XGBoost</span>
                <span>SHAP</span>
                <span>FastAPI</span>
                <span>React</span>
                <span>MongoDB</span>
                <span>LLM</span>

              </div>

            </div>


            <div className="tech-dashboard">

              <div className="tech-dashboard-header">
                <div>
                  <small>MODEL INSIGHT</small>
                  <strong>Explainable AI</strong>
                </div>

                <span>LIVE MODEL</span>
              </div>

              <div className="model-score">
                <div className="score-circle">
                  <strong>82</strong>
                  <span>AUC</span>
                </div>

                <div>
                  <small>Model performance</small>
                  <h3>ROC-AUC</h3>
                  <p>Machine learning evaluation metric</p>
                </div>
              </div>

              <div className="factor-list">

                <div>
                  <span>GenHlth</span>
                  <div className="factor-line">
                    <i style={{ width: "88%" }}></i>
                  </div>
                  <strong>High</strong>
                </div>

                <div>
                  <span>HighBP</span>
                  <div className="factor-line">
                    <i style={{ width: "74%" }}></i>
                  </div>
                  <strong>High</strong>
                </div>

                <div>
                  <span>Age</span>
                  <div className="factor-line">
                    <i style={{ width: "61%" }}></i>
                  </div>
                  <strong>Medium</strong>
                </div>

                <div>
                  <span>BMI</span>
                  <div className="factor-line">
                    <i style={{ width: "52%" }}></i>
                  </div>
                  <strong>Medium</strong>
                </div>

              </div>

              <div className="xai-note">
                ✦ Factors shown are model explanations, not medical diagnoses.
              </div>

            </div>

          </div>

        </section>


        {/* ================= SCANNER ================= */}
        <section className="section scanner-section">

          <div className="section-heading centered">

            <span className="eyebrow">INTERACTIVE EXPERIENCE</span>

            <h2>
              Meet the MedAI
              <br />
              health scanner.
            </h2>

            <p>
              A futuristic interface designed to make health assessment
              feel simple, visual and engaging.
            </p>

          </div>


          <div className="scanner-container">

            <div className="scanner-visual">

              <div className="scanner-ring ring-a"></div>
              <div className="scanner-ring ring-b"></div>
              <div className="scanner-ring ring-c"></div>

              <div className="finger-icon">
                ☝
              </div>

              <div className="scan-line"></div>

              <div className="scanner-status">
                <span className="pulse"></span>
                READY TO SCAN
              </div>

            </div>


            <div className="scanner-info">

              <span className="eyebrow">SIMULATED DEMO</span>

              <h3>
                A glimpse into the
                future of health interfaces.
              </h3>

              <p>
                This visual scanner is an interactive UI demonstration.
                It does not actually measure glucose, blood pressure,
                oxygen levels or diagnose medical conditions.
              </p>

              <div className="scanner-stages">

                <div>
                  <span>01</span>
                  <strong>Place Finger</strong>
                </div>

                <div>
                  <span>02</span>
                  <strong>Scanning</strong>
                </div>

                <div>
                  <span>03</span>
                  <strong>AI Analysis</strong>
                </div>

                <div>
                  <span>04</span>
                  <strong>Complete</strong>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= DASHBOARD PREVIEW ================= */}
        <section className="section dashboard-section">

          <div className="section-heading">

            <span className="eyebrow">YOUR HEALTH DASHBOARD</span>

            <h2>
              Everything important,
              <br />
              in one place.
            </h2>

            <p>
              Track assessments, review insights and understand changes
              over time through a personalized dashboard.
            </p>

          </div>


          <div className="dashboard-preview">

            <aside className="dashboard-sidebar">

              <div className="mini-logo">
                <span>✚</span>
                MedAI
              </div>

              <div className="side-item active">⌂ Overview</div>
              <div className="side-item">◉ Assessment</div>
              <div className="side-item">◈ Results</div>
              <div className="side-item">✦ AI Assistant</div>
              <div className="side-item">◌ History</div>
              <div className="side-item">▣ Reports</div>

            </aside>


            <div className="dashboard-main">

              <div className="dashboard-top">

                <div>
                  <small>GOOD MORNING</small>
                  <h3>Your Health Overview</h3>
                </div>

                <button>+ New Assessment</button>

              </div>


              <div className="dashboard-cards">

                <div className="dash-card">
                  <small>Latest Risk</small>
                  <strong>24.8%</strong>
                  <span>AI estimated probability</span>
                </div>

                <div className="dash-card">
                  <small>Assessments</small>
                  <strong>08</strong>
                  <span>Total completed</span>
                </div>

                <div className="dash-card">
                  <small>Health Score</small>
                  <strong>78</strong>
                  <span>Overall indicators</span>
                </div>

              </div>


              <div className="dashboard-bottom">

                <div className="trend-card">

                  <div className="chart-header">
                    <div>
                      <small>RISK TREND</small>
                      <strong>Assessment history</strong>
                    </div>

                    <span>Last 6 months</span>
                  </div>

                  <div className="fake-chart">

                    <div className="chart-line"></div>

                    <span className="chart-point p1"></span>
                    <span className="chart-point p2"></span>
                    <span className="chart-point p3"></span>
                    <span className="chart-point p4"></span>
                    <span className="chart-point p5"></span>

                  </div>

                </div>


                <div className="recent-card">

                  <small>RECENT ASSESSMENT</small>

                  <h4>Diabetes Risk Assessment</h4>

                  <div className="recent-result">
                    <strong>24.8%</strong>
                    <span>Risk probability</span>
                  </div>

                  <span className="view-result">
                    View result →
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= AI ASSISTANT ================= */}
        <section className="section assistant-section" id="assistant">

          <div className="assistant-layout">

            <div className="assistant-visual">

              <div className="assistant-glow"></div>

              <div className="robot-avatar">
                <div className="robot-head">
                  <div className="robot-eyes">
                    <span></span>
                    <span></span>
                  </div>
                </div>

                <div className="robot-body">
                  <div className="robot-core">✦</div>
                </div>
              </div>

              <div className="voice-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="assistant-state">
                <span className="pulse"></span>
                MedAI is ready
              </div>

            </div>


            <div className="assistant-content">

              <span className="eyebrow">MEET YOUR AI ASSISTANT</span>

              <h2>
                Ask questions.
                <span> Understand your health.</span>
              </h2>

              <p>
                MedAI Assistant is designed to explain your assessment,
                answer general health questions and help you understand
                technical AI results in simple language.
              </p>

              <div className="assistant-features">

                <div>
                  <span>✦</span>
                  <div>
                    <strong>Explain my result</strong>
                    <p>Understand your prediction in simple language.</p>
                  </div>
                </div>

                <div>
                  <span>◉</span>
                  <div>
                    <strong>Ask health questions</strong>
                    <p>Have a conversational health information experience.</p>
                  </div>
                </div>

                <div>
                  <span>◌</span>
                  <div>
                    <strong>Voice interaction</strong>
                    <p>Talk naturally using speech input and audio responses.</p>
                  </div>
                </div>

              </div>

              <a href="/login" className="primary-button">
                Talk to MedAI →
              </a>

            </div>

          </div>

        </section>


        {/* ================= INSIGHTS ================= */}
        <section className="section insights-section">

          <div className="section-heading centered">

            <span className="eyebrow">PERSONALIZED INSIGHTS</span>

            <h2>
              More than a prediction.
            </h2>

            <p>
              MedAI is designed to turn model output into information
              that users can actually understand.
            </p>

          </div>


          <div className="insights-grid">

            <div className="insight-card">
              <span className="insight-number">01</span>
              <h3>Risk Probability</h3>
              <p>
                View the model's estimated probability instead of
                receiving a simple yes-or-no result.
              </p>
            </div>

            <div className="insight-card">
              <span className="insight-number">02</span>
              <h3>Key Factors</h3>
              <p>
                Explore health indicators that contributed to the
                model's prediction.
              </p>
            </div>

            <div className="insight-card">
              <span className="insight-number">03</span>
              <h3>AI Explanation</h3>
              <p>
                Get technical model results translated into
                understandable language.
              </p>
            </div>

            <div className="insight-card">
              <span className="insight-number">04</span>
              <h3>History</h3>
              <p>
                Review previous assessments and monitor your
                assessment history over time.
              </p>
            </div>

          </div>

        </section>


        {/* ================= REPORTS ================= */}
        <section className="section reports-section">

          <div className="reports-layout">

            <div className="reports-content">

              <span className="eyebrow">SMART REPORTS</span>

              <h2>
                Your assessment,
                <span> beautifully organized.</span>
              </h2>

              <p>
                Future MedAI reports will combine the assessment result,
                model explanation, health indicators and safety guidance
                into a structured downloadable report.
              </p>

              <div className="report-features">

                <div>✓ Assessment summary</div>
                <div>✓ Risk probability</div>
                <div>✓ Explainable AI factors</div>
                <div>✓ AI-generated explanation</div>
                <div>✓ Safety information</div>

              </div>

              <a href="/login" className="secondary-button">
                Explore Reports →
              </a>

            </div>


            <div className="report-card">

              <div className="report-top">
                <div className="report-logo">✚</div>

                <div>
                  <small>MEDAI</small>
                  <strong>Health Assessment Report</strong>
                </div>
              </div>

              <div className="report-risk">
                <small>ESTIMATED RISK PROBABILITY</small>
                <strong>24.8%</strong>
              </div>

              <div className="report-bars">

                <div>
                  <span>GenHlth</span>
                  <i style={{ width: "82%" }}></i>
                </div>

                <div>
                  <span>HighBP</span>
                  <i style={{ width: "70%" }}></i>
                </div>

                <div>
                  <span>BMI</span>
                  <i style={{ width: "55%" }}></i>
                </div>

              </div>

              <div className="report-bottom">
                Explainable AI Summary
              </div>

            </div>

          </div>

        </section>


        {/* ================= SAFETY ================= */}
        <section className="section safety-section" id="safety">

          <div className="safety-content">

            <span className="eyebrow">SAFETY & TRANSPARENCY</span>

            <h2>
              AI should inform,
              <span> not replace medical care.</span>
            </h2>

            <p>
              MedAI provides educational risk insights based on the
              information provided by the user. Results are not a
              medical diagnosis and should not replace professional
              healthcare advice.
            </p>

          </div>


          <div className="safety-points">

            <div>
              <span>✓</span>
              <div>
                <strong>Probability-based</strong>
                <p>Results represent model-estimated risk probability.</p>
              </div>
            </div>

            <div>
              <span>✓</span>
              <div>
                <strong>Explainable</strong>
                <p>Model factors can be explored through XAI.</p>
              </div>
            </div>

            <div>
              <span>✓</span>
              <div>
                <strong>Transparent</strong>
                <p>Limitations and safety information are clearly shown.</p>
              </div>
            </div>

          </div>

        </section>


        {/* ================= FAQ ================= */}
        <section className="section faq-section">

          <div className="section-heading centered">

            <span className="eyebrow">FAQ</span>

            <h2>
              Questions about MedAI?
            </h2>

          </div>


          <div className="faq-grid">

            <div className="faq-item">
              <h3>What is MedAI?</h3>
              <p>
                MedAI is an AI-powered health risk assessment platform
                designed for educational and research purposes.
              </p>
            </div>

            <div className="faq-item">
              <h3>Does MedAI diagnose diabetes?</h3>
              <p>
                No. MedAI provides a model-based risk estimate and is
                not a medical diagnostic system.
              </p>
            </div>

            <div className="faq-item">
              <h3>How does the prediction work?</h3>
              <p>
                Health indicators are processed by a machine learning
                model that produces an estimated probability.
              </p>
            </div>

            <div className="faq-item">
              <h3>What is Explainable AI?</h3>
              <p>
                Explainable AI helps users understand which features
                influenced a machine learning prediction.
              </p>
            </div>

          </div>

        </section>


        {/* ================= FINAL CTA ================= */}
        <section className="final-cta">

          <div className="cta-glow"></div>

          <span className="eyebrow">START YOUR JOURNEY</span>

          <h2>
            Understand your health
            <br />
            with intelligent AI.
          </h2>

          <p>
            Explore your health indicators through MedAI's
            machine learning powered assessment experience.
          </p>

          <div className="cta-buttons">

            <a href="/login" className="primary-button light-button">
              Start Assessment →
            </a>

            <a href="#assistant" className="secondary-button cta-secondary">
              Talk to MedAI
            </a>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="footer-main">

          <div className="footer-brand">

            <div className="logo">
              <span className="logo-mark">✚</span>
              <span>MedAI</span>
            </div>

            <p>
              AI-powered health risk assessment,
              explainable insights and intelligent assistance.
            </p>

          </div>


          <div className="footer-column">

            <h4>Product</h4>
            <a href="#assessment">Assessment</a>
            <a href="#technology">Technology</a>
            <a href="#assistant">AI Assistant</a>
            <a href="#safety">Safety</a>

          </div>


          <div className="footer-column">

            <h4>Platform</h4>
            <a href="/dashboard">Dashboard</a>
            <a href="/login">Login</a>
            <a href="/login">Reports</a>
            <a href="/login">History</a>

          </div>


          <div className="footer-column">

            <h4>Resources</h4>
            <a href="#how-it-works">How It Works</a>
            <a href="#technology">AI Technology</a>
            <a href="#safety">Privacy</a>
            <a href="#safety">Disclaimer</a>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 MedAI. Built for educational and research purposes.
          </span>

          <span>
            AI should inform, not replace medical care.
          </span>

        </div>

      </footer>

    </div>
  );
}


function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          <span>✚</span>
          MedAI
        </div>

        <div className="login-content">

          <span className="eyebrow">WELCOME TO MEDAI</span>

          <h1>
            Your health.
            <br />
            <span>Understood by AI.</span>
          </h1>

          <p>
            Sign in to access your health dashboard, assessments,
            AI insights and personalized health information.
          </p>

          <div className="login-form">

            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="login-button"
              onClick={() => navigate("/dashboard")}
            >
              Sign in to MedAI →
            </button>

          </div>

          <div className="login-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="demo-button"
            onClick={() => navigate("/dashboard")}
          >
            Continue with Demo Account
          </button>

          <p className="login-note">
            Authentication will be connected to the MedAI backend
            and MongoDB in the next phase.
          </p>

        </div>

        <Link to="/" className="back-home">
          ← Back to MedAI Home
        </Link>

      </div>

    </div>
  );
}





function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
<Route path="/assessment" element={<HealthAssessment />} />
      </Routes>

    </BrowserRouter>
  );
}


export default App;