import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, MapPin, Trophy, Home as HomeIcon } from 'lucide-react';
import ScoreBoard from './ScoreBoard';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLevel = location.pathname === '/level';

  return (
    <nav className={`fixed w-full z-50 ${
      isLevel ? 'bg-[#1F0C00]' : 'bg-stone-900/95 backdrop-blur-sm border-b border-amber-900/20'
    } transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/sherlock" className="flex items-center space-x-2">
            <img src="/image.png" alt="Sherlocked Logo" className="h-8 w-auto" />
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-amber-200 to-amber-400 text-transparent bg-clip-text">
              Sherlocked
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Home', path: '/sherlock', icon: HomeIcon },
              { name: 'Map', path: '/level', icon: MapPin },
              { name: 'Leaderboard', path: '/leaderboard', icon: Trophy }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-amber-200/80 hover:text-amber-100 transition-all duration-200 flex items-center space-x-2 group"
              >
                <item.icon size={18} className="group-hover:rotate-12 transition-transform" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <ScoreBoard />
          </div>

          <button className="md:hidden text-amber-200" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-stone-900/95 backdrop-blur-sm border-b border-amber-900/20 py-4">
            <div className="flex flex-col space-y-4 px-4">
              {['Home', 'Map', 'Leaderboard'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/sherlock' : `/${item.toLowerCase()}`}
                  className="text-amber-200/80 hover:text-amber-100 transition-all duration-200 flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item === 'Home' && <HomeIcon size={18} />}
                  {item === 'Map' && <MapPin size={18} />}
                  {item === 'Leaderboard' && <Trophy size={18} />}
                  <span>{item}</span>
                </Link>
              ))}
              <div className="pt-2 border-t border-amber-900/20">
                <ScoreBoard />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
