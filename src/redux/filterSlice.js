import { createSlice } from '@reduxjs/toolkit';

const filterTweetsSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: 'Show all',
  },
  reducers: {
    changeFilter(state, action) {
      state.filters = action.payload;
    },
  },
});

export const { changeFilter } = filterTweetsSlice.actions;
export const filtersReducer = filterTweetsSlice.reducer;
