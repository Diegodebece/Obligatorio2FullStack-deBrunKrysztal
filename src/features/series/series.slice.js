import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  series: [],
};

const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    
    listarSeries: (state, action) => {state.series = action.payload;},

    crearSerie: (state, action) => {state.series.push(action.payload);},

    modificarSerie: (state, action) => {
      state.series = state.series.map((serie) => serie._id === action.payload._id ? action.payload : serie);
    },

    eliminarSerie: (state, action) => { state.series = state.series.filter((serie) => serie._id !== action.payload);
    },
  },
});

export const {
  listarSeries,
  crearSerie,
  modificarSerie,
  eliminarSerie,
} = seriesSlice.actions;

export default seriesSlice.reducer;