import AdminStatsCards from "./AdminStatsCards";
import AdminStatsChart from "./AdminStatsChart";
import AdminStatsTable from "./AdminStatsTable";

const AdminTrackingStats = () => {
  return (
    <section className="panel" id="admin-estadisticas">
      <h2>Estadísticas de seguimientos</h2>
      <AdminStatsCards />

      <h3>Estadísticas por serie</h3>
      <AdminStatsTable />
      <AdminStatsChart />
    </section>
  );
};

export default AdminTrackingStats;