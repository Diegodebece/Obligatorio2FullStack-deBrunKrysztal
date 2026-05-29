import AdminSerieCard from "./AdminSerieCard";
import AdminSerieForm from "./AdminSerieForm";

const AdminSeriesManagement = () => {
  return (
    <section className="panel" id="admin-series">
      <h2>CRUD de series</h2>

      <AdminSerieForm />

      <div className="tarjetas">
        <AdminSerieCard />
        <AdminSerieCard />
      </div>
    </section>
  );
};

export default AdminSeriesManagement;