const ViewerSerieCard = ({ serie, nombreCategoria, onAgregarSeguimiento, estaEnSeguimientos, }) => {
  return (
    <article className="tarjeta">
      <div className="imagen">
        {serie.imagen ? (
          <img src={serie.imagen} alt={serie.titulo} />
        ) : (
          "imagenSerie"
        )}
      </div>

      <div>
        <h3>{serie.titulo}</h3>
        <p>{serie.descripcion}</p>
        <p>{serie.plataforma}</p>
        <p>{nombreCategoria}</p>
        <p>{serie.cantidadTemporadas} temporadas</p>

        <button
          type="button"
          disabled={estaEnSeguimientos}
          onClick={() => onAgregarSeguimiento(serie)}
        >
          {estaEnSeguimientos ? "Ya está en seguimiento" : "Agregar a seguimiento"}
        </button>
      </div>
    </article>
  );
};

export default ViewerSerieCard;