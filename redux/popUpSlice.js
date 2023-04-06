import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTile: 0,
  isActive: false,
  activeColor: "#d9f99d",
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
    setActiveColor: (state, action) => {
      state.activeColor = action.payload;
    },
  },
});

export const { setActiveTile, setIsActive, setActiveColor } =
  popUpSlice.actions;

export default popUpSlice.reducer;
