import { useEffect, useState } from "react";
import API from "../../services/api";
import { socket } from "../../services/socket";
import {
  Users,
  BookOpen,
  Brain,
  BarChart2,
  Trophy,
  TrendingUp,
} from "lucide-react";
import AdminLayout from "../../components/AdminLayout";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();

    socket.on("analyticsUpdated", () => {
      fetchAnalytics();
    });

    return () => socket.off("analyticsUpdated");
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/analytics");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return (
    <AdminLayout>
      <div className="flex items-center gap-3 justify-center py-20">
        <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#818cf8', borderTopColor: 'transparent' }} />
        <p style={{ color: '#64748b' }}>Loading analytics...</p>
      </div>
    </AdminLayout>
  );

  const statCards = [
    { icon: Users, label: "Total Users", value: data.totalUsers, gradient: "linear-gradient(135deg, #6366f1, #818cf8)", shadow: "rgba(99,102,241,0.3)" },
    { icon: BookOpen, label: "Total Stories", value: data.totalStories, gradient: "linear-gradient(135deg, #22c55e, #4ade80)", shadow: "rgba(34,197,94,0.3)" },
    { icon: Brain, label: "Total Quizzes", value: data.totalQuizzes, gradient: "linear-gradient(135deg, #a855f7, #c084fc)", shadow: "rgba(168,85,247,0.3)" },
    { icon: BarChart2, label: "Quiz Attempts", value: data.totalAttempts, gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)", shadow: "rgba(245,158,11,0.3)" },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h1 className="text-2xl font-bold" style={{ color: '#1e293b' }}>Analytics Dashboard</h1>
        <p className="text-sm" style={{ color: '#64748b' }}>Platform performance overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 stagger-children">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="rounded-2xl p-5 card-hover animate-slide-up"
              style={{ background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: card.gradient, boxShadow: `0 4px 12px ${card.shadow}` }}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#64748b' }}>{card.label}</p>
                  <p className="text-2xl font-bold" style={{ color: '#1e293b' }}>{card.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Average Score */}
      <div className="rounded-2xl p-6 mb-8 animate-slide-up" style={{
        background: 'white',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        border: '1px solid #f1f5f9',
      }}>
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-5 w-5" style={{ color: '#6366f1' }} />
          <h2 className="text-lg font-bold" style={{ color: '#1e293b' }}>Average Score</h2>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold" style={{ color: '#6366f1' }}>{data.averageScore}</span>
          <span className="text-lg font-medium mb-1" style={{ color: '#94a3b8' }}>%</span>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-2 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${Math.min(data.averageScore, 100)}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />
        </div>
      </div>

      {/* Top Users */}
      <div className="rounded-2xl overflow-hidden animate-slide-up" style={{
        background: 'white',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        border: '1px solid #f1f5f9',
      }}>
        <div className="p-6 pb-4">
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: '#1e293b' }}>
            <Trophy className="h-5 w-5" style={{ color: '#f59e0b' }} /> Top Performers
          </h2>
        </div>

        <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              <th className="text-left">Rank</th>
              <th className="text-left">User</th>
              <th className="text-center">Score</th>
              <th className="text-center">Level</th>
            </tr>
          </thead>
          <tbody>
            {data.topUsers.map((u, i) => (
              <tr key={u._id}>
                <td>
                  <span className="font-bold text-sm" style={{ color: i < 3 ? '#f59e0b' : '#94a3b8' }}>
                    #{i + 1}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', color: '#6366f1' }}>
                      {u.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold" style={{ color: '#1e293b' }}>{u.username}</span>
                  </div>
                </td>
                <td className="text-center">
                  <span className="font-semibold" style={{ color: '#6366f1' }}>{u.totalScore}</span>
                </td>
                <td className="text-center">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: '#f0fdf4', color: '#16a34a' }}>
                    Lv {u.level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </AdminLayout>
  );
}
