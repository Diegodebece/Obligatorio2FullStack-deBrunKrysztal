import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seguimientos: [],
};

const seguimientosSlice = createSlice({
  name: "seguimientos",
  initialState,
  reducers: {
    listarSeguimientos: (state, action) => {
      state.seguimientos = action.payload;
    },

    crearSeguimiento: (state, action) => {
      state.seguimientos.push(action.payload);
    },

    modificarSeguimiento: (state, action) => {
      state.seguimientos = state.seguimientos.map((seguimiento) =>
        seguimiento._id === action.payload._id ? action.payload : seguimiento
      );
    },

    eliminarSeguimiento: (state, action) => {
      state.seguimientos = state.seguimientos.filter(
        (seguimiento) => seguimiento._id !== action.payload
      );
    },
  },
});

export const {
  listarSeguimientos,
  crearSeguimiento,
  modificarSeguimiento,
  eliminarSeguimiento,
} = seguimientosSlice.actions;

export default seguimientosSlice.reducer;