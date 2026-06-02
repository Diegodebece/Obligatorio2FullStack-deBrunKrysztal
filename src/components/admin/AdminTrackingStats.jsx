import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api";
import { listarSeguimientosEstadisticas } from "../../features/estadisticas/estadisticas.slice";

import AdminStatsCards from "./AdminStatsCards";
import AdminStatsChart from "./AdminStatsChart";
import AdminStatsTable from "./AdminStatsTable";

const AdminTrackingStats = () => {
  const dispatch = useDispatch();

  const cargarSeguimientos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/seguimientos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 50,
        },
      });

      dispatch(listarSeguimientosEstadisticas(response.data.data));
    } catch (error) {
      toast.error("Error al cargar estadísticas");
    }
  };

  useEffect(() => {
    cargarSeguimientos();
  }, []);

  return (
    <section className="panel" id="admin-estadisticas">
      <h2>Estadísticas de seguimientos</h2>
      <AdminStatsCards />

      <h3>Seguimientos por estado</h3>
      <AdminStatsChart />

      <h3>Detalle de seguimientos</h3>
      <AdminStatsTable />
    </section>
  );
};

export default AdminTrackingStats;