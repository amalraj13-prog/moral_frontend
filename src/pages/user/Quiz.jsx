import { useEffect, useState } from "react";
import { Trophy, CheckCircle, XCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Quiz() {
  const { id } = useParams(); // storyId
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quiz/${id}`);
        setQuiz(res.data);
      } catch (err) {
        console.error(err);
        alert("Quiz not found!");
        navigate("/dashboard");
      }
    };
    fetchQuiz();
  }, [id, navigate]);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0f172a, #1e1b4b)' }}>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#818cf8', borderTopColor: 'transparent' }} />
          <p style={{ color: '#94a3b8' }}>Loading quiz...</p>
        </div>
      </div>
    );
  }

  const questions = quiz.questions;
  const progress = ((currentQ + (showResult ? 1 : 0)) / questions.length) * 100;

  const handleAnswer = (option) => {
    if (selected !== null) return;

    const newAnswers = [...answers];
    newAnswers[currentQ] = option;
    setAnswers(newAnswers);

    setSelected(option);

    if (option === questions[currentQ].correctAnswer) {
      setScore(score + Math.floor(quiz.points / questions.length));
    }

    setTimeout(() => {
      setSelected(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        submitQuiz(newAnswers);
      }
    }, 1000);
  };

  const submitQuiz = async (finalAnswers) => {
    try {
      const res = await API.post(`/quiz/submit/${id}`, {
        userId: user._id,
        answers: finalAnswers
      });

      setScore(res.data.score);
      setShowResult(true);
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #1e293b 100%)' }}>

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full animate-float"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'float 4s ease-in-out infinite reverse' }} />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Progress Bar */}
        <div className="mb-6 animate-fade-in">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 animate-scale-in" style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.3)',
        }}>

          {/* Quiz Area */}
          {!showResult && (
            <div className="animate-fade-in" key={currentQ}>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white">Quiz Time</h2>
                  <p className="text-sm" style={{ color: '#94a3b8' }}>Test your knowledge</p>
                </div>
                <span className="px-3 py-1.5 rounded-full text-sm font-bold"
                  style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }}>
                  Q {currentQ + 1}/{questions.length}
                </span>
              </div>

              <h3 className="text-xl font-medium text-white mb-8 leading-relaxed">
                {questions[currentQ].question}
              </h3>

              <div className="space-y-3">
                {questions[currentQ].options.map((opt, idx) => {
                  let bg, borderColor, textColor, shadow;

                  if (selected !== null) {
                    if (opt === questions[currentQ].correctAnswer) {
                      bg = 'rgba(34,197,94,0.15)';
                      borderColor = '#22c55e';
                      textColor = '#4ade80';
                      shadow = '0 0 0 1px rgba(34,197,94,0.3)';
                    } else if (opt === selected) {
                      bg = 'rgba(239,68,68,0.15)';
                      borderColor = '#ef4444';
                      textColor = '#f87171';
                      shadow = '0 0 0 1px rgba(239,68,68,0.3)';
                    } else {
                      bg = 'rgba(255,255,255,0.03)';
                      borderColor = 'rgba(255,255,255,0.06)';
                      textColor = '#64748b';
                      shadow = 'none';
                    }
                  } else {
                    bg = 'rgba(255,255,255,0.05)';
                    borderColor = 'rgba(255,255,255,0.08)';
                    textColor = '#e2e8f0';
                    shadow = 'none';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt)}
                      className="w-full text-left p-4 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 cursor-pointer"
                      style={{
                        background: bg,
                        border: `1.5px solid ${borderColor}`,
                        color: textColor,
                        boxShadow: shadow,
                      }}
                      onMouseEnter={(e) => {
                        if (selected === null) {
                          e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
                          e.currentTarget.style.borderColor = '#6366f1';
                          e.currentTarget.style.color = '#c7d2fe';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selected === null) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                          e.currentTarget.style.color = '#e2e8f0';
                        }
                      }}
                      disabled={selected !== null}
                    >
                      {selected !== null && opt === questions[currentQ].correctAnswer && (
                        <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#22c55e' }} />
                      )}
                      {selected !== null && opt === selected && opt !== questions[currentQ].correctAnswer && (
                        <XCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#ef4444' }} />
                      )}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Result Section */}
          {showResult && (
            <div className="text-center animate-scale-in">
              <div className="mb-8 flex justify-center">
                <div className="p-6 rounded-full animate-float"
                  style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(234,179,8,0.1))', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <Trophy className="h-16 w-16 fill-current" style={{ color: '#fbbf24' }} />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-3">Awesome!</h2>
              <p className="text-lg mb-8" style={{ color: '#94a3b8' }}>
                You earned{" "}
                <span className="font-bold text-2xl" style={{ color: '#4ade80' }}>
                  {score}
                </span>{" "}
                points!
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/leaderboard")}
                  className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    boxShadow: '0 4px 14px rgba(79,70,229,0.4)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,70,229,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(79,70,229,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  See Leaderboard
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full py-3.5 rounded-xl font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: '#e2e8f0',
                    border: '1.5px solid rgba(255,255,255,0.1)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
