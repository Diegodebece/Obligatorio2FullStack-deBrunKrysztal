const AdminAside = () => {
  return (
    <aside className="sidebar">
      <h2>nombreAdmin</h2>
      <p>emailAdmin</p>

      <span className="badge admin-badge">admin</span>

      <ul>
        <li><a href="#admin-series">CRUD series</a></li>
        <li><a href="#admin-categorias">CRUD categorías</a></li>
        <li><a href="#admin-usuarios">Gestión usuarios</a></li>
        <li><a href="#admin-estadisticas">Estadísticas seguimientos</a></li>
      </ul>
    </aside>
  );
};

export default AdminAside;