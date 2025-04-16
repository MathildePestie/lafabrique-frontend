import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [], // un tableau de palettes → chaque palette = tableau de couleurs
};

export const paletteSlice = createSlice({
  name: "palette",
  initialState,
  reducers: {
    savePalette: (state, action) => {
      state.value.push(action.payload); 
    },
    resetPalette: (state) => {
      state.value = [];
    },
  },
});

export const { savePalette, resetPalette } = paletteSlice.actions;

export default paletteSlice.reducer;