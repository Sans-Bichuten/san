import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import BichutenLogo from '../../assets/Bichutenwhitelogo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020817] relative overflow-hidden font-helvetica">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20"
           style={{
             backgroundImage: `linear-gradient(rgba(20, 71, 123, 0.2) 1px, transparent 1px), 
                               linear-gradient(90deg, rgba(20, 71, 123, 0.2) 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             animation: 'gridMove 20s linear infinite'
           }}>
      </div>
      
      {/* Blue Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0B79BF] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#14477B] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-[#0B1220]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <img src={BichutenLogo} alt="Bichuten" className="h-10 mb-6" />
            <div className="flex items-center gap-2 text-gray-300">
              <Shield size={20} className="text-[#0B79BF]" />
              <h1 className="text-xl font-semibold tracking-wide">Operations Control</h1>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

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

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-400">Password</label>
                <a href="/admin/forgot-password" className="text-xs text-[#0B79BF] hover:text-white transition-colors">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#020817] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0B79BF] focus:ring-1 focus:ring-[#0B79BF] transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#14477B] to-[#0B79BF] hover:from-[#0B79BF] hover:to-[#14477B] text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(11,121,191,0.3)] hover:shadow-[0_0_30px_rgba(11,121,191,0.5)]"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-600">
          Secure Infrastructure System. Restricted Access Only.
        </div>
      </div>
    </div>
  );
};

export default Login;
