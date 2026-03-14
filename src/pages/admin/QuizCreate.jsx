import { useEffect, useState } from "react";
import { PlusCircle, Save, Brain, ListChecks } from "lucide-react";
import API from "../../services/api";
import AdminLayout from "../../components/AdminLayout";

export default function QuizCreate() {
  const [stories, setStories] = useState([]);
  const [storyId, setStoryId] = useState("");
  const [points, setPoints] = useState(10);
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  useEffect(() => {
    const fetchStories = async () => {
      const res = await API.get("/stories");
      setStories(res.data);
    };
    fetchStories();
  }, []);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswer = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/quiz/create", {
        storyId,
        questions,
        points,
      });
      alert("Quiz created successfully 🎉");
      setStoryId("");
      setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
    } catch (err) {
      alert("Error creating quiz");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #22c55e, #4ade80)' }}>
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#1e293b' }}>Create Quiz</h1>
            <p className="text-sm" style={{ color: '#64748b' }}>Add MCQ questions for a story</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl p-6 sm:p-8" style={{
          background: 'white',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9',
        }}>
          {/* Story & Points */}
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Select Story</label>
              <select
                className="input-modern"
                value={storyId}
                onChange={(e) => setStoryId(e.target.value)}
                required
              >
                <option value="">Select Story</option>
                {stories.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Total Points</label>
              <input
                type="number"
                className="input-modern"
                placeholder="Points for this quiz"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
              />
            </div>
          </div>

          {/* Questions */}
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="rounded-xl p-5 mb-6 animate-fade-in"
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <ListChecks className="h-5 w-5" style={{ color: '#6366f1' }} />
                <h3 className="font-bold" style={{ color: '#1e293b' }}>Question {qIndex + 1}</h3>
              </div>

              <input
                className="input-modern mb-4"
                placeholder="Enter your question"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              />

              <div className="grid md:grid-cols-2 gap-3 mb-4">
                {q.options.map((opt, oIndex) => (
                  <input
                    key={oIndex}
                    className="input-modern"
                    placeholder={`Option ${oIndex + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                  />
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: '#6366f1' }}>Correct Answer</label>
                <input
                  className="input-modern"
                  placeholder="Correct Answer (must match one option)"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleCorrectAnswer(qIndex, e.target.value)
                  }
                  style={{ borderColor: '#c7d2fe', background: '#eef2ff' }}
                />
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              type="button"
              onClick={addQuestion}
              className="btn-secondary cursor-pointer"
              style={{ background: '#f0fdf4', color: '#16a34a', borderColor: '#bbf7d0' }}
            >
              <PlusCircle size={20} /> Add Question
            </button>

            <button
              type="submit"
              className="btn-primary flex-1 cursor-pointer"
            >
              <Save size={20} /> Save Quiz
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
