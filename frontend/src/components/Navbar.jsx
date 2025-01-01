import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const location = useLocation();
  const isLevel = location.pathname === '/level';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`p-4 ${
        isLevel ? 'bg-[#1F0C00]' : 'bg-gray-800'
      } transition-colors duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/sherlock" className="text-2xl font-bold text-white">
          Sherlocked
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/sherlock" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/level" className="text-white hover:text-gray-300">
              Map
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="text-white hover:text-gray-300">
              Leaderboard
            </Link>
          </li>
        </ul>

        {/* Hamburger Menu Icon */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                to="/sherlock"
                className="text-white hover:text-gray-300 block"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/level"
                className="text-white hover:text-gray-300 block"
                onClick={() => setIsOpen(false)}
              >
                Map
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className="text-white hover:text-gray-300 block"
                onClick={() => setIsOpen(false)}
              >
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
