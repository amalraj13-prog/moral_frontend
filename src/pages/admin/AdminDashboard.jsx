import { Link } from "react-router-dom";
import {
  BookPlus,
  Brain,
  Users,
  BarChart3,
  Award,
  ArrowRight,
} from "lucide-react";
import AdminLayout from "../../components/AdminLayout";

export default function AdminDashboard() {
  const cards = [
    {
      to: "/admin/story-upload",
      icon: BookPlus,
      title: "Upload Stories",
      desc: "Add new Moral Mitra stories, videos & morals.",
      gradient: "linear-gradient(135deg, #6366f1, #818cf8)",
      shadow: "rgba(99,102,241,0.3)",
    },
    {
      to: "/admin/quiz-create",
      icon: Brain,
      title: "Create Quizzes",
      desc: "Add MCQ questions for each story.",
      gradient: "linear-gradient(135deg, #22c55e, #4ade80)",
      shadow: "rgba(34,197,94,0.3)",
    },
    {
      to: "/admin/users",
      icon: Users,
      title: "Manage Users",
      desc: "View registered users and progress.",
      gradient: "linear-gradient(135deg, #a855f7, #c084fc)",
      shadow: "rgba(168,85,247,0.3)",
    },
    {
      to: "/admin/analytics",
      icon: BarChart3,
      title: "Analytics",
      desc: "Platform performance and stats.",
      gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
      shadow: "rgba(245,158,11,0.3)",
    },
    {
      to: "/admin/badge-create",
      icon: Award,
      title: "Create Badges",
      desc: "Design badges for student achievements.",
      gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
      shadow: "rgba(236,72,153,0.3)",
    },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold" style={{ color: '#1e293b' }}>
          Welcome Admin 👑
        </h1>
        <p className="mt-1" style={{ color: '#64748b' }}>
          Manage your Moral Mitra platform
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.to}
              to={card.to}
              className="rounded-2xl p-6 card-hover animate-slide-up group"
              style={{
                background: 'white',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                border: '1px solid #f1f5f9',
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: card.gradient, boxShadow: `0 4px 12px ${card.shadow}` }}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-1" style={{ color: '#1e293b' }}>{card.title}</h3>
              <p className="text-sm mb-4" style={{ color: '#64748b' }}>{card.desc}</p>
              <div className="flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                style={{ color: '#6366f1' }}>
                Go to {card.title.split(' ')[0]}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </AdminLayout>
  );
}
