import Modal from "react-modal";
Modal.setAppElement("#root");

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
    <Modal
    isOpen={Boolean(seguimiento)}
    onRequestClose={onCancelar}
    className="modal-rating-contenido"
    overlayClassName="modal-rating"
  >

        <h3>Terminaste {seguimiento.serie?.titulo || "la serie"}</h3>

        <p>¿Qué rating le das?</p>
        <p><small>No podrás darla por terminada si no la calificás</small></p>

        <div>
          <span>😴 1</span>

          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(event) => onCambiarRating(Number(event.target.value))}
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
      
    </Modal>
  );
};

export default ViewerRatingModal;