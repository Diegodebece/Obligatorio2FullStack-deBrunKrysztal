import Modal from "react-modal";
import ViewerTrackingForm from "./ViewerTrackingForm";

Modal.setAppElement("#root");

const ViewerTrackingEditModal = ({
  seguimientoEditando,
  onGuardarSeguimiento,
  onCancelarEdicion,
}) => {
  return (
    <Modal
      isOpen={Boolean(seguimientoEditando)}
      onRequestClose={onCancelarEdicion}
      className="modal-rating-contenido"
      overlayClassName="modal-rating"
    >
        {seguimientoEditando && (
          <ViewerTrackingForm
            seguimientoEditando={seguimientoEditando}
            onGuardarSeguimiento={onGuardarSeguimiento}
            onCancelarEdicion={onCancelarEdicion}
          />
        )}
    </Modal>
  );
};

export default ViewerTrackingEditModal;