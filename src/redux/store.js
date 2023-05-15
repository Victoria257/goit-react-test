import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { filtersReducer } from './filterSlice';

const persistConfig = {
  key: 'users',
  storage,
  blacklist: ['page'],
};

export const store = configureStore({
  reducer: {
    users: persistReducer(persistConfig, usersReducer),
    filterTweets: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
