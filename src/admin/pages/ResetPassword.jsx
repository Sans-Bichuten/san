import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Shield, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { apiFetch } from '../services/api';
import BichutenLogo from '../../assets/Bichutenwhitelogo.png';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate       = useNavigate();
  const token          = searchParams.get('token');

  const [password, setPassword]           = useState('');
  const [confirm, setConfirm]             = useState('');
  const [showPassword, setShowPassword]   = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [status, setStatus]               = useState(null); // 'success' | 'error' | null
  const [message, setMessage]             = useState('');
  const [isSubmitting, setIsSubmitting]   = useState(false);

  // Redirect to login if no token in URL
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  // Password strength checker
  const getStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8)  score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength      = getStrength(password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength];
  const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#0B79BF'][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setStatus('error');
      setMessage('Password must be at least 8 characters.');
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const data = await apiFetch('/auth/reset-password.php', {
        method: 'POST',
        body: JSON.stringify({ token, password, confirm_password: confirm }),
      });
      setStatus('success');
      setMessage(data.message);
      // Redirect to login after 3 seconds
      setTimeout(() => navigate('/admin/login'), 3000);
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020817] relative overflow-hidden font-helvetica">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#14477B]/20 via-[#020817] to-[#020817] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-[#0B1220]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">

          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <img src={BichutenLogo} alt="Bichuten" className="h-8 mb-4 opacity-80" />
            <div className="p-3 bg-[#14477B]/20 rounded-full border border-[#14477B]/30 mb-4">
              <Lock size={24} className="text-[#0B79BF]" />
            </div>
            <h1 className="text-xl font-semibold tracking-wide text-white">Set New Password</h1>
            <p className="text-gray-400 text-sm mt-2 text-center">
              Enter and confirm your new admin password below.
            </p>
          </div>

          {/* Status Message */}
          {status && (
            <div className={`mb-6 p-4 border rounded-lg text-sm flex items-start gap-3 ${
              status === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              {status === 'success'
                ? <CheckCircle size={18} className="shrink-0 mt-0.5" />
                : <AlertTriangle size={18} className="shrink-0 mt-0.5" />
              }
              <span>{message}</span>
            </div>
          )}

          {/* Redirect notice after success */}
          {status === 'success' && (
            <p className="text-center text-gray-500 text-xs mb-4">Redirecting to login in 3 seconds...</p>
          )}

          {/* Form — hide after success */}
          {status !== 'success' && (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-[#020817] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0B79BF] focus:ring-1 focus:ring-[#0B79BF] transition-colors"
                    placeholder="Minimum 8 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password strength bar */}
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{ background: i <= strength ? strengthColor : '#374151' }}
                        />
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: strengthColor }}>{strengthLabel}</p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 bg-[#020817] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors ${
                      confirm && confirm !== password
                        ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/30'
                        : confirm && confirm === password
                        ? 'border-green-500/70 focus:border-green-500 focus:ring-green-500/30'
                        : 'border-gray-700 focus:border-[#0B79BF] focus:ring-[#0B79BF]'
                    }`}
                    placeholder="Repeat your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {confirm && confirm !== password && (
                  <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                )}
                {confirm && confirm === password && (
                  <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                    <CheckCircle size={12} /> Passwords match
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || password !== confirm || password.length < 8}
                className="w-full py-3 px-4 bg-[#14477B] hover:bg-[#0B79BF] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>

              <div className="text-center">
                <Link
                  to="/admin/login"
                  className="text-sm text-gray-500 hover:text-[#0B79BF] transition-colors inline-flex items-center gap-1"
                >
                  <ArrowLeft size={14} /> Back to Login
                </Link>
              </div>
            </form>
          )}

          {/* Login button after success */}
          {status === 'success' && (
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full py-3 px-4 bg-[#14477B] hover:bg-[#0B79BF] text-white rounded-lg font-medium transition-colors"
            >
              Go to Login
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
