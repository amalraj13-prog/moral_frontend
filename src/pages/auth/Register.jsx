import { useState } from "react";
import { UserPlus, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import logoImg from "../../assets/image/logo.png";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await API.post("/auth/register", { username, password });
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #1e293b 100%)' }}>

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full animate-float"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'float 4s ease-in-out infinite reverse' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'float 5s ease-in-out infinite' }} />
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
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center animate-pulse-glow"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 24px rgba(34,197,94,0.4)' }}>
                <img src={logoImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="rounded-2xl" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-5 w-5 text-amber-400 animate-float" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Create Account
          </h1>
          <p className="text-center mb-8" style={{ color: '#94a3b8' }}>
            Join the Moral Mitra Adventure
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3.5 rounded-xl text-white placeholder-slate-400 outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1.5px solid rgba(255,255,255,0.1)',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#4ade80'; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3.5 rounded-xl text-white placeholder-slate-400 outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1.5px solid rgba(255,255,255,0.1)',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#4ade80'; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3.5 rounded-xl text-white placeholder-slate-400 outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1.5px solid rgba(255,255,255,0.1)',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#4ade80'; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                boxShadow: '0 4px 14px rgba(34,197,94,0.4)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(34,197,94,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(34,197,94,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Sign Up 🚀
            </button>
          </form>

          <p className="mt-8 text-sm text-center" style={{ color: '#94a3b8' }}>
            Already have an account?{" "}
            <Link to="/" className="font-semibold transition-colors" style={{ color: '#818cf8' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#a5b4fc'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#818cf8'}>
              Login here
            </Link>
          </p>

          <div className="mt-8 pt-6 text-xs text-left" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#475569' }}>
            <p><strong>Project By:</strong> S.Amal Raj (23UCS629)</p>
            <p><strong>Class:</strong> III-B.Sc Computer Science "B"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
