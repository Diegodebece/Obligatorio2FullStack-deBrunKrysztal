const ViewerRatingModal = ({
  seguimiento,
  rating,
  onCambiarRating,
  onConfirmar,
  onCancelar,
}) => {
  if (!seguimiento) {
    return null;
  }

  return (
    <div className="modal-rating">
      <div className="modal-rating-contenido">
        <h3>Terminaste {seguimiento.serie?.titulo || "la serie"}</h3>

        <p>¿Qué rating le das?</p>

        <div>
          <span>😴 1</span>

          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(event) => onCambiarRating(event.target.value)}
          />

          <span>🤩 10</span>
        </div>

        <strong>{rating}/10</strong>

        <button type="button" onClick={onConfirmar}>
          Guardar rating
        </button>

        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ViewerRatingModal;