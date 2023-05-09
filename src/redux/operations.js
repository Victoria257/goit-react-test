import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://642fd67cb289b1dec4bb2a03.mockapi.io/users';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (page, thunkAPI) => {
    console.log(page);
    const limit = 5 * page;
    console.log(limit);
    const params = {
      completed: false,
      page: page,
      limit: limit,
    };
    try {
      const { data } = await axios.get(URL, { params });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
