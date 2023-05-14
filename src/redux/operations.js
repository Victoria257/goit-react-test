import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://642fd67cb289b1dec4bb2a03.mockapi.io/users';

// export const fetchUsersLength = createAsyncThunk(
//   'users/fetchLength',
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await axios.get(URL);
//       return await data.length;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async ({ page, limit }, thunkAPI) => {
    const params = {
      // count: true,
      // completed: false,
      page,
      limit,
    };
    try {
      const { data } = await axios.get(URL, { params });
      return await data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
