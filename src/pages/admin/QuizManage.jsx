import { useEffect, useState } from "react";
import { Pencil, Trash2, Brain, X, Save, PlusCircle, ListChecks, Search } from "lucide-react";
import API from "../../services/api";
import AdminLayout from "../../components/AdminLayout";

export default function QuizManage() {
    const [quizzes, setQuizzes] = useState([]);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingQuiz, setEditingQuiz] = useState(null);
    const [editForm, setEditForm] = useState({ storyId: "", points: 10, questions: [] });
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState("");

    const fetchData = async () => {
        try {
            const [quizRes, storyRes] = await Promise.all([
                API.get("/quiz"),
                API.get("/stories"),
            ]);
            setQuizzes(quizRes.data);
            setStories(storyRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id, storyTitle) => {
        if (!window.confirm(`Delete quiz for "${storyTitle}"? This cannot be undone.`)) return;
        try {
            await API.delete(`/quiz/${id}`);
            setQuizzes(quizzes.filter(q => q._id !== id));
        } catch (err) {
            alert("Error deleting quiz");
        }
    };

    const openEdit = (quiz) => {
        setEditingQuiz(quiz._id);
        setEditForm({
            storyId: quiz.storyId,
            points: quiz.points,
            questions: quiz.questions.map(q => ({
                question: q.question,
                options: [...q.options],
                correctAnswer: q.correctAnswer,
            })),
        });
    };

    const handleQuestionChange = (index, value) => {
        const updated = [...editForm.questions];
        updated[index].question = value;
        setEditForm({ ...editForm, questions: updated });
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const updated = [...editForm.questions];
        updated[qIndex].options[oIndex] = value;
        setEditForm({ ...editForm, questions: updated });
    };

    const handleCorrectAnswer = (index, value) => {
        const updated = [...editForm.questions];
        updated[index].correctAnswer = value;
        setEditForm({ ...editForm, questions: updated });
    };

    const addQuestion = () => {
        setEditForm({
            ...editForm,
            questions: [...editForm.questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }],
        });
    };

    const removeQuestion = (index) => {
        const updated = editForm.questions.filter((_, i) => i !== index);
        setEditForm({ ...editForm, questions: updated });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await API.put(`/quiz/${editingQuiz}`, editForm);
            alert("Quiz updated successfully ✅");
            setEditingQuiz(null);
            fetchData();
        } catch (err) {
            alert("Error updating quiz");
        } finally {
            setSaving(false);
        }
    };

    const filtered = quizzes.filter(q =>
        (q.storyTitle || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #22c55e, #4ade80)' }}>
                            <Brain className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold" style={{ color: '#1e293b' }}>Manage Quizzes</h1>
                            <p className="text-sm" style={{ color: '#64748b' }}>{quizzes.length} total quizzes</p>
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#94a3b8' }} />
                        <input
                            className="input-modern pl-10"
                            placeholder="Search by story..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '260px' }}
                        />
                    </div>
                </div>

                {/* Edit Modal */}
                {editingQuiz && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <div className="rounded-2xl p-6 sm:p-8 w-full max-w-2xl mx-4 animate-scale-in max-h-[90vh] overflow-y-auto" style={{
                            background: 'white', boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                        }}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold" style={{ color: '#1e293b' }}>Edit Quiz</h2>
                                <button onClick={() => setEditingQuiz(null)} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                    <X className="h-5 w-5" style={{ color: '#64748b' }} />
                                </button>
                            </div>
                            <form onSubmit={handleUpdate} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Story</label>
                                        <select className="input-modern" value={editForm.storyId}
                                            onChange={(e) => setEditForm({ ...editForm, storyId: e.target.value })} required>
                                            <option value="">Select Story</option>
                                            {stories.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Points</label>
                                        <input type="number" className="input-modern" value={editForm.points}
                                            onChange={(e) => setEditForm({ ...editForm, points: e.target.value })} />
                                    </div>
                                </div>

                                {/* Questions */}
                                {editForm.questions.map((q, qIndex) => (
                                    <div key={qIndex} className="rounded-xl p-4" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <ListChecks className="h-4 w-4" style={{ color: '#6366f1' }} />
                                                <span className="font-bold text-sm" style={{ color: '#1e293b' }}>Question {qIndex + 1}</span>
                                            </div>
                                            {editForm.questions.length > 1 && (
                                                <button type="button" onClick={() => removeQuestion(qIndex)}
                                                    className="text-xs px-2 py-1 rounded-lg cursor-pointer"
                                                    style={{ color: '#ef4444', background: '#fef2f2' }}>Remove</button>
                                            )}
                                        </div>
                                        <input className="input-modern mb-3 text-sm" placeholder="Question text"
                                            value={q.question} onChange={(e) => handleQuestionChange(qIndex, e.target.value)} />
                                        <div className="grid grid-cols-2 gap-2 mb-3">
                                            {q.options.map((opt, oIndex) => (
                                                <input key={oIndex} className="input-modern text-sm" placeholder={`Option ${oIndex + 1}`}
                                                    value={opt} onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)} />
                                            ))}
                                        </div>
                                        <input className="input-modern text-sm" placeholder="Correct Answer"
                                            value={q.correctAnswer} onChange={(e) => handleCorrectAnswer(qIndex, e.target.value)}
                                            style={{ borderColor: '#c7d2fe', background: '#eef2ff' }} />
                                    </div>
                                ))}

                                <button type="button" onClick={addQuestion}
                                    className="btn-secondary text-sm cursor-pointer"
                                    style={{ background: '#f0fdf4', color: '#16a34a', borderColor: '#bbf7d0' }}>
                                    <PlusCircle size={16} /> Add Question
                                </button>

                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setEditingQuiz(null)}
                                        className="btn-secondary flex-1 cursor-pointer">Cancel</button>
                                    <button type="submit" disabled={saving}
                                        className="btn-primary flex-1 cursor-pointer disabled:opacity-50">
                                        <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Table */}
                {loading ? (
                    <div className="text-center py-16" style={{ color: '#94a3b8' }}>Loading quizzes...</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16 rounded-2xl" style={{ background: 'white', border: '1px solid #f1f5f9' }}>
                        <Brain className="h-12 w-12 mx-auto mb-3" style={{ color: '#cbd5e1' }} />
                        <p style={{ color: '#94a3b8' }}>No quizzes found</p>
                    </div>
                ) : (
                    <div className="rounded-2xl overflow-hidden" style={{
                        background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
                    }}>
                        <table className="table-modern">
                            <thead>
                                <tr>
                                    <th className="text-left">Story</th>
                                    <th className="text-center">Questions</th>
                                    <th className="text-center">Points</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((quiz) => (
                                    <tr key={quiz._id}>
                                        <td className="font-semibold" style={{ color: '#1e293b' }}>{quiz.storyTitle}</td>
                                        <td className="text-center">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
                                                style={{ background: '#f0fdf4', color: '#16a34a' }}>
                                                {quiz.questions?.length || 0} Q's
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
                                                style={{ background: '#fef3c7', color: '#92400e' }}>
                                                {quiz.points} pts
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => openEdit(quiz)}
                                                    className="p-2 rounded-lg transition-all cursor-pointer"
                                                    style={{ color: '#6366f1', background: '#eef2ff' }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#e0e7ff'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = '#eef2ff'; }}
                                                    title="Edit">
                                                    <Pencil size={15} />
                                                </button>
                                                <button onClick={() => handleDelete(quiz._id, quiz.storyTitle)}
                                                    className="p-2 rounded-lg transition-all cursor-pointer"
                                                    style={{ color: '#ef4444', background: '#fef2f2' }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
                                                    title="Delete">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
