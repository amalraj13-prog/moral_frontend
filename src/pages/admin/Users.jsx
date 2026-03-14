import { useEffect, useState } from "react";
import API from "../../services/api";
import { socket } from "../../services/socket";
import { Trash2, Users as UsersIcon, Search } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();

    // Real-time updates
    socket.on("usersUpdated", (data) => {
      setUsers(data);
    });

    return () => {
      socket.off("usersUpdated");
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/users/${id}`);
      alert("User deleted");
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center flex-wrap gap-3 mb-8 animate-slide-up">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #a855f7, #c084fc)' }}>
          <UsersIcon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#1e293b' }}>User Management</h1>
          <p className="text-sm" style={{ color: '#64748b' }}>{users.length} registered users</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden animate-slide-up" style={{
        background: 'white',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        border: '1px solid #f1f5f9',
      }}>
        <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              <th className="text-left">User</th>
              <th className="text-center">Score</th>
              <th className="text-center">Level</th>
              <th className="text-center">Badges</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', color: '#6366f1' }}>
                      {u.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold" style={{ color: '#1e293b' }}>{u.username}</span>
                  </div>
                </td>
                <td className="text-center">
                  <span className="font-semibold" style={{ color: '#6366f1' }}>{u.totalScore}</span>
                </td>
                <td className="text-center">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: '#f0fdf4', color: '#16a34a' }}>
                    Lv {u.level}
                  </span>
                </td>
                <td className="text-center">
                  <span className="font-medium" style={{ color: '#64748b' }}>
                    {u.badges?.length || 0}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
                    style={{ color: '#ef4444', background: '#fef2f2', border: '1px solid #fecaca' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </AdminLayout>
  );
}
