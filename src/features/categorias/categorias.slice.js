import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
};

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {
    
    listarCategorias: (state, action) => {state.categorias = action.payload;},
    crearCategoria: (state, action) => {state.categorias.push(action.payload);},
    modificarCategoria: (state, action) => {
      state.categorias = state.categorias.map((categoria) =>
        categoria._id === action.payload._id ? action.payload : categoria
      );
        
    },
    eliminarCategoria: (state, action) => {state.categorias = state.categorias.filter((categoria) => categoria._id !== action.payload);},
  },
});

export const {
  listarCategorias,
  crearCategoria,
  modificarCategoria,
  eliminarCategoria,
} = categoriasSlice.actions;

export default categoriasSlice.reducer;