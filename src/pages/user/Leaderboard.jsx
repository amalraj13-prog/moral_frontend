import { useEffect, useState } from "react";
import { Crown, Home, Medal, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { socket } from "../../services/socket";
import API from "../../services/api";
import Navbar from "../../components/Navbar";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await API.get("/users/leaderboard");
      setUsers(res.data);
    };
    fetchLeaderboard();

    socket.on("leaderboardUpdated", (data) => {
      setUsers(data);
    });

    return () => socket.off("leaderboardUpdated");
  }, []);

  const getRankStyle = (index) => {
    if (index === 0) return { bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '#fbbf24', icon: '#f59e0b', text: '#92400e' };
    if (index === 1) return { bg: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', border: '#cbd5e1', icon: '#94a3b8', text: '#475569' };
    if (index === 2) return { bg: 'linear-gradient(135deg, #fff7ed, #fed7aa)', border: '#fdba74', icon: '#f97316', text: '#9a3412' };
    return { bg: 'white', border: '#f1f5f9', icon: '#94a3b8', text: '#64748b' };
  };

  return (
    <div className="min-h-screen bg-mesh-gradient">
      <Navbar user={user} />

      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 animate-float"
            style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', boxShadow: '0 8px 24px rgba(245,158,11,0.3)' }}>
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: '#1e293b' }}>Leaderboard</h1>
          <p className="mt-1" style={{ color: '#64748b' }}>Top performers in the arena</p>
        </div>

        {/* Podium for top 3 */}
        {users.length >= 3 && (
          <div className="flex items-end justify-center gap-3 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {/* 2nd place */}
            <div className="flex flex-col items-center w-24">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-2"
                style={{ background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)', color: '#475569' }}>
                {users[1].username.charAt(0).toUpperCase()}
              </div>
              <p className="text-xs font-semibold truncate w-full text-center" style={{ color: '#475569' }}>{users[1].username}</p>
              <p className="text-xs font-bold" style={{ color: '#94a3b8' }}>{users[1].totalScore} XP</p>
              <div className="w-full h-16 rounded-t-xl mt-2 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)' }}>
                <Medal className="h-5 w-5" style={{ color: '#94a3b8' }} />
              </div>
            </div>

            {/* 1st place */}
            <div className="flex flex-col items-center w-28">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-2"
                style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#fff', boxShadow: '0 4px 16px rgba(245,158,11,0.4)' }}>
                {users[0].username.charAt(0).toUpperCase()}
              </div>
              <p className="text-sm font-bold truncate w-full text-center" style={{ color: '#1e293b' }}>{users[0].username}</p>
              <p className="text-xs font-bold" style={{ color: '#f59e0b' }}>{users[0].totalScore} XP</p>
              <div className="w-full h-24 rounded-t-xl mt-2 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #fde68a, #fbbf24)' }}>
                <Crown className="h-6 w-6" style={{ color: '#92400e' }} />
              </div>
            </div>

            {/* 3rd place */}
            <div className="flex flex-col items-center w-24">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-2"
                style={{ background: 'linear-gradient(135deg, #fdba74, #f97316)', color: '#fff' }}>
                {users[2].username.charAt(0).toUpperCase()}
              </div>
              <p className="text-xs font-semibold truncate w-full text-center" style={{ color: '#9a3412' }}>{users[2].username}</p>
              <p className="text-xs font-bold" style={{ color: '#f97316' }}>{users[2].totalScore} XP</p>
              <div className="w-full h-12 rounded-t-xl mt-2 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #fed7aa, #fdba74)' }}>
                <Award className="h-5 w-5" style={{ color: '#9a3412' }} />
              </div>
            </div>
          </div>
        )}

        {/* Full List */}
        <div className="rounded-2xl overflow-hidden animate-slide-up" style={{
          background: 'white',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9',
        }}>
          <div className="divide-y" style={{ borderColor: '#f8fafc' }}>
            {users.map((u, index) => {
              const rankStyle = getRankStyle(index);
              return (
                <div
                  key={u._id}
                  className="flex items-center justify-between p-4 transition-all duration-200"
                  style={{ background: index < 3 ? 'rgba(248,250,252,0.5)' : 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = index < 3 ? 'rgba(248,250,252,0.5)' : 'transparent'}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold w-8 text-center text-sm" style={{ color: rankStyle.text }}>
                      #{index + 1}
                    </span>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: rankStyle.bg, color: index < 3 ? rankStyle.text : '#6366f1', border: `1.5px solid ${rankStyle.border}` }}>
                      {u.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="font-semibold" style={{ color: '#1e293b' }}>{u.username}</div>
                  </div>
                  <div className="font-bold text-sm" style={{ color: '#6366f1' }}>
                    {u.totalScore} XP
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 font-semibold text-sm transition-all duration-200"
            style={{ color: '#6366f1' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#4f46e5'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6366f1'}
          >
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
