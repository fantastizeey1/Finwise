// File: components/Sidebar.tsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  BarChart2,
  Target,
  Bell,
  HeadphonesIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { RootState } from '../store';
import { toggleSidebar, toggleMobileSidebar } from '../store/uiSlice';

interface SidebarLink {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { collapsed, mobileOpen } = useSelector((state: RootState) => state.ui.sidebar);

  // Auto-collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !collapsed) {
        dispatch(toggleSidebar(true));
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, collapsed]);

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (mobileOpen) {
      dispatch(toggleMobileSidebar(false));
    }
  }, [location.pathname, dispatch, mobileOpen]);

  const links: SidebarLink[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ArrowLeftRight, label: 'Transactions', path: '/transactions' },
    { icon: PiggyBank, label: 'Budgets', path: '/budgets' },
    { icon: BarChart2, label: 'Expenses', path: '/expenses' },
    { icon: PiggyBank, label: 'Total Savings', path: '/savings' },
    { icon: Target, label: 'Saving Goals', path: '/goals' },
    { icon: Bell, label: 'Notification', path: '/notifications', badge: 3 },
    { icon: HeadphonesIcon, label: 'Customer Support', path: '/support' },
  ];

  // Handle logout action
  const handleLogout = () => {
    // Implement logout logic with Redux
    console.log('Logging out...');
    // dispatch(logout());
  };

  // Mobile menu toggle button (visible only on mobile)

  return (
    <>
      {/* Toggle button: hamburger on mobile, arrow on desktop */}

      <aside
        className={`
          bg-white shadow-lg flex flex-col transition-all duration-300 h-screen
          fixed top-0 left-0 z-40
          ${collapsed ? 'w-20' : 'w-64'} 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-4  flex items-center justify-between pb-6 border-b">
          <h1 className={`text-2xl font-bold text-blue-500 ${collapsed ? 'hidden' : 'block'}`}>
            FinWise
          </h1>

          {/* Desktop toggle */}
          <button
            onClick={() => dispatch(toggleSidebar(!collapsed))}
            className="p-1 rounded-full hover:bg-gray-100 hidden md:block"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => dispatch(toggleMobileSidebar(!mobileOpen))}
            className="p-1 rounded-full hover:bg-gray-100 md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link, index) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={index}
                to={link.path}
                className={`relative flex items-center px-2 py-3 rounded-lg transition-colors hover:bg-blue-50 ${
                  isActive ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600'
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8">
                  <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-500'} />
                </div>
                {!collapsed && (
                  <div className="ml-3 flex-1 flex justify-between items-center">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {link.badge}
                      </span>
                    )}
                  </div>
                )}
                {collapsed && link.badge && (
                  <span className="absolute right-1 top-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t">
          <Link
            to="/settings"
            className="flex items-center px-2 py-3 rounded-lg transition-colors hover:bg-blue-50 text-gray-600"
          >
            <div className="flex items-center justify-center w-8 h-8">
              <Settings size={20} className="text-gray-500" />
            </div>
            {!collapsed && <span className="ml-3">Settings</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-2 py-3 rounded-lg transition-colors hover:bg-red-50 text-gray-600"
          >
            <div className="flex items-center justify-center w-8 h-8">
              <LogOut size={20} className="text-gray-500" />
            </div>
            {!collapsed && <span className="ml-3">Log out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
