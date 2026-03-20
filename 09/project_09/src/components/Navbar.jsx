import { Link, useLocation } from 'react-router-dom';
import { Coins, BarChart3, User } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Demo Crypto Exchange
            </span>
          </div>

          <div className="flex space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 transition-all duration-300 ${
                isActive('/')
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/trade"
              className={`flex items-center space-x-1 transition-all duration-300 ${
                isActive('/trade')
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Trade</span>
            </Link>
            <Link
              to="/profile"
              className={`flex items-center space-x-1 transition-all duration-300 ${
                isActive('/profile')
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}