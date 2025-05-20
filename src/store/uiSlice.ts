// File: store/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  collapsed: boolean;
  mobileOpen: boolean;
}

interface UiState {
  sidebar: SidebarState;
}

const initialState: UiState = {
  sidebar: {
    collapsed: window.innerWidth < 768, // Default collapsed on mobile
    mobileOpen: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.sidebar.collapsed = action.payload;
      } else {
        state.sidebar.collapsed = !state.sidebar.collapsed;
      }
    },
    toggleMobileSidebar: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.sidebar.mobileOpen = action.payload;
      } else {
        state.sidebar.mobileOpen = !state.sidebar.mobileOpen;
      }
    },
  },
});

export const { toggleSidebar, toggleMobileSidebar } = uiSlice.actions;
export default uiSlice.reducer;
