import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    guardarToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },

    cerrarSesion: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { guardarToken, cerrarSesion } = authSlice.actions;

export default authSlice.reducer;