import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router";

import api from "../../api/api";
import LogoutButton from "../logout/LogoutButton";

const ViewerAside = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return null;
  }

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
    } catch (error) {
      setUsuario(null);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, [token]);

  const claseLink = ({ isActive }) => (isActive ? "active" : "");

  return (
    <aside className="sidebar">
      <h2>{usuario?.username || "Usuario"}</h2>
      <p>{usuario?.email || "emailUsuario"}</p>

      <span className="badge">{datosToken.rol}</span>
      <span className="badge">{datosToken.plan}</span>

      <ul>
        <li>
          <NavLink to="/viewer/resumen" className={claseLink}>
            Resumen
          </NavLink>
        </li>

        <li>
          <NavLink to="/viewer/plan" className={claseLink}>
            Mi plan
          </NavLink>
        </li>

        <li>
          <NavLink to="/viewer/catalogo" className={claseLink}>
            Catálogo de series
          </NavLink>
        </li>

        <li>
          <NavLink to="/viewer/seguimientos" className={claseLink}>
            Mis seguimientos
          </NavLink>
        </li>

        <li>
          <NavLink to="/viewer/estadisticas" className={claseLink}>
            Estadísticas
          </NavLink>
        </li>

        <li>
          <NavLink to="/viewer/ia" className={claseLink}>
            Recomendaciones IA
          </NavLink>
        </li>
      </ul>

      <LogoutButton />
    </aside>
  );
};

export default ViewerAside;