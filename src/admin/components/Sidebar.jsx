import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Briefcase, Users, 
  Mail, Image as ImageIcon, Search, Settings, 
  ShieldCheck, Activity
} from 'lucide-react';
import BichutenLogo from '../../assets/Bichutenwhitelogo.png';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Case Studies', path: '/admin/case-studies', icon: Briefcase },
    { name: 'Leads', path: '/admin/leads', icon: Users },
    { name: 'Careers', path: '/admin/careers', icon: Briefcase },
    { name: 'Newsletter', path: '/admin/newsletter', icon: Mail },
    { name: 'Media', path: '/admin/media', icon: ImageIcon },
    { name: 'SEO', path: '/admin/seo', icon: Search },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
    { name: 'Admins', path: '/admin/admins', icon: ShieldCheck },
    { name: 'Activity Logs', path: '/admin/activity-logs', icon: Activity },
  ];

  return (
    <div className="w-64 bg-[#071120] border-r border-gray-800 flex flex-col h-full font-helvetica">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <img src={BichutenLogo} alt="Bichuten" className="h-6" />
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-[#14477B]/30 text-white shadow-[0_0_15px_rgba(11,121,191,0.2)] border border-[#0B79BF]/30' 
                  : 'text-gray-400 hover:bg-[#0B1220] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} className={isActive ? 'text-[#0B79BF]' : ''} />
                <span className="text-sm font-medium">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-800 text-xs text-gray-600 text-center">
        v1.0 Core Infrastructure
      </div>
    </div>
  );
};

export default Sidebar;
