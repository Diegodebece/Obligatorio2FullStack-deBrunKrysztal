const PaginationControls = ({ paginacion, paginaActual, onCambiarPagina }) => {
  return (
    <div className="paginacion">
      <button
        type="button"
        disabled={!paginacion?.hasPrevPage}
        onClick={() => onCambiarPagina(paginacion.prevPage)}
      >
        Anterior
      </button>

      <span>
        Página {paginacion?.currentPage || paginaActual} de{" "}
        {paginacion?.totalPages || 1}
      </span>

      <button
        type="button"
        disabled={!paginacion?.hasNextPage}
        onClick={() => onCambiarPagina(paginacion.nextPage)}
      >
        Siguiente
      </button>
    </div>
  );
};

export default PaginationControls;
