import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FiltersState = {
  activeTab: 'all' | 'expenses' | 'income';
  selectedDate: string | null; // Change to string type for better serialization
};

const initialState: FiltersState = {
  activeTab: 'all',
  selectedDate: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<'all' | 'expenses' | 'income'>) => {
      state.activeTab = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<Date | null>) => {
      // Store date as ISO string for consistent serialization
      state.selectedDate = action.payload ? action.payload.toISOString() : null;
    },
    resetFilters: state => {
      state.activeTab = 'all';
      state.selectedDate = null;
    },
  },
});

export const { setActiveTab, setSelectedDate, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
