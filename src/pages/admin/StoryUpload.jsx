import { useState } from "react";
import { UploadCloud, BookOpen, Video, Headphones } from "lucide-react";
import API from "../../services/api";
import AdminLayout from "../../components/AdminLayout";

export default function StoryUpload() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [moral, setMoral] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("moral", moral);
    if (videoFile) formData.append("video", videoFile);
    if (audioFile) formData.append("audio", audioFile);

    try {
      setLoading(true);
      await API.post("/stories/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Story uploaded successfully 🎉");

      setTitle("");
      setContent("");
      setMoral("");
      setVideoFile(null);
      setAudioFile(null);
    } catch (err) {
      console.error(err);
      alert("Error uploading story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#1e293b' }}>Upload Panchatantra Story</h1>
            <p className="text-sm" style={{ color: '#64748b' }}>Add a new story with video and audio</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl p-6 sm:p-8" style={{
          background: 'white',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9',
        }}>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Story Title</label>
              <input
                className="input-modern"
                placeholder="Enter story title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Story Content</label>
              <textarea
                className="input-modern"
                placeholder="Write the story content..."
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ resize: 'vertical' }}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Moral of the Story</label>
              <input
                className="input-modern"
                placeholder="What's the moral lesson?"
                value={moral}
                onChange={(e) => setMoral(e.target.value)}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold flex items-center gap-2 mb-1.5" style={{ color: '#374151' }}>
                  <Video size={16} style={{ color: '#6366f1' }} /> Upload Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  className="input-modern text-sm"
                  style={{ padding: '0.625rem 1rem' }}
                />
              </div>

              <div>
                <label className="text-sm font-semibold flex items-center gap-2 mb-1.5" style={{ color: '#374151' }}>
                  <Headphones size={16} style={{ color: '#a855f7' }} /> Upload Audio
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  className="input-modern text-sm"
                  style={{ padding: '0.625rem 1rem' }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-8 py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <UploadCloud size={20} />
            {loading ? "Uploading..." : "Upload Story"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
