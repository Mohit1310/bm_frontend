import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import samayBM from '@/assets/SamayBM.png';
import profileIcon from '@/assets/profile.png';
import { Menu, X } from 'react-feather';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate(process.env.REACT_APP_FRONTEND_URL || "/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const linkClasses = (path: string) => 
    `font-mono text-lg ml-4 ${location.pathname === path ? 'text-white' : 'text-gray-500'} hover:text-white`;

  return (
    <div className={`bg-black flex flex-col items-center gap-6 py-6 border-r border-[#333333] md:w-64 w-full fixed top-0 left-0 h-full transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-full'}`}>
      <div className="flex justify-between w-full px-4 md:hidden">
        <Link to="#" className="flex items-center">
          <img src={samayBM} alt="BM Samay Logo" className="h-10 w-10" style={{ objectFit: 'contain' }} />
          <span className="text-2xl font-bold text-white ml-4">BM Samay</span>
        </Link>
        <button onClick={toggleSidebar} className="text-white">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className="hidden md:flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <img src={samayBM} alt="BM Samay Logo" className="h-16 w-16" style={{ objectFit: 'contain' }} />
          <span className="text-2xl font-bold text-white ml-4">BM Samay</span>
        </div>
      </div>
      <nav className="flex flex-col gap-4 mt-6 w-full items-center md:items-start">
        <Link to="/welcome" className={linkClasses('/welcome')}>Welcome</Link>
        <Link to="/community" className={linkClasses('/community')}>Community</Link>
        <Link to="#" className="text-gray-500 font-mono text-lg hover:text-white ml-4">Integrations <span className="text-sm">(coming soon)</span></Link>
        <Link to="#" className="text-gray-500 font-mono text-lg hover:text-white ml-4">BM Points <span className="text-sm">(coming soon)</span></Link>
      </nav>
      <div className="flex-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full w-13 h-13 border-2 border-[#00ff00]">
            <img src={profileIcon} width="35" height="25" alt="Profile Icon" className="rounded-full" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-white" onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}