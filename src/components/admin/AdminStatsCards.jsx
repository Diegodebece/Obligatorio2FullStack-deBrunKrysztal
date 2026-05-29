const AdminStatsCards = () => {
  return (
    <div className="cards-resumen">
      <article className="resumen-card">
        <h3>Total seguimientos</h3>
        <p>cantidadSeguimientos</p>
      </article>

      <article className="resumen-card">
        <h3>Series favoritas</h3>
        <p>cantidadFavoritas</p>
      </article>

      <article className="resumen-card">
        <h3>Usuarios activos</h3>
        <p>cantidadUsuariosConSeguimientos</p>
      </article>

      <article className="resumen-card">
        <h3>Rating promedio</h3>
        <p>ratingPromedioGeneral</p>
      </article>
    </div>
  );
};

export default AdminStatsCards;