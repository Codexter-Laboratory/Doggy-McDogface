import {configureStore} from '@reduxjs/toolkit';
import {dogSlice} from './slices/BreedSlice';
export const store = configureStore({
  reducer: dogSlice.reducer,
});
