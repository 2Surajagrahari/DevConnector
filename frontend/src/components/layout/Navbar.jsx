import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HomeIcon, UserGroupIcon, BellIcon, EnvelopeIcon, BookmarkIcon, ClipboardDocumentListIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  // Helper function to determine active link
  const isActive = (path) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, text, mobile = false }) => (
    <Link
      to={to}
      className={`flex items-center p-3 rounded-full hover:bg-gray-100 transition-all duration-200 group ${
        mobile ? 'justify-center w-12 h-12' : 'justify-start space-x-3 w-full'
      } ${isActive(to) ? 'font-bold text-black' : 'text-gray-700'}`}
    >
      <Icon className={`h-6 w-6 ${isActive(to) ? 'scale-110' : 'group-hover:scale-105'}`} />
      {!mobile && <span className="text-xl">{text}</span>}
    </Link>
  );

  return (
    <>
      {/* Desktop Sidebar (Twitter-like) */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:px-6 md:py-4 border-r border-gray-200">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center md:justify-start px-3 mb-8">
          <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            DevConnector
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          <NavItem to="/" icon={HomeIcon} text="Home" />
          <NavItem to="/profiles" icon={UserGroupIcon} text="Developers" />
          <NavItem to="/posts" icon={ClipboardDocumentListIcon} text="Posts" />
          {isAuthenticated && (
            <>
              <NavItem to="/notifications" icon={BellIcon} text="Notifications" />
              <NavItem to="/messages" icon={EnvelopeIcon} text="Messages" />
              <NavItem to="/dashboard" icon={BookmarkIcon} text="Dashboard" />
            </>
          )}
        </nav>

        {/* User Profile Card / Auth Buttons (Bottom of sidebar) */}
        {isAuthenticated ? (
          <div className="mt-auto p-3 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200">
            <div className="flex items-center space-x-3">
              <img
                className="h-10 w-10 rounded-full object-cover border border-gray-300"
                src={user?.avatar || '/default-avatar.png'}
                alt="Profile"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{user?.name}</p>
                <p className="text-gray-500 text-sm truncate">@{user?.name?.replace(/\s+/g, '').toLowerCase()}</p>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={logout}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-150"
                  title="Logout"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-auto space-y-3">
            <Link
              to="/login"
              className="block w-full py-3 px-4 text-center rounded-full bg-white text-black border border-gray-300 hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="block w-full py-3 px-4 text-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation (Instagram-like) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          <NavItem to="/" icon={HomeIcon} text="Home" mobile />
          <NavItem to="/profiles" icon={UserGroupIcon} text="Devs" mobile />
          {isAuthenticated ? (
            <>
              <NavItem to="/notifications" icon={BellIcon} text="Notifications" mobile />
              <NavItem to="/messages" icon={EnvelopeIcon} text="Messages" mobile />
              <NavItem to="/dashboard" icon={UserIcon} text="Profile" mobile />
            </>
          ) : (
            <NavItem to="/login" icon={UserIcon} text="Login" mobile />
          )}
        </div>
      </div>

      {/* Main content should have padding to avoid overlapping with mobile nav */}
      <main className="md:pl-64 pb-16 md:pb-0">
        {/* Your page content will be injected here by React Router */}
      </main>
    </>
  );
};

export default Navbar;