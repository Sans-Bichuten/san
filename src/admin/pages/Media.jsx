import React, { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Copy, Image as ImageIcon, HardDrive, Grid, List } from 'lucide-react';
import { apiFetch } from '../services/api';

const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const Media = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [copiedUrl, setCopiedUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => { fetchMedia(); }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/media/get-media.php');
      setFiles(data.files || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const data = await apiFetch('/media/upload-image.php', { method: 'POST', body: formData });
      if (data.status === 'success') fetchMedia();
      else alert(data.message);
    } catch (e) { alert(e.message || 'Upload failed'); } finally { setUploading(false); }
  };

  const deleteFile = async (filename) => {
    if (!window.confirm(`Delete ${filename}?`)) return;
    try {
      await apiFetch('/media/delete-media.php', { method: 'POST', body: JSON.stringify({ filename }) });
      setFiles(prev => prev.filter(f => f.name !== filename));
    } catch (e) { alert(e.message); }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(`${window.location.origin}${url}`);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const isImage = (type) => type?.startsWith('image/');

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-helvetica">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Media Library</h1>
          <p className="text-sm text-gray-400">{files.length} file{files.length !== 1 ? 's' : ''} stored</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-gray-700 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-[#14477B] text-white' : 'text-gray-400 hover:text-white'} transition-colors`}><Grid size={16} /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-[#14477B] text-white' : 'text-gray-400 hover:text-white'} transition-colors`}><List size={16} /></button>
          </div>
          <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#14477B] to-[#0B79BF] text-white rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(11,121,191,0.3)] disabled:opacity-60">
            {uploading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Upload size={16} />}
            Upload File
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-[#0B79BF] animate-pulse">Loading media library...</div>
      ) : files.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-700 rounded-2xl">
          <HardDrive size={40} className="mb-3 opacity-30" />
          <p>No files uploaded yet</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map(file => (
            <div key={file.name} className="bg-[#0B1220]/80 border border-gray-800 rounded-xl overflow-hidden group hover:border-[#0B79BF]/50 transition-all shadow-lg">
              <div className="relative h-36 bg-[#071120] flex items-center justify-center overflow-hidden">
                {isImage(file.type) ? (
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                ) : null}
                <div className={`absolute inset-0 ${isImage(file.type) ? 'hidden' : 'flex'} items-center justify-center text-gray-600`}>
                  <ImageIcon size={32} />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(file.url)} title="Copy URL" className="p-1.5 bg-[#0B79BF] text-white rounded-lg hover:bg-[#14477B] transition-colors">
                    {copiedUrl === file.url ? '✓' : <Copy size={14} />}
                  </button>
                  <button onClick={() => deleteFile(file.name)} className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-400 truncate" title={file.name}>{file.name}</p>
                <p className="text-xs text-gray-600">{formatSize(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0B1220]/80 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-400 uppercase bg-[#0B1220] border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 text-left">File</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Size</th>
                <th className="px-6 py-4 text-left">Modified</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {files.map(file => (
                <tr key={file.name} className="hover:bg-[#14477B]/10 transition-colors">
                  <td className="px-6 py-3 flex items-center gap-3">
                    {isImage(file.type) ? (
                      <img src={file.url} alt={file.name} className="w-10 h-10 object-cover rounded" />
                    ) : <div className="w-10 h-10 bg-[#071120] rounded flex items-center justify-center text-gray-500"><ImageIcon size={16} /></div>}
                    <span className="text-gray-300 text-xs max-w-[200px] truncate">{file.name}</span>
                  </td>
                  <td className="px-6 py-3 text-gray-500 text-xs">{file.type}</td>
                  <td className="px-6 py-3 text-gray-400">{formatSize(file.size)}</td>
                  <td className="px-6 py-3 text-gray-400 text-xs">{new Date(file.modified).toLocaleDateString()}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => copyUrl(file.url)} className="text-gray-400 hover:text-[#0B79BF] transition-colors text-xs">
                        {copiedUrl === file.url ? '✓ Copied' : <Copy size={15} />}
                      </button>
                      <button onClick={() => deleteFile(file.name)} className="text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Media;
