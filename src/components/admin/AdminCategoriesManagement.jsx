import AdminCategoryForm from "./AdminCategoryForm";
import AdminCategoryTable from "./AdminCategoryTable";

const AdminCategoriesManagement = () => {
  return (
    <section
      className="panel"
      id="admin-categorias"
    >
      <h2>CRUD de categorías</h2>
      <AdminCategoryForm />
      <AdminCategoryTable />
    </section>
  );
};

export default AdminCategoriesManagement;