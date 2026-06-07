import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router";

import api from "../../api/api";
import LogoutButton from "../logout/LogoutButton";

const AdminAside = () => {
  const token = useSelector((state) => state.auth.token);

  const [usuario, setUsuario] = useState(null);

  const datosToken = jwtDecode(token);

  const cargarUsuario = async () => {
    try {
      const response = await api.get(`/usuarios/${datosToken.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsuario(response.data.data);
    } catch {
      setUsuario(null);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, [token]);

  const claseLink = ({ isActive }) => (isActive ? "active" : "");

  return (
    <aside className="sidebar">
      <h2>{usuario?.username || "Administrador"}</h2>
      <p>{usuario?.email || "emailAdmin"}</p>

      <span className="badge admin-badge">{datosToken.rol}</span>

      <ul>
        <li>
          <NavLink to="/admin/series" className={claseLink}>
            CRUD series
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/categorias" className={claseLink}>
            CRUD categorías
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/usuarios" className={claseLink}>
            Gestión usuarios
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/estadisticas" className={claseLink}>
            Estadísticas seguimientos
          </NavLink>
        </li>
      </ul>

      <LogoutButton />
    </aside>
  );
};

export default AdminAside;