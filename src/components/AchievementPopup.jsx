import { motion } from "framer-motion";

export default function AchievementPopup({ show, title, icon }) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed top-6 right-6 z-50 p-5 rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        boxShadow: '0 20px 40px rgba(79, 70, 229, 0.4)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl animate-float">{icon}</div>
        <div>
          <h3 className="text-white text-lg font-bold">{title}</h3>
          <p className="text-indigo-200 text-sm">Achievement Unlocked! 🎉</p>
        </div>
      </div>
    </motion.div>
  );
}
