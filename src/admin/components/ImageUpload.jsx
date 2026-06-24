import React, { useState } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import { apiFetch } from '../services/api';

const ImageUpload = ({ value, onChange, label = "Upload Image" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const data = await apiFetch('/media/upload-image.php', {
        method: 'POST',
        body: formData,
      });

      if (data.status === 'success') {
        onChange(data.url);
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    onChange('');
  };

  const getImageUrl = (val) => {
    if (!val) return '';
    if (val.startsWith('http://') || val.startsWith('https://')) return val;
    if (val.startsWith('/bichuten_backend')) return val;
    return `/bichuten_backend${val}`;
  };

  const getFallbackUrl = (val) => {
    if (!val) return '';
    const cleanPath = val.replace(/^\/bichuten_backend/, '');
    return `http://localhost/Bichuten_Data_Vault/backend${cleanPath}`;
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-gray-700 bg-[#020817]">
          <img 
            src={getImageUrl(value)} 
            alt="Preview" 
            className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getFallbackUrl(value);
            }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={removeImage}
              className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative border-2 border-dashed border-gray-700 hover:border-[#0B79BF] rounded-lg bg-[#020817] transition-colors p-6 flex flex-col items-center justify-center text-center cursor-pointer group">
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center text-[#0B79BF]">
              <div className="w-8 h-8 border-2 border-[#0B79BF]/30 border-t-[#0B79BF] rounded-full animate-spin mb-2" />
              <span className="text-sm font-medium">Uploading...</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-[#14477B]/20 rounded-full flex items-center justify-center text-[#0B79BF] group-hover:scale-110 transition-transform mb-3">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm font-medium text-white mb-1">{label}</p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </>
          )}
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
          <X size={12} /> {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
