'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logout());
    router.push('/');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="glass-card border-x-0 border-t-0 rounded-none px-6 py-4 mb-8 flex justify-between items-center">
      <Link href="/dashboard">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tighter whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] drop-shadow-[0_0_10px_rgba(188,19,254,0.5)]">
          SD-Arcade
        </h1>
      </Link>
      
      <div className="flex items-center gap-6">
        <span className="text-gray-300 font-medium">Player: <span className="text-[#00f3ff]">{user?.username}</span></span>
        <Link href="/settings" className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
          Settings
        </Link>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
