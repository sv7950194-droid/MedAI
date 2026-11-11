import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PredictionResult.css";

function PredictionResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state?.result;

  if (!result) {
    return (
      <div className="result-page">
        <div className="result-card">
          <div className="result-icon">!</div>

          <h1>No prediction found</h1>

          <p>
            Please complete the health assessment first to view your
            MedAI risk estimate.
          </p>

          <button
            className="result-primary-button"
            onClick={() => navigate("/assessment")}
          >
            Start Assessment →
          </button>
        </div>
      </div>
    );
  }

  const probability = Number(result.probability) * 100;

  let riskLevel = "Lower estimated risk";
  let riskDescription =
    "The model estimated a lower probability based on the information provided.";

  if (probability >= 50) {
    riskLevel = "Higher estimated risk";
    riskDescription =
      "The model estimated a higher probability based on the information provided.";
  } else if (probability >= 25) {
    riskLevel = "Moderate estimated risk";
    riskDescription =
      "The model estimated a moderate probability based on the information provided.";
  }

  // Save prediction and AI context automatically
  useEffect(() => {
    localStorage.setItem(
      "medai_latest_prediction",
      JSON.stringify(result)
    );

    localStorage.setItem(
      "medai_ai_context",
      JSON.stringify({
        probability: probability,
        riskLevel: riskLevel,
        riskDescription: riskDescription,
        prediction: result.prediction,
        threshold: result.threshold,
        top_factors: result.top_factors || []
      })
    );

    console.log("MedAI AI context saved:", {
      probability,
      riskLevel,
      prediction: result.prediction,
      threshold: result.threshold,
      top_factors: result.top_factors || []
    });
  }, [result, probability, riskLevel, riskDescription]);

  // Save latest prediction + AI context before going to dashboard
  const savePredictionAndGoDashboard = () => {
    localStorage.setItem(
      "medai_latest_prediction",
      JSON.stringify(result)
    );

    localStorage.setItem(
      "medai_ai_context",
      JSON.stringify({
        probability: probability,
        riskLevel: riskLevel,
        riskDescription: riskDescription,
        prediction: result.prediction,
        threshold: result.threshold,
        top_factors: result.top_factors || []
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="result-page">

      {/* TOP BAR */}
      <header className="result-topbar">

        <button
          className="result-logo"
          onClick={savePredictionAndGoDashboard}
        >
          <span>✚</span>
          MedAI
        </button>

        <span className="result-top-title">
          HEALTH ASSESSMENT RESULT
        </span>

        <button
          className="result-dashboard-button"
          onClick={savePredictionAndGoDashboard}
        >
          Dashboard
        </button>

      </header>


      {/* MAIN */}
      <main className="result-main">

        <section className="result-card">

          {/* SUCCESS */}
          <div className="result-success-icon">
            ✓
          </div>

          <span className="result-eyebrow">
            AI ANALYSIS COMPLETE
          </span>

          <h1>Your MedAI Risk Estimate</h1>

          <p className="result-intro">
            The machine learning model has analyzed the health information
            provided in your assessment.
          </p>


          {/* RISK RESULT */}
          <div className="risk-result-box">

            <div className="risk-circle">

              <strong>
                {probability.toFixed(1)}%
              </strong>

              <span>
                Estimated Risk
              </span>

            </div>


            <div className="risk-details">

              <span className="risk-label">
                MODEL ESTIMATE
              </span>

              <h2>
                {riskLevel}
              </h2>

              <p>
                {riskDescription}
              </p>

            </div>

          </div>


          {/* MODEL INFORMATION */}
          <div className="result-info-grid">

            <div className="result-info-card">

              <span>
                Model
              </span>

              <strong>
                XGBoost
              </strong>

            </div>


            <div className="result-info-card">

              <span>
                Threshold
              </span>

              <strong>
                {(Number(result.threshold) * 100).toFixed(0)}%
              </strong>

            </div>


            <div className="result-info-card">

              <span>
                Prediction
              </span>

              <strong>
                {result.prediction === 1
                  ? "Higher-risk class"
                  : "Lower-risk class"}
              </strong>

            </div>

          </div>


          {/* EXPLANATION */}
          <div className="result-explanation">

            <div className="shap-section">

              <span className="result-eyebrow">
                MODEL EXPLANATION
              </span>

              <h2>
                What influenced this estimate?
              </h2>

              <p>
                These are the factors that had the strongest influence on the
                model's prediction for this assessment.
              </p>


              <div className="shap-list">

                {result.top_factors?.map((factor, index) => (

                  <div
                    className="shap-item"
                    key={factor.feature}
                  >

                    <div className="shap-rank">
                      {index + 1}
                    </div>


                    <div className="shap-content">

                      <strong>
                        {factor.feature}
                      </strong>

                      <span>
                        {factor.direction}
                      </span>

                    </div>


                    <div
                      className={`shap-impact ${
                        factor.impact > 0
                          ? "positive"
                          : "negative"
                      }`}
                    >
                      {factor.impact > 0 ? "+" : ""}
                      {factor.impact.toFixed(3)}
                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* IMPORTANT INFORMATION */}
            <span className="result-eyebrow">
              WHAT THIS MEANS
            </span>

            <h2>
              Important information
            </h2>

            <p>
              This percentage is a machine-learning risk estimate based on
              the information entered into the assessment. It is not a
              diagnosis and should not be used as a substitute for advice
              from a qualified healthcare professional.
            </p>

          </div>


          {/* ACTIONS */}
          <div className="result-actions">

            <button
              className="result-primary-button"
              onClick={savePredictionAndGoDashboard}
            >
              Go to Dashboard →
            </button>


            <button
              className="result-secondary-button"
              onClick={() => navigate("/assessment")}
            >
              Take Assessment Again
            </button>

          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer className="result-footer">

        <span>
          © 2026 MedAI
        </span>

        <span>
          AI should inform, not replace medical care.
        </span>

      </footer>

    </div>
  );
}

export default PredictionResult;