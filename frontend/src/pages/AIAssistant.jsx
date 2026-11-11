import { useState } from "react";
import "./AIAssistant.css";

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello! I'm Dr. Isha, your MedAI health assistant. I can help you understand your assessment results and answer general health questions."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Explain my result",
    "What does my risk mean?",
    "What factors affected my result?",
    "How can I improve my health?"
  ];

  const getHealthContext = () => {
    let assessment = null;
    let prediction = null;

    try {
      const savedAssessment = localStorage.getItem(
        "medai_latest_assessment"
      );

      const savedPrediction = localStorage.getItem(
        "medai_ai_context"
      );

      if (savedAssessment) {
        assessment = JSON.parse(savedAssessment);
      }

      if (savedPrediction) {
        prediction = JSON.parse(savedPrediction);
      }
    } catch (error) {
      console.error("Unable to read MedAI context:", error);
    }

    return {
      assessment,
      prediction
    };
  };

  const sendMessage = async (text = input) => {
    if (!text.trim() || loading) return;

    const userMessage = text.trim();

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userMessage
      }
    ]);

    setInput("");
    setLoading(true);

    try {
      const healthContext = getHealthContext();
      const userId = localStorage.getItem("medai_user_id");

if (!userId) {
  throw new Error("User ID not found. Please log in again.");
}
      console.log("Sending message:", userMessage);
      console.log("Health context:", healthContext);

      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
  user_id: userId,
  message: userMessage,
  context: healthContext
})
}
);

      if (!response.ok) {
        throw new Error(
          `Backend returned status ${response.status}`
        );
      }

      const data = await response.json();

      console.log("MedAI response:", data);

      if (!data || !data.response) {
        throw new Error("Empty response received from MedAI");
      }

      // Add AI response without replacing previous messages
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: data.response
        }
      ]);
    } catch (error) {
      console.error("MedAI chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Sorry, I'm unable to connect to MedAI right now. Please make sure the MedAI backend and Ollama are running."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assistant-page">

      {/* NAVBAR */}
      <header className="assistant-navbar">

        <div className="assistant-logo">
          <span>✚</span> MedAI
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/assessment">Assessment</a>
        </nav>

        <a
          href="/dashboard"
          className="assistant-dashboard-btn"
        >
          Dashboard →
        </a>

      </header>

      <main className="assistant-main">

        {/* INTRO SECTION */}
        <section className="assistant-intro">

          <div className="ai-status">
            <span></span>
            AI ASSISTANT • READY
          </div>

          <h1>
            Meet <span>Dr. Isha</span>
          </h1>

          <p className="assistant-subtitle">
            Your intelligent MedAI health assistant.
          </p>

          <p className="assistant-description">
            Understand your health assessment, explore your
            AI-generated insights and ask general health
            questions in simple language.
          </p>

          <div className="assistant-trust">

            <div>
              <strong>AI</strong>
              <span>Powered</span>
            </div>

            <div>
              <strong>XAI</strong>
              <span>Explainable</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Available</span>
            </div>

          </div>

          <div className="assistant-safety">

            <span>♥</span>

            <div>
              <strong>
                Health information, not diagnosis
              </strong>

              <p>
                MedAI provides educational information and
                risk explanations. It does not replace a
                qualified healthcare professional.
              </p>
            </div>

          </div>

        </section>

        {/* DOCTOR CARD */}
        <section className="doctor-card">

          <div className="doctor-avatar">

            <div className="avatar-circle">
              <span>AI</span>
            </div>

            <div className="online-dot"></div>

          </div>

          <div className="doctor-info">

            <h2>Dr. Isha</h2>

            <p>MedAI Health Assistant</p>

            <div className="doctor-status">
              <span></span>
              Online
            </div>

          </div>

          <div className="doctor-message">

            <p>
              "I'm here to help you understand your health
              information clearly."
            </p>

          </div>

        </section>

        {/* CHAT */}
        <section className="chat-container">

          <div className="chat-header">

            <div>

              <h2>Chat with MedAI</h2>

              <p>
                Ask a question or understand your assessment.
              </p>

            </div>

            <div className="secure-label">
              ● Secure
            </div>

          </div>

          {/* MESSAGES */}
          <div className="chat-messages">

            {messages.map((message, index) => (

              <div
                key={index}
                className={`message-row ${message.type}`}
              >

                {message.type === "ai" && (
                  <div className="message-avatar">
                    AI
                  </div>
                )}

                <div className="message-bubble">
                  {message.text}
                </div>

              </div>

            ))}

            {loading && (
              <div className="message-row ai">

                <div className="message-avatar">
                  AI
                </div>

                <div className="message-bubble">
                  Dr. Isha is thinking...
                </div>

              </div>
            )}

          </div>

          {/* SUGGESTIONS */}
          <div className="suggestions">

            <p>Try asking</p>

            <div className="suggestion-list">

              {suggestions.map((suggestion, index) => (

                <button
                  key={index}
                  onClick={() => sendMessage(suggestion)}
                  disabled={loading}
                >
                  {suggestion}
                </button>

              ))}

            </div>

          </div>

          {/* INPUT */}
          <div className="chat-input-area">

            <input
              type="text"
              placeholder="Ask MedAI anything about your health..."
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={() => sendMessage()}
              disabled={loading}
            >
              {loading ? "..." : "→"}
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AIAssistant;