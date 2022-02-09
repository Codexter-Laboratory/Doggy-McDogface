import {createSlice} from '@reduxjs/toolkit';

const dog = {
  data: [],
  images: [],
};

//creating the slice function where "dogs" is passed as an initial state
export const dogSlice = createSlice({
  name: 'dogs',
  initialState: dog,

  //creating reducers to update the state based on specific actions
  reducers: {
    FETCH_BREEDS: (state, action) => {
      state.data = action.payload.data;
    },
    FETCH_IMAGES: (state, action) => {
      state.images = action.payload.images;
    },
  },
});

export const dogAction = dogSlice.actions;
