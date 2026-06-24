import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#020817] text-gray-300 overflow-hidden font-helvetica">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-[#020817] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#14477B]/10 via-[#020817] to-[#020817]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
