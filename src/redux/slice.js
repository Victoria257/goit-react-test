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
  if (state.users.page === 1) {
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
      page: 1,
      hasNextPage: null,
      limit: 3,
      // total: null,
      isLoading: false,
      error: null,
    },
    nameButton: {},
    followersCount: {},
  },
  reducers: {
    incrementPage: state => {
      state.users.page += 1;
    },
    setNameButton: (state, action) => {
      state.nameButton = action.payload;
    },
    setFollowersCount: (state, action) => {
      const { id, count } = action.payload;
      state.followersCount[id] = count;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.rejected, handleRejected)
      .addCase(fetchUsers.fulfilled, handleFulfilled);
    // .addCase(fetchUsersLength.fulfilled, (state, action) => {
    //   state.users.total = action.payload;
    // })
    // .addCase(fetchUsersLength.pending, handlePending)
    // .addCase(fetchUsersLength.rejected, handleRejected);
  },
});

export const { incrementPage, setNameButton, setFollowersCount } =
  usersSlice.actions;

export default usersSlice.reducer;
