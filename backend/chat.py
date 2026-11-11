from pydantic import BaseModel
import ollama


class ChatRequest(BaseModel):
    user_id: str
    message: str
    context: dict | None = None


def generate_response(message: str, context: dict | None = None):

    system_prompt = """
You are Dr. Isha, the AI health assistant of MedAI.

ROLE:
- You are an AI health assistant, not a real doctor.
- Never claim to be a real medical professional.
- Never claim clinical experience.
- Give clear, simple, supportive health information.

SAFETY:
- Do not diagnose diseases.
- Do not prescribe medicines or dosages.
- Encourage the user to consult a qualified healthcare professional
  for diagnosis or treatment.
- If the user describes severe or emergency symptoms, advise them
  to seek immediate professional medical care.

MEDAI RESULT RULES:

1. Use ONLY the information explicitly provided in the
   USER'S MEDAI ASSESSMENT CONTEXT.

2. NEVER invent a health factor, percentage, score, symptom,
   measurement, or assessment value.

3. NEVER create percentages for individual factors.

4. The "impact" value is a model explanation value.
   It is NOT a percentage.

5. If a factor has a positive impact, explain:
   "This factor contributed toward increasing the model's
   estimated risk."

6. If a factor has a negative impact, explain:
   "This factor contributed toward decreasing the model's
   estimated risk."

7. When explaining the user's result, use the actual feature
   names and values provided by MedAI.

8. Do not turn technical feature names into unrelated invented
   factors.

   For example:
   HighBP must not become "Exercise".
   BMI must not become "Weight percentage".
   DiffWalk must not become "Sleep".
   Unless that exact information is provided, do not invent it.

9. If the context does not contain enough information to answer
   a question, clearly say that the available assessment data
   does not provide enough information.

10. Always explain that MedAI's prediction is a machine-learning
    risk estimate and NOT a medical diagnosis.

11. Keep answers concise and easy to understand.

12. When explaining model factors, use a format similar to:

    "Your MedAI model identified these main factors:
    • Factor A — contributed toward increasing estimated risk.
    • Factor B — contributed toward decreasing estimated risk.
    • Factor C — contributed toward increasing estimated risk.

    These are model-based explanations, not a diagnosis."

13. Do not claim that changing one factor will definitely reduce
    the user's medical risk. Use careful language such as
    "may help", "can be associated with", or "consider discussing
    this with a healthcare professional."

IMPORTANT:
If the user asks about their personal MedAI result, prioritize
the provided MedAI assessment context over generic assumptions.
"""

    # ==========================================
    # BUILD USER'S MEDAI CONTEXT
    # ==========================================

    context_text = ""

    if context:

        prediction = context.get("prediction")
        assessment = context.get("assessment")

        context_text += """

USER'S MEDAI ASSESSMENT CONTEXT
================================
"""

        # --------------------------------------
        # PREDICTION RESULT
        # --------------------------------------

        if prediction:

            probability = prediction.get(
                "probability",
                "Not available"
            )

            risk_level = prediction.get(
                "riskLevel",
                "Not available"
            )

            prediction_value = prediction.get(
                "prediction",
                "Not available"
            )

            threshold = prediction.get(
                "threshold",
                "Not available"
            )

            context_text += f"""
LATEST MODEL RESULT:

Estimated probability:
{probability}%

Risk level:
{risk_level}

Prediction:
{prediction_value}

Model threshold:
{threshold}
"""

            # --------------------------------------
            # TOP MODEL FACTORS
            # --------------------------------------

            top_factors = prediction.get(
                "top_factors",
                []
            )

            if top_factors:

                context_text += """
TOP MODEL FACTORS:

"""

                for index, factor in enumerate(
                    top_factors,
                    start=1
                ):

                    feature = factor.get(
                        "feature",
                        "Unknown"
                    )

                    value = factor.get(
                        "value",
                        "Unknown"
                    )

                    impact = factor.get(
                        "impact",
                        "Unknown"
                    )

                    direction = factor.get(
                        "direction",
                        "Unknown"
                    )

                    context_text += f"""
{index}. Feature: {feature}
   Input value: {value}
   Model impact: {impact}
   Direction: {direction}
"""

        # --------------------------------------
        # ASSESSMENT DATA
        # --------------------------------------

        if assessment:

            context_text += """

ASSESSMENT DATA:
"""

            important_fields = [
                "HighBP",
                "HighChol",
                "CholCheck",
                "BMI",
                "Smoker",
                "Stroke",
                "HeartDiseaseorAttack",
                "PhysActivity",
                "Fruits",
                "Veggies",
                "HvyAlcoholConsump",
                "AnyHealthcare",
                "NoDocbcCost",
                "GenHlth",
                "MentHlth",
                "PhysHlth",
                "DiffWalk",
                "Sex",
                "Age",
                "Education",
                "Income"
            ]

            for field in important_fields:

                if field in assessment:

                    context_text += (
                        f"- {field}: "
                        f"{assessment[field]}\n"
                    )

    else:

        context_text = """

USER'S MEDAI ASSESSMENT CONTEXT:
No assessment context is currently available.

Do not invent or assume personal assessment results.
"""

    # ==========================================
    # SEND TO QWEN
    # ==========================================

    response = ollama.chat(
        model="qwen2.5:1.5b",
        messages=[
            {
                "role": "system",
                "content": system_prompt + context_text
            },
            {
                "role": "user",
                "content": message
            }
        ],
        options={
            "temperature": 0.2,
            "num_predict": 120
        }
    )

    # ==========================================
    # RETURN RESPONSE TO FASTAPI
    # ==========================================

    return {
        "response": response["message"]["content"]
    }