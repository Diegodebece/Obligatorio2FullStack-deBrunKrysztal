import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import api from "../../api/api";
import LogoutButton from "../logout/LogoutButton";

const ViewerAside = () => {
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
    } catch (error) {
      setUsuario(null);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, [token]);

  return (
    <aside className="sidebar">
      <h2>{usuario?.username || "Usuario"}</h2>
      <p>{usuario?.email || "emailUsuario"}</p>

      <span className="badge">{datosToken.rol}</span>
      <span className="badge">{datosToken.plan}</span>

      <ul>
        <li>
          <a href="#viewer-resumen">Resumen</a>
        </li>
        <li>
          <a href="#catalogo">Catálogo de series</a>
        </li>
        <li>
          <a href="#viewer-seguimientos">Mis seguimientos</a>
        </li>
        <li>
          <a href="#viewer-estadisticas">Estadísticas</a>
        </li>
        <li>
          <a href="#viewer-ia">Recomendaciones IA</a>
        </li>
        <li>
          <a href="#viewer-api">API externa</a>
        </li>
      </ul>

      <LogoutButton />
    </aside>
  );
};

export default ViewerAside;