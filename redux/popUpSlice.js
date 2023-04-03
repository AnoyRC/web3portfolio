import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTile: 0,
  isActive: false,
};

export const popUpSlice = createSlice({
  name: "popUp",
  initialState,
  reducers: {
    setActiveTile: (state, action) => {
      state.activeTile = action.payload;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { setActiveTile, setIsActive } = popUpSlice.actions;

export default popUpSlice.reducer;
