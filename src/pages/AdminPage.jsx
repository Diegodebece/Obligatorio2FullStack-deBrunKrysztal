import AdminAside from "../components/admin/AdminAside";
import AdminCategoriesManagement from "../components/admin/AdminCategoriesManagement";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSeriesManagement from "../components/admin/AdminSeriesManagement";
import AdminTrackingStats from "../components/admin/AdminTrackingStats";
import AdminUsersManagement from "../components/admin/AdminUsersManagement";

const AdminPage = () => {
  return (
    <>
      <AdminHeader />

      <main className="layout admin-layout">
        <AdminAside />

        <section className="content">
          <AdminSeriesManagement />
          <AdminCategoriesManagement />
          <AdminUsersManagement />
          <AdminTrackingStats />
        </section>
      </main>
    </>
  );
};

export default AdminPage;