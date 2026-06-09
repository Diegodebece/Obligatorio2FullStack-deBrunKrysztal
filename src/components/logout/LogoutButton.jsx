import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { cerrarSesion } from "../../features/auth/auth.slice";
import { listarCategorias } from "../../features/categorias/categorias.slice";
import { listarSeries } from "../../features/series/series.slice";
import { listarSeguimientos } from "../../features/seguimientos/seguimientos.slice";
import { listarUsuarios } from "../../features/usuarios/usuarios.slice";
import { listarSeguimientosEstadisticas } from "../../features/estadisticas/estadisticas.slice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(cerrarSesion());

    dispatch(listarCategorias([]));
    dispatch(listarSeries([]));
    dispatch(listarSeguimientos([]));
    dispatch(listarUsuarios([]));
    dispatch(listarSeguimientosEstadisticas([]));

    navigate("/");
  };

  return (
    <button type="button" onClick={logout}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;