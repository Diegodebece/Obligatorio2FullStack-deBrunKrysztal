import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seguimientos: [],
};

const estadisticasSlice = createSlice({
  name: "estadisticas",
  initialState,
  reducers: {
    listarSeguimientosEstadisticas: (state, action) => {
      state.seguimientos = action.payload;
    },
  },
});

export const { listarSeguimientosEstadisticas } = estadisticasSlice.actions;

export default estadisticasSlice.reducer;