import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api";
import {
  listarUsuarios,
  modificarUsuario,
} from "../../features/usuarios/usuarios.slice";
import PaginationControls from "../common/PaginationControls";


import AdminUsersTable from "./AdminUsersTable";

const AdminUsersManagement = () => {
  const dispatch = useDispatch();

  const [paginaActual, setPaginaActual] = useState(1);
  const [paginacion, setPaginacion] = useState(null);


  const cargarUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: paginaActual,
          limit: 10,
        },
      });

      dispatch(listarUsuarios(response.data.data));
      setPaginacion(response.data.pagination);
    } catch (error) {
      toast.error("Error al cargar usuarios");
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, [paginaActual]);

  const cambiarRolUsuario = async (id, nuevoRol) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.patch(
        `/usuarios/${id}/rol`,
        { rol: nuevoRol },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(modificarUsuario(response.data.data));
      toast.success("Rol modificado correctamente");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al modificar rol");
    }
  };

  return (
    <section className="panel" id="admin-usuarios">
      <h2>Gestión de usuarios</h2>

      <AdminUsersTable onCambiarRolUsuario={cambiarRolUsuario} />
      <PaginationControls
        paginacion={paginacion}
        paginaActual={paginaActual}
        onCambiarPagina={setPaginaActual}
      />
    </section>
  );
};

export default AdminUsersManagement;