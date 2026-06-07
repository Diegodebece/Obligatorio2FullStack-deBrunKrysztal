import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

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
    } catch (error) {
      setUsuario(null);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, [token]);

  return (
    <aside className="sidebar">
      <h2>{usuario?.username || "Administrador"}</h2>
      <p>{usuario?.email || "emailAdmin"}</p>

      <span className="badge admin-badge">{datosToken.rol}</span>

      <ul>
        <li>
          <a href="#admin-series">CRUD series</a>
        </li>
        <li>
          <a href="#admin-categorias">CRUD categorías</a>
        </li>
        <li>
          <a href="#admin-usuarios">Gestión usuarios</a>
        </li>
        <li>
          <a href="#admin-estadisticas">Estadísticas seguimientos</a>
        </li>
      </ul>

      <LogoutButton />
    </aside>
  );
};

export default AdminAside;