import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './operations';

const handlePending = state => {
  state.users.isLoading = true;
};
const handleRejected = (state, action) => {
  state.users.isLoading = false;
  state.users.error = action.payload;
};

const handleFulfilled = (state, action) => {
  state.users.isLoading = false;
  state.users.error = null;
  state.users.items = action.payload;
};

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {
      items: [],
      page: 1,
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    incrementPage: state => {
      state.users.page += 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.rejected, handleRejected)
      .addCase(fetchUsers.fulfilled, handleFulfilled);
  },
});

export const { incrementPage } = usersSlice.actions;
export default usersSlice.reducer;
