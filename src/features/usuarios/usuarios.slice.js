import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuarios: [],
};

const usuariosSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    listarUsuarios: (state, action) => {
      state.usuarios = action.payload;
    },

    modificarUsuario: (state, action) => {
      state.usuarios = state.usuarios.map((usuario) =>
        usuario._id === action.payload._id ? action.payload : usuario
      );
    },
  },
});

export const { listarUsuarios, modificarUsuario } = usuariosSlice.actions;

export default usuariosSlice.reducer;