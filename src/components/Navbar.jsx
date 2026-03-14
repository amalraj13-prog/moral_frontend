import { useState } from "react";
import { Trophy, Star, BookOpen, Home, User, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoImg from "../assets/image/logo.png";

export default function Navbar({ user }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const navLinks = [
        { to: "/dashboard", label: "Home", icon: Home },
        { to: "/stories", label: "Stories", icon: BookOpen },
        { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
        { to: "/profile", label: "Profile", icon: User },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 animate-slide-down" style={{
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(226,232,240,0.6)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-2.5 group">
                        <img src={logoImg} alt="Moral Mitra" className="h-9 w-9 rounded-xl object-cover shadow-md" />
                        <div className="sm:flex flex-col leading-tight">
                            <span className="text-lg font-bold"
                                style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Moral Mitra
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                                    style={{
                                        background: isActive(link.to) ? 'linear-gradient(135deg, #eef2ff, #e0e7ff)' : 'transparent',
                                        color: isActive(link.to) ? '#4f46e5' : '#64748b',
                                    }}
                                    onMouseEnter={(e) => { if (!isActive(link.to)) { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#334155'; } }}
                                    onMouseLeave={(e) => { if (!isActive(link.to)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; } }}
                                >
                                    <Icon className="h-4 w-4" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {/* XP Badge */}
                        {user && (
                        <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold"
                                style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', color: '#92400e', border: '1px solid #fcd34d' }}>
                                <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
                                <span>{user.totalScore || 0}</span>
                                <span className="hidden sm:inline"> XP</span>
                            </div>
                        )}

                        {/* Logout */}
                        <button
                            onClick={logout}
                            className="p-2 rounded-lg transition-all duration-200 hidden md:flex items-center gap-1.5 text-sm"
                            style={{ color: '#94a3b8' }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = '#fef2f2'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent'; }}
                        >
                            <LogOut className="h-4 w-4" />
                        </button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg"
                            style={{ color: '#64748b' }}
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t animate-slide-down" style={{ borderColor: '#e2e8f0', background: 'rgba(255,255,255,0.95)' }}>
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                                    style={{
                                        background: isActive(link.to) ? '#eef2ff' : 'transparent',
                                        color: isActive(link.to) ? '#4f46e5' : '#475569',
                                    }}
                                >
                                    <Icon className="h-4 w-4" />
                                    {link.label}
                                </Link>
                            );
                        })}
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full"
                            style={{ color: '#ef4444' }}
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
