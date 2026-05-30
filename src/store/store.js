import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import categoriasReducer from "../features/categorias/categorias.slice";
import seriesReducer from "../features/series/series.slice";
import usuariosReducer from "../features/usuarios/usuarios.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categorias: categoriasReducer,
    series: seriesReducer,
    usuarios: usuariosReducer,
  },
});
   