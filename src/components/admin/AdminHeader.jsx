const AdminHeader = () => {
  return (
    <header className="header admin-header">
      <div>
        <h1>Series Tracker</h1>
        <p>Panel de administración - Admin</p>
      </div>

      <nav>
        <a href="#admin-series">Series</a>
        <a href="#admin-categorias">Categorías</a>
        <a href="#admin-usuarios">Usuarios</a>
        <a href="#admin-estadisticas">Estadísticas</a>
      </nav>

      <button type="button">Cerrar sesión</button>
    </header>
  );
};

export default AdminHeader;