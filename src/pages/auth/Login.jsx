import { useState } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import logoImg from "../../assets/image/logo.png";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data || "Login failed. Please try again.";
      alert(typeof msg === "string" ? msg : JSON.stringify(msg));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #1e293b 100%)' }}>

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-float"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'float 4s ease-in-out infinite reverse' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'float 5s ease-in-out infinite' }} />
      </div>

      <div className="w-full max-w-md relative z-10 animate-scale-in">
        {/* Card */}
        <div className="rounded-2xl p-8 sm:p-10" style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.3)',
        }}>
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center animate-pulse-glow">
                <img src={logoImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="rounded-2xl" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-5 w-5 text-amber-400 animate-float" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Moral Mitra
          </h1>
          <p className="text-center mb-8" style={{ color: '#94a3b8' }}>
            Learning by Playing
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3.5 rounded-xl text-white placeholder-slate-400 outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#818cf8'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3.5 rounded-xl text-white placeholder-slate-400 outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#818cf8'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                boxShadow: '0 4px 14px rgba(79,70,229,0.4)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,70,229,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(79,70,229,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Start Learning ✨
            </button>
          </form>

          <p className="mt-8 text-sm text-center" style={{ color: '#94a3b8' }}>
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold transition-colors" style={{ color: '#818cf8' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#a5b4fc'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#818cf8'}>
              Register here
            </Link>
          </p>

          {/* <div className="mt-8 pt-6 text-xs text-left" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#475569' }}>
            <p><strong>Project By:</strong> S.Amal Raj (23UCS629)</p>
            <p><strong>Class:</strong> III-B.Sc Computer Science "B"</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
