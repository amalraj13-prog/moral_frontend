import { useEffect, useState } from "react";
import { Star, Flame, Trophy, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-mesh-gradient">
            <Navbar user={user} />

            <div className="max-w-2xl mx-auto px-4 py-10 animate-slide-up">
                {/* Profile Header Card */}
                <div className="rounded-2xl overflow-hidden mb-6" style={{
                    background: 'white',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    border: '1px solid #f1f5f9',
                }}>
                    {/* Banner */}
                    <div className="h-28 relative" style={{
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #a855f7 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradientMove 8s ease infinite',
                    }}>
                        <div className="absolute -bottom-10 left-6">
                            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                    boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
                                    border: '4px solid white',
                                }}>
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="pt-14 pb-6 px-6">
                        <h2 className="text-2xl font-bold" style={{ color: '#1e293b' }}>
                            {user.username}
                        </h2>
                        <p className="text-sm" style={{ color: '#94a3b8' }}>
                            Panchatantra Explorer
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6 stagger-children">
                    <div className="glass-card p-5 text-center card-hover animate-slide-up">
                        <Star className="h-6 w-6 mx-auto mb-2" style={{ color: '#6366f1' }} />
                        <p className="text-2xl font-bold" style={{ color: '#1e293b' }}>{user.totalScore}</p>
                        <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Total XP</p>
                    </div>

                    <div className="glass-card p-5 text-center card-hover animate-slide-up">
                        <Trophy className="h-6 w-6 mx-auto mb-2" style={{ color: '#f59e0b' }} />
                        <p className="text-2xl font-bold" style={{ color: '#1e293b' }}>{user.level}</p>
                        <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Level</p>
                    </div>

                    <div className="glass-card p-5 text-center card-hover animate-slide-up">
                        <Flame className="h-6 w-6 mx-auto mb-2" style={{ color: '#ef4444' }} />
                        <p className="text-2xl font-bold" style={{ color: '#1e293b' }}>{user.streak}</p>
                        <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Day Streak</p>
                    </div>
                </div>

                {/* Badges Section */}
                <div className="rounded-2xl p-6 animate-slide-up" style={{
                    background: 'white',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    border: '1px solid #f1f5f9',
                }}>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#1e293b' }}>
                        🎖️ My Badges
                    </h3>
                    <div className="flex gap-4 flex-wrap">
                        {user.badges?.length > 0 ? (
                            user.badges.map((b, i) => (
                                <div key={i} className="glass-card p-4 text-center card-hover min-w-[80px]">
                                    <div className="text-3xl mb-2">{b.icon}</div>
                                    <p className="text-xs font-semibold" style={{ color: '#475569' }}>{b.name}</p>
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center py-8">
                                <div className="text-4xl mb-3">🚀</div>
                                <p className="font-medium" style={{ color: '#64748b' }}>No badges yet. Start learning!</p>
                                <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>Complete stories and quizzes to earn badges</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
