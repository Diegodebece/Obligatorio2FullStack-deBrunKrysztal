const ViewerTrackingFilters = ({ filtroSeguimiento, onCambiarFiltro }) => {
  return (
    <div className="filtros">
      <button type="button" onClick={() => onCambiarFiltro("todos")}>
        Todos
      </button>

      <button type="button" onClick={() => onCambiarFiltro("pendiente")}>
        Pendientes
      </button>

      <button type="button" onClick={() => onCambiarFiltro("viendo")}>
        Viendo
      </button>

      <button type="button" onClick={() => onCambiarFiltro("terminada")}>
        Terminadas
      </button>

      <button type="button" onClick={() => onCambiarFiltro("favoritas")}>
        Favoritas
      </button>
    </div>
  );
};

export default ViewerTrackingFilters;