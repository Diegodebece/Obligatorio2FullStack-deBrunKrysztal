import { Outlet } from "react-router";
import AdminAside from "../components/admin/AdminAside";

const AdminPage = () => {
  return (
    <main className="layout admin-layout">
      <AdminAside />

      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default AdminPage;