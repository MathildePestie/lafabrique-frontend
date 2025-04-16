import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: [],
  couleur: [],
  quantité: 0,
  prixTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      return {
        ...state,
        type: [...state.type, action.payload.type],
        couleur: [...state.couleur, ...action.payload.couleur],
        quantité: state.quantité + action.payload.quantité,
        prixTotal: state.prixTotal + action.payload.prixTotal,
      }
    },

    deleteItem: (state, action) => {
      console.log("reducer results :", action.payload);
      return (state = action.payload);
    },

    reset: (state) => {
      return initialState;
    },
  },
});

export const { add, deleteItem, reset } = cartSlice.actions;

export default cartSlice.reducer;
