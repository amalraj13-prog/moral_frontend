import { useEffect, useState } from "react";
import { Pencil, Trash2, BookOpen, X, Save, Video, Headphones, Search } from "lucide-react";
import API from "../../services/api";
import AdminLayout from "../../components/AdminLayout";

export default function StoryManage() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingStory, setEditingStory] = useState(null);
    const [editForm, setEditForm] = useState({ title: "", content: "", moral: "" });
    const [editVideo, setEditVideo] = useState(null);
    const [editAudio, setEditAudio] = useState(null);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState("");

    const fetchStories = async () => {
        try {
            const res = await API.get("/stories");
            setStories(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchStories(); }, []);

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
        try {
            await API.delete(`/stories/${id}`);
            setStories(stories.filter(s => s._id !== id));
        } catch (err) {
            alert("Error deleting story");
        }
    };

    const openEdit = (story) => {
        setEditingStory(story._id);
        setEditForm({ title: story.title, content: story.content, moral: story.moral });
        setEditVideo(null);
        setEditAudio(null);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append("title", editForm.title);
            formData.append("content", editForm.content);
            formData.append("moral", editForm.moral);
            if (editVideo) formData.append("video", editVideo);
            if (editAudio) formData.append("audio", editAudio);

            await API.put(`/stories/${editingStory}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Story updated successfully ✅");
            setEditingStory(null);
            fetchStories();
        } catch (err) {
            alert("Error updating story");
        } finally {
            setSaving(false);
        }
    };

    const filtered = stories.filter(s =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.moral?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                            <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold" style={{ color: '#1e293b' }}>Manage Stories</h1>
                            <p className="text-sm" style={{ color: '#64748b' }}>{stories.length} total stories</p>
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#94a3b8' }} />
                        <input
                            className="input-modern pl-10"
                            placeholder="Search stories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '260px' }}
                        />
                    </div>
                </div>

                {/* Edit Modal */}
                {editingStory && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <div className="rounded-2xl p-6 sm:p-8 w-full max-w-lg mx-4 animate-scale-in max-h-[90vh] overflow-y-auto" style={{
                            background: 'white', boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                        }}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold" style={{ color: '#1e293b' }}>Edit Story</h2>
                                <button onClick={() => setEditingStory(null)} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                    <X className="h-5 w-5" style={{ color: '#64748b' }} />
                                </button>
                            </div>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Title</label>
                                    <input className="input-modern" value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Content</label>
                                    <textarea className="input-modern" rows="4" value={editForm.content}
                                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })} required
                                        style={{ resize: 'vertical' }} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Moral</label>
                                    <input className="input-modern" value={editForm.moral}
                                        onChange={(e) => setEditForm({ ...editForm, moral: e.target.value })} required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold flex items-center gap-1.5 mb-1.5" style={{ color: '#374151' }}>
                                            <Video size={14} style={{ color: '#6366f1' }} /> Replace Video
                                        </label>
                                        <input type="file" accept="video/*" onChange={(e) => setEditVideo(e.target.files[0])}
                                            className="input-modern text-sm" style={{ padding: '0.5rem' }} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold flex items-center gap-1.5 mb-1.5" style={{ color: '#374151' }}>
                                            <Headphones size={14} style={{ color: '#a855f7' }} /> Replace Audio
                                        </label>
                                        <input type="file" accept="audio/*" onChange={(e) => setEditAudio(e.target.files[0])}
                                            className="input-modern text-sm" style={{ padding: '0.5rem' }} />
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setEditingStory(null)}
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
                    <div className="text-center py-16" style={{ color: '#94a3b8' }}>Loading stories...</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16 rounded-2xl" style={{ background: 'white', border: '1px solid #f1f5f9' }}>
                        <BookOpen className="h-12 w-12 mx-auto mb-3" style={{ color: '#cbd5e1' }} />
                        <p style={{ color: '#94a3b8' }}>No stories found</p>
                    </div>
                ) : (
                    <div className="rounded-2xl overflow-hidden" style={{
                        background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
                    }}>
                        <table className="table-modern">
                            <thead>
                                <tr>
                                    <th className="text-left">Title</th>
                                    <th className="text-left">Moral</th>
                                    <th className="text-center">Video</th>
                                    <th className="text-center">Audio</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((story) => (
                                    <tr key={story._id}>
                                        <td className="font-semibold" style={{ color: '#1e293b', maxWidth: '200px' }}>
                                            <div className="truncate">{story.title}</div>
                                        </td>
                                        <td style={{ color: '#64748b', maxWidth: '250px' }}>
                                            <div className="truncate text-sm italic">"{story.moral}"</div>
                                        </td>
                                        <td className="text-center">
                                            {story.videoUrl ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                                                    style={{ background: '#eef2ff', color: '#4f46e5' }}>
                                                    <Video size={12} /> Yes
                                                </span>
                                            ) : (
                                                <span className="text-xs" style={{ color: '#cbd5e1' }}>—</span>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            {story.audioUrl ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                                                    style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                                                    <Headphones size={12} /> Yes
                                                </span>
                                            ) : (
                                                <span className="text-xs" style={{ color: '#cbd5e1' }}>—</span>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => openEdit(story)}
                                                    className="p-2 rounded-lg transition-all cursor-pointer"
                                                    style={{ color: '#6366f1', background: '#eef2ff' }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#e0e7ff'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = '#eef2ff'; }}
                                                    title="Edit">
                                                    <Pencil size={15} />
                                                </button>
                                                <button onClick={() => handleDelete(story._id, story.title)}
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
