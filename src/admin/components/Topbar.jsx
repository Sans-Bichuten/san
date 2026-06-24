import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bell, Search, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';

const Topbar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  // Notifications State
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    // Poll for new leads every 45 seconds to keep it live
    const interval = setInterval(fetchNotifications, 45000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await apiFetch('/leads/get-leads.php');
      if (data.status === 'success') {
        const unread = data.leads.filter(l => !l.is_read || l.is_read === 0 || l.is_read === '0');
        setNotifications(unread);
        setUnreadCount(unread.length);
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  const handleNotificationClick = async (leadId) => {
    try {
      await apiFetch('/leads/update-lead.php', {
        method: 'POST',
        body: JSON.stringify({ id: leadId, is_read: 1 })
      });
      setNotifications(prev => prev.filter(n => n.id !== leadId));
      setUnreadCount(prev => Math.max(0, prev - 1));
      setIsOpen(false);
      navigate('/admin/leads');
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.map(n => 
          apiFetch('/leads/update-lead.php', {
            method: 'POST',
            body: JSON.stringify({ id: n.id, is_read: 1 })
          })
        )
      );
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="h-16 bg-[#0B1220] border-b border-gray-800 flex items-center justify-between px-6 font-helvetica sticky top-0 z-20">
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .border-gray-850 {
          border-color: #1f2937;
        }
        .divide-gray-850 > :not([hidden]) ~ :not([hidden]) {
          border-color: #1f2937;
        }
      `}</style>

      {/* Left side - Search */}
      <div className="flex items-center bg-[#020817] rounded-lg border border-gray-800 px-3 py-1.5 w-64">
        <Search size={16} className="text-gray-500 mr-2" />
        <input 
          type="text" 
          placeholder="Search operations..." 
          className="bg-transparent text-sm text-white focus:outline-none w-full placeholder-gray-600"
        />
      </div>

      {/* Right side - Profile & Actions */}
      <div className="flex items-center gap-6" ref={dropdownRef}>
        <div className="relative">
          <button 
            onClick={() => {
              setIsOpen(!isOpen);
              if (!isOpen) fetchNotifications();
            }}
            className="text-gray-400 hover:text-white relative transition-colors pt-1 flex items-center"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1.5 px-1 min-w-[14px] h-[14px] bg-[#0B79BF] text-[8px] font-bold text-white rounded-full flex items-center justify-center border border-[#0B1220]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-[#0B1220]/95 backdrop-blur-xl border border-gray-850 rounded-xl shadow-2xl overflow-hidden z-30 font-helvetica animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-850 flex justify-between items-center bg-[#071120]/50">
                <span className="font-semibold text-xs text-white flex items-center gap-1.5">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[9px] bg-[#14477B] text-white rounded-full font-bold">
                      {unreadCount} New
                    </span>
                  )}
                </span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[10px] text-[#0B79BF] hover:text-white transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-gray-850">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500 text-xs">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => handleNotificationClick(n.id)}
                      className="px-4 py-3 hover:bg-[#14477B]/10 cursor-pointer transition-colors flex flex-col gap-1 text-left"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-xs text-white truncate max-w-[170px]">{n.name}</span>
                        <span className="text-[9px] text-gray-500">
                          {new Date(n.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-gray-850 bg-[#071120]/30 text-center">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/admin/leads');
                  }}
                  className="block w-full py-1.5 text-xs text-center text-gray-400 hover:text-white hover:bg-[#14477B]/10 rounded transition-all font-medium"
                >
                  View All Inquiries
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-gray-800"></div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14477B] to-[#0B79BF] flex items-center justify-center text-white font-bold text-sm border border-white/10 shadow-[0_0_10px_rgba(11,121,191,0.3)]">
            {admin?.name?.charAt(0) || <Shield size={16} />}
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-white">{admin?.name || 'Admin'}</div>
            <div className="text-xs text-gray-400 capitalize">{admin?.role?.replace('_', ' ') || 'System'}</div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors ml-2"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
