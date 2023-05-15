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
  if (state.page === 1) {
    state.users.items = [...action.payload];
  } else {
    state.users.items = [...state.users.items, ...action.payload];
  }
  state.users.hasNextPage = action.payload.length >= state.users.limit;
};

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {
      items: [],
      hasNextPage: null,
      limit: 3,
      // total: null,
      isLoading: false,
      error: null,
    },
    prevPage: 0,
    page: 1,
    nameButton: {},
  },
  reducers: {
    incrementPage: state => {
      state.page += 1;
    },
    incrementPrevPage: (state, action) => {
      state.prevPage = action.payload;
    },
    setNameButton: (state, action) => {
      state.nameButton = action.payload;
    },
    setItems: (state, action) => {
      state.users.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.rejected, handleRejected)
      .addCase(fetchUsers.fulfilled, handleFulfilled);
  },
});

export const { incrementPage, incrementPrevPage, setNameButton, setItems } =
  usersSlice.actions;

export default usersSlice.reducer;
