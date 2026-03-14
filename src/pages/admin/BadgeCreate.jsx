import { useState } from "react";
import { Award, Sparkles } from "lucide-react";
import API from "../../services/api";
import AdminLayout from "../../components/AdminLayout";

export default function BadgeCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [icon, setIcon] = useState("🏅");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/badges/create", { name, description, minScore, icon });
    alert("Badge created successfully 🎉");
    setName("");
    setDescription("");
    setMinScore(0);
    setIcon("🏅");
  };

  return (
    <AdminLayout>
      <div className="max-w-lg animate-slide-up">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #ec4899, #f472b6)' }}>
            <Award className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#1e293b' }}>Create Badge</h1>
            <p className="text-sm" style={{ color: '#64748b' }}>Design achievement badges for learners</p>
          </div>
        </div>

        {/* Preview */}
        <div className="glass-card p-6 mb-6 text-center">
          <div className="text-5xl mb-2">{icon || "🏅"}</div>
          <p className="font-bold" style={{ color: '#1e293b' }}>{name || "Badge Name"}</p>
          <p className="text-sm" style={{ color: '#94a3b8' }}>{description || "Badge description"}</p>
          <p className="text-xs mt-2 font-medium" style={{ color: '#6366f1' }}>
            Min Score: {minScore}
          </p>
        </div>

        {/* Form */}
        <form className="rounded-2xl p-6 sm:p-8" onSubmit={handleSubmit} style={{
          background: 'white',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9',
        }}>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Badge Name</label>
              <input className="input-modern"
                placeholder="e.g. Story Master"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Description</label>
              <input className="input-modern"
                placeholder="What is this badge for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Minimum Score</label>
              <input type="number" className="input-modern"
                placeholder="Score required to earn this badge"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Icon (emoji or URL)</label>
              <input className="input-modern"
                placeholder="🏅 or image URL"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
            </div>
          </div>

          <button className="btn-primary w-full mt-8 py-3.5 text-base cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>
            <Sparkles size={20} />
            Create Badge
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
