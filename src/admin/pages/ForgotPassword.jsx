import React, { useState } from 'react';
import { Mail, ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';
import BichutenLogo from '../../assets/Bichutenwhitelogo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    
    try {
      const data = await apiFetch('/auth/forgot-password.php', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      setStatus('success');
      setMessage(data.message);
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Failed to process request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020817] relative overflow-hidden font-helvetica">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#14477B]/20 via-[#020817] to-[#020817] pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-[#0B1220]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
          
          <button 
            onClick={() => navigate('/admin/login')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft size={16} /> Back to Login
          </button>

          <div className="flex flex-col items-center mb-6">
            <Shield size={32} className="text-[#0B79BF] mb-4" />
            <h1 className="text-xl font-semibold tracking-wide text-white">Reset Credentials</h1>
            <p className="text-gray-400 text-sm mt-2 text-center">
              Enter your admin email to receive reset instructions.
            </p>
          </div>

          {status && (
            <div className={`mb-6 p-4 border rounded-lg text-sm text-center ${
              status === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'
            }`}>
              {message}
            </div>
          )}

          {!status || status === 'error' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Admin Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#020817] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0B79BF] focus:ring-1 focus:ring-[#0B79BF] transition-colors"
                    placeholder="admin@bichuten.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#14477B] hover:bg-[#0B79BF] text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Send Reset Link'}
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
