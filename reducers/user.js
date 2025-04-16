import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    token: null,
    nom: null,
    prénom: null,
    rue: null,
    codePostal: null,
    ville: null,
    mail: null,
    téléphone: null,
    commandes: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:  {
        login: (state, action) => {
            console.log("reducer results :", action.payload);
            return state = action.payload;
        },

        logout: (state) => {
            return state = initialState;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;


