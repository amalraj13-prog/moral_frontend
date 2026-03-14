import { useEffect, useState } from "react";
import { Pencil, Trash2, Award, X, Save, Search, Sparkles } from "lucide-react";
import API from "../../services/api";
import AdminLayout from "../../components/AdminLayout";

export default function BadgeManage() {
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingBadge, setEditingBadge] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", description: "", minScore: 0, icon: "🏅" });
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState("");

    const fetchBadges = async () => {
        try {
            const res = await API.get("/badges");
            setBadges(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBadges(); }, []);

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete badge "${name}"? This cannot be undone.`)) return;
        try {
            await API.delete(`/badges/${id}`);
            setBadges(badges.filter(b => b._id !== id));
        } catch (err) {
            alert("Error deleting badge");
        }
    };

    const openEdit = (badge) => {
        setEditingBadge(badge._id);
        setEditForm({
            name: badge.name,
            description: badge.description,
            minScore: badge.minScore,
            icon: badge.icon,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await API.put(`/badges/${editingBadge}`, editForm);
            alert("Badge updated successfully ✅");
            setEditingBadge(null);
            fetchBadges();
        } catch (err) {
            alert("Error updating badge");
        } finally {
            setSaving(false);
        }
    };

    const filtered = badges.filter(b =>
        b.name?.toLowerCase().includes(search.toLowerCase()) ||
        b.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #ec4899, #f472b6)' }}>
                            <Award className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold" style={{ color: '#1e293b' }}>Manage Badges</h1>
                            <p className="text-sm" style={{ color: '#64748b' }}>{badges.length} total badges</p>
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#94a3b8' }} />
                        <input
                            className="input-modern pl-10"
                            placeholder="Search badges..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '260px' }}
                        />
                    </div>
                </div>

                {/* Edit Modal */}
                {editingBadge && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <div className="rounded-2xl p-6 sm:p-8 w-full max-w-lg mx-4 animate-scale-in" style={{
                            background: 'white', boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                        }}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold" style={{ color: '#1e293b' }}>Edit Badge</h2>
                                <button onClick={() => setEditingBadge(null)} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                    <X className="h-5 w-5" style={{ color: '#64748b' }} />
                                </button>
                            </div>

                            {/* Live Preview */}
                            <div className="glass-card p-4 mb-5 text-center">
                                <div className="text-4xl mb-1">{editForm.icon || "🏅"}</div>
                                <p className="font-bold text-sm" style={{ color: '#1e293b' }}>{editForm.name || "Badge Name"}</p>
                                <p className="text-xs" style={{ color: '#94a3b8' }}>{editForm.description || "Description"}</p>
                                <p className="text-xs mt-1 font-medium" style={{ color: '#6366f1' }}>Min: {editForm.minScore}</p>
                            </div>

                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Name</label>
                                    <input className="input-modern" value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Description</label>
                                    <input className="input-modern" value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Min Score</label>
                                        <input type="number" className="input-modern" value={editForm.minScore}
                                            onChange={(e) => setEditForm({ ...editForm, minScore: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Icon</label>
                                        <input className="input-modern" value={editForm.icon}
                                            onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setEditingBadge(null)}
                                        className="btn-secondary flex-1 cursor-pointer">Cancel</button>
                                    <button type="submit" disabled={saving}
                                        className="btn-primary flex-1 cursor-pointer disabled:opacity-50"
                                        style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>
                                        <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Cards Grid */}
                {loading ? (
                    <div className="text-center py-16" style={{ color: '#94a3b8' }}>Loading badges...</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16 rounded-2xl" style={{ background: 'white', border: '1px solid #f1f5f9' }}>
                        <Award className="h-12 w-12 mx-auto mb-3" style={{ color: '#cbd5e1' }} />
                        <p style={{ color: '#94a3b8' }}>No badges found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
                        {filtered.map((badge) => (
                            <div key={badge._id} className="rounded-2xl p-5 card-hover animate-slide-up" style={{
                                background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
                            }}>
                                <div className="text-center mb-4">
                                    <div className="text-4xl mb-2">{badge.icon || "🏅"}</div>
                                    <h3 className="font-bold" style={{ color: '#1e293b' }}>{badge.name}</h3>
                                    <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>{badge.description}</p>
                                </div>
                                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #f1f5f9' }}>
                                    <span className="text-xs font-medium px-2 py-1 rounded-full"
                                        style={{ background: '#fef3c7', color: '#92400e' }}>
                                        <Sparkles size={10} className="inline mr-1" />{badge.minScore} pts
                                    </span>
                                    <div className="flex gap-1.5">
                                        <button onClick={() => openEdit(badge)}
                                            className="p-1.5 rounded-lg transition-all cursor-pointer"
                                            style={{ color: '#6366f1', background: '#eef2ff' }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = '#e0e7ff'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = '#eef2ff'; }}
                                            title="Edit">
                                            <Pencil size={14} />
                                        </button>
                                        <button onClick={() => handleDelete(badge._id, badge.name)}
                                            className="p-1.5 rounded-lg transition-all cursor-pointer"
                                            style={{ color: '#ef4444', background: '#fef2f2' }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
                                            title="Delete">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
