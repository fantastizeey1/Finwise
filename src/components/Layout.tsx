// File: components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleMobileSidebar } from '../store/uiSlice';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const { collapsed, mobileOpen } = useSelector((state: RootState) => state.ui.sidebar);

  // Toggle mobile sidebar
  const toggleSidebar = () => {
    dispatch(toggleMobileSidebar(!mobileOpen));
  };

  return (
    <div className="flex h-screen flex-row bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* <div className="md:hidden p-4 bg-white border-b fixed top-0 left-0 right-0 z-30 flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <span className="font-semibold">FinWise</span>
        </div> */}

        {/* Main content */}
        <main
          className={`
    flex-1 max-h-full pl-4 pt-0 md:pt-0 transition-all duration-300  overflow-y-auto
    ${mobileOpen ? 'ml-0' : collapsed ? 'md:ml-20' : 'md:ml-64'}
  `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
