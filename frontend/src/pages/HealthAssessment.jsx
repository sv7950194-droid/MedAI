import "./HealthAssessment.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HealthAssessment.css";

const steps = [
  "Personal",
  "General Health",
  "Medical",
  "Lifestyle",
  "Healthcare",
  "Review",
  "Prediction",
];

const initialData = {
  Age: "",
  Sex: "",
  Education: "",
  Income: "",

  GenHlth: "",
  MentHlth: "",
  PhysHlth: "",
  DiffWalk: "",

  HighBP: "",
  HighChol: "",
  CholCheck: "",
  Stroke: "",
  HeartDiseaseorAttack: "",

  Smoker: "",
  PhysActivity: "",
  Fruits: "",
  Veggies: "",
  HvyAlcoholConsump: "",

  AnyHealthcare: "",
  NoDocbcCost: "",

  BMI: "",
};

function HealthAssessment() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setError("");
  };

  const progress =
    currentStep === steps.length - 1
      ? 100
      : Math.round((currentStep / (steps.length - 1)) * 100);

  const validateStep = () => {
    let requiredFields = [];

    if (currentStep === 0) {
      requiredFields = ["Age", "Sex", "Education", "Income"];
    }

    if (currentStep === 1) {
      requiredFields = ["GenHlth", "MentHlth", "PhysHlth", "DiffWalk"];
    }

    if (currentStep === 2) {
      requiredFields = [
        "HighBP",
        "HighChol",
        "CholCheck",
        "Stroke",
        "HeartDiseaseorAttack",
      ];
    }

    if (currentStep === 3) {
      requiredFields = [
        "Smoker",
        "PhysActivity",
        "Fruits",
        "Veggies",
        "HvyAlcoholConsump",
        "BMI",
      ];
    }

    if (currentStep === 4) {
      requiredFields = ["AnyHealthcare", "NoDocbcCost"];
    }

    const missing = requiredFields.some(
      (field) =>
        formData[field] === "" ||
        formData[field] === null ||
        formData[field] === undefined
    );

    if (missing) {
      setError("Please complete all required fields before continuing.");
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const startPrediction = () => {
    setCurrentStep(6);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrediction = () => {
    console.log("Assessment data:", formData);

    // API connection will be added next.
    // This will connect to:
    // POST http://127.0.0.1:8000/predict

    alert("Assessment submitted. ML prediction connection comes next.");
  };

  const renderOption = (field, value, label) => (
    <label
      className={`choice-card ${
        String(formData[field]) === String(value) ? "selected" : ""
      }`}
    >
      <input
        type="radio"
        name={field}
        value={value}
        checked={String(formData[field]) === String(value)}
        onChange={() => updateField(field, value)}
      />

      <span className="choice-indicator"></span>

      <span className="choice-text">{label}</span>
    </label>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="assessment-section-heading">
              <span className="assessment-eyebrow">
                STEP 01 · PERSONAL PROFILE
              </span>

              <h2>Tell us about yourself</h2>

              <p>
                These basic demographic indicators help the machine learning
                model understand your health profile.
              </p>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>Age group *</label>

                <select
                  value={formData.Age}
                  onChange={(e) => updateField("Age", e.target.value)}
                >
                  <option value="">Select age group</option>
                  <option value="1">18–24</option>
                  <option value="2">25–29</option>
                  <option value="3">30–34</option>
                  <option value="4">35–39</option>
                  <option value="5">40–44</option>
                  <option value="6">45–49</option>
                  <option value="7">50–54</option>
                  <option value="8">55–59</option>
                  <option value="9">60–64</option>
                  <option value="10">65–69</option>
                  <option value="11">70–74</option>
                  <option value="12">75–79</option>
                  <option value="13">80+</option>
                </select>
              </div>

              <div className="form-field">
                <label>Sex *</label>

                <div className="choice-grid">
                  {renderOption("Sex", 0, "Female")}
                  {renderOption("Sex", 1, "Male")}
                </div>
              </div>

              <div className="form-field">
                <label>Education level *</label>

                <select
                  value={formData.Education}
                  onChange={(e) =>
                    updateField("Education", e.target.value)
                  }
                >
                  <option value="">Select education level</option>
                  <option value="1">Never attended school</option>
                  <option value="2">Elementary school</option>
                  <option value="3">Middle school</option>
                  <option value="4">High school</option>
                  <option value="5">Some college</option>
                  <option value="6">College graduate</option>
                </select>
              </div>

              <div className="form-field">
                <label>Income category *</label>

                <select
                  value={formData.Income}
                  onChange={(e) => updateField("Income", e.target.value)}
                >
                  <option value="">Select income category</option>
                  <option value="1">Lowest category</option>
                  <option value="2">Category 2</option>
                  <option value="3">Category 3</option>
                  <option value="4">Category 4</option>
                  <option value="5">Category 5</option>
                  <option value="6">Category 6</option>
                  <option value="7">Category 7</option>
                  <option value="8">Highest category</option>
                </select>
              </div>
            </div>
          </>
        );

      case 1:
        return (
          <>
            <div className="assessment-section-heading">
              <span className="assessment-eyebrow">
                STEP 02 · GENERAL HEALTH
              </span>

              <h2>How are you feeling?</h2>

              <p>
                Share general physical and mental health information from the
                recent period.
              </p>
            </div>

            <div className="form-field full-width">
              <label>How would you rate your general health? *</label>

              <div className="choice-grid five">
                {renderOption("GenHlth", 1, "Excellent")}
                {renderOption("GenHlth", 2, "Very good")}
                {renderOption("GenHlth", 3, "Good")}
                {renderOption("GenHlth", 4, "Fair")}
                {renderOption("GenHlth", 5, "Poor")}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>
                  Poor mental health days in the last 30 days *
                </label>

                <input
                  type="number"
                  min="0"
                  max="30"
                  placeholder="0–30 days"
                  value={formData.MentHlth}
                  onChange={(e) =>
                    updateField("MentHlth", e.target.value)
                  }
                />
              </div>

              <div className="form-field">
                <label>
                  Poor physical health days in the last 30 days *
                </label>

                <input
                  type="number"
                  min="0"
                  max="30"
                  placeholder="0–30 days"
                  value={formData.PhysHlth}
                  onChange={(e) =>
                    updateField("PhysHlth", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="form-field full-width">
              <label>Do you have serious difficulty walking or climbing stairs? *</label>

              <div className="choice-grid">
                {renderOption("DiffWalk", 0, "No")}
                {renderOption("DiffWalk", 1, "Yes")}
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="assessment-section-heading">
              <span className="assessment-eyebrow">
                STEP 03 · MEDICAL INDICATORS
              </span>

              <h2>Medical health indicators</h2>

              <p>
                These indicators are used as model inputs. Enter the
                information you know accurately.
              </p>
            </div>

            <div className="question-list">
              <div className="question-card">
                <div>
                  <h3>Have you ever been told you have high blood pressure?</h3>
                  <p>Also consider whether a healthcare professional has mentioned hypertension.</p>
                </div>

                <div className="choice-grid compact">
                  {renderOption("HighBP", 0, "No")}
                  {renderOption("HighBP", 1, "Yes")}
                </div>
              </div>

              <div className="question-card">
                <div>
                  <h3>Have you been told you have high cholesterol?</h3>
                  <p>This refers to a previous healthcare assessment.</p>
                </div>

                <div className="choice-grid compact">
                  {renderOption("HighChol", 0, "No")}
                  {renderOption("HighChol", 1, "Yes")}
                </div>
              </div>

              <div className="question-card">
                <div>
                  <h3>Have you had your cholesterol checked recently?</h3>
                  <p>Use the information available to you.</p>
                </div>

                <div className="choice-grid compact">
                  {renderOption("CholCheck", 0, "No")}
                  {renderOption("CholCheck", 1, "Yes")}
                </div>
              </div>

              <div className="question-card">
                <div>
                  <h3>Have you ever had a stroke?</h3>
                </div>

                <div className="choice-grid compact">
                  {renderOption("Stroke", 0, "No")}
                  {renderOption("Stroke", 1, "Yes")}
                </div>
              </div>

              <div className="question-card">
                <div>
                  <h3>
                    Have you ever had coronary heart disease or a heart
                    attack?
                  </h3>
                </div>

                <div className="choice-grid compact">
                  {renderOption(
                    "HeartDiseaseorAttack",
                    0,
                    "No"
                  )}

                  {renderOption(
                    "HeartDiseaseorAttack",
                    1,
                    "Yes"
                  )}
                </div>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="assessment-section-heading">
              <span className="assessment-eyebrow">
                STEP 04 · LIFESTYLE
              </span>

              <h2>Your lifestyle profile</h2>

              <p>
                Lifestyle indicators provide additional context for the model.
              </p>
            </div>

            <div className="form-field full-width">
              <label>Do you currently smoke or have you smoked regularly? *</label>

              <div className="choice-grid">
                {renderOption("Smoker", 0, "No")}
                {renderOption("Smoker", 1, "Yes")}
              </div>
            </div>

            <div className="form-field full-width">
              <label>Do you participate in physical activity? *</label>

              <div className="choice-grid">
                {renderOption("PhysActivity", 0, "No")}
                {renderOption("PhysActivity", 1, "Yes")}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>Do you regularly consume fruit? *</label>

                <div className="choice-grid">
                  {renderOption("Fruits", 0, "No")}
                  {renderOption("Fruits", 1, "Yes")}
                </div>
              </div>

              <div className="form-field">
                <label>Do you regularly consume vegetables? *</label>

                <div className="choice-grid">
                  {renderOption("Veggies", 0, "No")}
                  {renderOption("Veggies", 1, "Yes")}
                </div>
              </div>
            </div>

            <div className="form-field full-width">
              <label>
                Do you have heavy alcohol consumption? *
              </label>

              <div className="choice-grid">
                {renderOption("HvyAlcoholConsump", 0, "No")}
                {renderOption("HvyAlcoholConsump", 1, "Yes")}
              </div>
            </div>

            <div className="form-field full-width">
              <label>BMI *</label>

              <input
                type="number"
                min="10"
                max="80"
                step="0.1"
                placeholder="Example: 24.8"
                value={formData.BMI}
                onChange={(e) => updateField("BMI", e.target.value)}
              />

              <small className="field-help">
                Enter your BMI if you already know it.
              </small>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div className="assessment-section-heading">
              <span className="assessment-eyebrow">
                STEP 05 · HEALTHCARE ACCESS
              </span>

              <h2>Healthcare access</h2>

              <p>
                These questions help complete the dataset profile used by
                MedAI.
              </p>
            </div>

            <div className="form-field full-width">
              <label>Do you have access to healthcare coverage? *</label>

              <div className="choice-grid">
                {renderOption("AnyHealthcare", 0, "No")}
                {renderOption("AnyHealthcare", 1, "Yes")}
              </div>
            </div>

            <div className="form-field full-width">
              <label>
                Was there a time in the last year when you needed a doctor
                but could not afford it? *
              </label>

              <div className="choice-grid">
                {renderOption("NoDocbcCost", 0, "No")}
                {renderOption("NoDocbcCost", 1, "Yes")}
              </div>
            </div>

            <div className="privacy-note">
              <span>🔒</span>

              <div>
                <strong>Your information matters</strong>
                <p>
                  MedAI is designed for educational and research purposes.
                  Your assessment result is not a medical diagnosis.
                </p>
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <div className="assessment-section-heading">
              <span className="assessment-eyebrow">
                STEP 06 · REVIEW
              </span>

              <h2>Review your information</h2>

              <p>
                Please review the information before sending it to the
                machine learning model.
              </p>
            </div>

            <div className="review-grid">
              <div className="review-card">
                <span>Personal Profile</span>
                <strong>
                  Age group: {formData.Age || "Not provided"}
                </strong>
                <strong>
                  Sex:{" "}
                  {formData.Sex === ""
                    ? "Not provided"
                    : formData.Sex === 1
                    ? "Male"
                    : "Female"}
                </strong>
                <strong>
                  Education: {formData.Education || "Not provided"}
                </strong>
                <strong>
                  Income: {formData.Income || "Not provided"}
                </strong>
              </div>

              <div className="review-card">
                <span>General Health</span>
                <strong>
                  General health: {formData.GenHlth || "Not provided"}
                </strong>
                <strong>
                  Mental health days: {formData.MentHlth || "Not provided"}
                </strong>
                <strong>
                  Physical health days: {formData.PhysHlth || "Not provided"}
                </strong>
                <strong>
                  Walking difficulty:{" "}
                  {formData.DiffWalk === ""
                    ? "Not provided"
                    : formData.DiffWalk === 1
                    ? "Yes"
                    : "No"}
                </strong>
              </div>

              <div className="review-card">
                <span>Medical Indicators</span>
                <strong>High BP: {formData.HighBP === 1 ? "Yes" : "No"}</strong>
                <strong>
                  High cholesterol:{" "}
                  {formData.HighChol === 1 ? "Yes" : "No"}
                </strong>
                <strong>
                  Previous stroke: {formData.Stroke === 1 ? "Yes" : "No"}
                </strong>
                <strong>
                  Heart disease/attack:{" "}
                  {formData.HeartDiseaseorAttack === 1 ? "Yes" : "No"}
                </strong>
              </div>

              <div className="review-card">
                <span>Lifestyle</span>
                <strong>BMI: {formData.BMI || "Not provided"}</strong>
                <strong>
                  Smoker: {formData.Smoker === 1 ? "Yes" : "No"}
                </strong>
                <strong>
                  Physical activity:{" "}
                  {formData.PhysActivity === 1 ? "Yes" : "No"}
                </strong>
                <strong>
                  Fruit consumption:{" "}
                  {formData.Fruits === 1 ? "Yes" : "No"}
                </strong>
              </div>
            </div>

            <div className="review-warning">
              <strong>Before continuing</strong>
              <p>
                Make sure the information is accurate. MedAI will use these
                indicators as inputs for its machine learning risk estimate.
              </p>
            </div>
          </>
        );

      case 6:
        return (
          <div className="prediction-ready">
            <div className="prediction-icon">
              ✦
            </div>

            <span className="assessment-eyebrow">
              STEP 07 · AI ANALYSIS
            </span>

            <h2>Ready for your MedAI analysis</h2>

            <p>
              Your assessment is complete. The next step will send your
              health indicators to the MedAI XGBoost model and return an
              estimated risk probability.
            </p>

            <div className="prediction-process">
              <div>
                <span>01</span>
                <strong>Validate</strong>
              </div>

              <div>
                <span>02</span>
                <strong>Analyze</strong>
              </div>

              <div>
                <span>03</span>
                <strong>Predict</strong>
              </div>

              <div>
                <span>04</span>
                <strong>Explain</strong>
              </div>
            </div>

            <div className="prediction-disclaimer">
              MedAI provides an educational model-based risk estimate. It
              does not diagnose diabetes or replace professional medical care.
            </div>

            <button
              className="prediction-button"
              onClick={handlePrediction}
            >
              Analyze My Health Risk →
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="health-assessment-page">

      {/* TOP BAR */}
      <header className="assessment-topbar">

        <button
          className="assessment-logo"
          onClick={() => navigate("/dashboard")}
        >
          <span>✚</span>
          MedAI
        </button>

        <div className="assessment-top-title">
          <span>HEALTH ASSESSMENT</span>
          <strong>Diabetes Risk Assessment</strong>
        </div>

        <button
          className="exit-button"
          onClick={() => navigate("/dashboard")}
        >
          Save & Exit
        </button>

      </header>

      {/* PROGRESS */}
      <div className="assessment-progress-wrapper">

        <div className="assessment-progress-info">
          <span>
            Step {currentStep + 1} of {steps.length}
          </span>

          <strong>{progress}% complete</strong>
        </div>

        <div className="assessment-progress-bar">
          <div style={{ width: `${progress}%` }}></div>
        </div>

        <div className="assessment-steps">

          {steps.map((step, index) => (
            <div
              key={step}
              className={`assessment-step ${
                index === currentStep ? "active" : ""
              } ${index < currentStep ? "completed" : ""}`}
            >
              <span>
                {index < currentStep ? "✓" : index + 1}
              </span>

              <small>{step}</small>
            </div>
          ))}

        </div>

      </div>

      {/* MAIN */}
      <main className="assessment-main">

        <section className="assessment-card">

          {renderStep()}

          {error && (
            <div className="assessment-error">
              <span>!</span>
              {error}
            </div>
          )}

          {currentStep < 6 && (
            <div className="assessment-navigation">

              <button
                className="back-button"
                onClick={previousStep}
                disabled={currentStep === 0}
              >
                ← Back
              </button>

              <button
                className="next-button"
                onClick={currentStep === 5 ? startPrediction : nextStep}
              >
                {currentStep === 5
                  ? "Continue to AI Analysis →"
                  : "Continue →"}
              </button>

            </div>
          )}

          {currentStep === 6 && (
            <button
              className="assessment-back-dashboard"
              onClick={() => navigate("/dashboard")}
            >
              ← Return to Dashboard
            </button>
          )}

        </section>

      </main>

      {/* FOOTER */}
      <footer className="assessment-footer">

        <span>© 2026 MedAI</span>

        <span>
          AI should inform, not replace medical care.
        </span>

      </footer>

    </div>
  );
}

export default HealthAssessment;