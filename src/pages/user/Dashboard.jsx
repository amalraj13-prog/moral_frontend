import { useEffect, useState } from "react";
import { Star, Play, Lightbulb, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  const [stories, setStories] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/");
      return;
    }
    setUser(storedUser);

    // Fetch stories from backend
    const fetchStories = async () => {
      try {
        const res = await API.get("/stories");
        setStories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStories();
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-mesh-gradient">
      <Navbar user={user} />

      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #a855f7 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientMove 8s ease infinite',
      }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full" style={{ background: 'rgba(255,255,255,0.03)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Star className="h-3.5 w-3.5 fill-current text-amber-300" />
              Level {user.level || 1} Explorer
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Welcome back, <span style={{ color: '#c4b5fd' }}>{user.username}</span>!
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Choose a story below to start your adventure.
            </p>
          </div>
        </div>
      </div>

      {/* Story Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
          {stories.map((story, index) => (
            <div
              key={story._id}
              className="rounded-2xl overflow-hidden card-hover animate-slide-up group"
              style={{
                background: 'white',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                border: '1px solid #f1f5f9',
              }}
            >
              {/* Thumbnail */}
              <div className="h-44 relative overflow-hidden" style={{ background: '#0f172a' }}>
                {story.videoUrl ? (
                  <video
                    src={story.videoUrl}
                    muted
                    preload="metadata"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onLoadedData={(e) => { e.target.currentTime = 1; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)' }}>
                    <Play className="h-12 w-12" style={{ color: '#a5b4fc' }} />
                  </div>
                )}
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(0,0,0,0.2)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                    <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-12"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 truncate" style={{ color: '#1e293b' }} title={story.title}>
                  {story.title}
                </h3>

                <div className="flex items-start mb-4 h-8 overflow-hidden">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs italic line-clamp-2" style={{ color: '#64748b' }}>
                    "{story.moral}"
                  </p>
                </div>

                <Link
                  to={`/story/${story._id}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    boxShadow: '0 2px 8px rgba(79,70,229,0.3)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(79,70,229,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(79,70,229,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  Start
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
