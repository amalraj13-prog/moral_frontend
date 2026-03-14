import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Search } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function StoryList() {
  const [stories, setStories] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await API.get("/stories");
        setStories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-mesh-gradient">
      <Navbar user={user} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-4">
        <div className="animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold" style={{ color: '#1e293b' }}>
              Panchatantra Stories
            </h1>
          </div>
          <p className="ml-13" style={{ color: '#64748b' }}>
            Explore timeless tales of wisdom and adventure
          </p>
        </div>
      </div>

      {/* Story Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 stagger-children">
          {stories.map((story) => (
            <div
              key={story._id}
              className="glass-card p-6 card-hover animate-slide-up group"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)' }}>
                  <BookOpen className="h-4 w-4" style={{ color: '#6366f1' }} />
                </div>
                <h2 className="text-lg font-bold" style={{ color: '#1e293b' }}>
                  {story.title}
                </h2>
              </div>

              <p className="text-sm mb-5 line-clamp-2" style={{ color: '#64748b' }}>
                {story.moral.substring(0, 80)}...
              </p>

              <Link
                to={`/story/${story._id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                style={{ color: '#6366f1' }}
              >
                Read Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
