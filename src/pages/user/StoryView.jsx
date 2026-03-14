import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import API from "../../services/api";

export default function StoryView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await API.get(`/stories/${id}`);
        setStory(res.data);
      } catch (err) {
        console.error(err);
        alert("Story not found");
        navigate("/dashboard");
      }
    };
    fetchStory();
  }, [id, navigate]);

  const handleVideoEnd = () => {
    console.log("Video finished, navigating to quiz...");
    navigate(`/quiz/${id}`);
  };


  if (!story) return null;

  return (
    <div className="min-h-screen flex items-center justify-center relative"
      style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)' }}>

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="w-full max-w-5xl p-4 sm:p-8 relative z-10 animate-fade-in">
        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 mb-6 text-sm font-medium transition-all duration-200"
          style={{ color: '#94a3b8' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#e2e8f0'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        {/* Title */}
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-6 text-center animate-slide-up">
          {story.title}
        </h1>

        {/* Video Player */}
        <div className="relative rounded-2xl overflow-hidden animate-scale-in"
          style={{ boxShadow: '0 32px 64px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <video
            ref={videoRef}
            src={story.videoUrl}
            controls
            autoPlay
            onEnded={handleVideoEnd}
            onError={() => {
              alert("Video failed to load. Starting quiz...");
              navigate(`/quiz/${id}`);
            }}
            className="w-full rounded-2xl"
            style={{ background: '#000' }}
          />
        </div>
      </div>
    </div>
  );
}
