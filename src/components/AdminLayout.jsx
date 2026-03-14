import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    BookPlus,
    Brain,
    Users,
    BarChart3,
    LogOut,
    LayoutDashboard,
    Award,
    ChevronRight,
    List,
    ListChecks,
    Medal,
    Menu,
    X,
} from "lucide-react";
import logoImg from "../assets/image/logo.png";

export default function AdminLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const navLinks = [
        { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/admin/story-upload", label: "Upload Stories", icon: BookPlus },
        { to: "/admin/story-manage", label: "Manage Stories", icon: List },
        { to: "/admin/quiz-create", label: "Create Quiz", icon: Brain },
        { to: "/admin/quiz-manage", label: "Manage Quizzes", icon: ListChecks },
        { to: "/admin/badge-create", label: "Create Badge", icon: Award },
        { to: "/admin/badge-manage", label: "Manage Badges", icon: Medal },
        { to: "/admin/users", label: "Users", icon: Users },
        { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    ];

    const isActive = (path) => location.pathname === path;

    const SidebarContent = ({ onLinkClick }) => (
        <>
            {/* Logo */}
            <div className="p-5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <img src={logoImg} alt="Moral Mitra" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                    <span className="text-white font-bold text-lg">Moral Mitra</span>
                    <p className="text-indigo-300 text-xs">Learning by Playing</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 mt-2 overflow-y-auto">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={onLinkClick}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                            style={{
                                background: isActive(link.to) ? 'rgba(255,255,255,0.15)' : 'transparent',
                                color: isActive(link.to) ? '#ffffff' : 'rgba(199,210,254,0.8)',
                                boxShadow: isActive(link.to) ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                            }}
                            onMouseEnter={(e) => { if (!isActive(link.to)) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                            onMouseLeave={(e) => { if (!isActive(link.to)) e.currentTarget.style.background = 'transparent'; }}
                        >
                            <Icon style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                            <span className="flex-1">{link.label}</span>
                            {isActive(link.to) && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-3 flex-shrink-0">
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                        background: 'rgba(239,68,68,0.15)',
                        color: '#fca5a5',
                        border: '1px solid rgba(239,68,68,0.2)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.25)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; }}
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen flex" style={{ background: '#f1f5f9' }}>

            {/* ── Desktop Sidebar (md and above) ── */}
            <aside
                className="hidden md:flex w-64 flex-shrink-0 flex-col"
                style={{
                    background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
                }}
            >
                <SidebarContent onLinkClick={undefined} />
            </aside>

            {/* ── Mobile: backdrop overlay ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 md:hidden"
                    style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── Mobile: sliding drawer ── */}
            <aside
                className="fixed inset-y-0 left-0 z-40 w-72 flex flex-col md:hidden transition-transform duration-300"
                style={{
                    background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.25)',
                    transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                }}
            >
                {/* Close button */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg z-50"
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#c7d2fe' }}
                >
                    <X className="h-5 w-5" />
                </button>
                <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
            </aside>

            {/* ── Main content ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-auto">
                {/* Mobile top bar */}
                <header
                    className="md:hidden flex items-center gap-3 px-4 py-3 sticky top-0 z-20"
                    style={{
                        background: 'linear-gradient(90deg, #1e1b4b, #312e81)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                >
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.1)', color: '#c7d2fe' }}
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <img src={logoImg} alt="Moral Mitra" className="w-8 h-8 rounded-lg object-cover" />
                    <span className="text-white font-bold text-base">Moral Mitra Admin</span>
                </header>

                <main className="flex-1">
                    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
