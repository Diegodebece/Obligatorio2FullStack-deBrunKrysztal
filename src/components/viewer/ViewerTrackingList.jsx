import ViewerTrackingCard from "./ViewerTrackingCard";

const ViewerTrackingList = ({
  seguimientos,
  seguimientosFiltrados,
  onAvanzar,
  onEditar,
  onEliminar,
  obtenerTextoBotonAvance,
}) => {
  return (
    <div className="tarjetas">
      {seguimientos.length === 0 && <p>No tenés seguimientos todavía.</p>}

      {seguimientos.length > 0 && seguimientosFiltrados.length === 0 && (
        <p>No hay seguimientos para este filtro.</p>
      )}

      {seguimientosFiltrados.map((seguimiento) => (
        <ViewerTrackingCard
          key={seguimiento._id}
          seguimiento={seguimiento}
          onAvanzar={onAvanzar}
          onEditar={onEditar}
          onEliminar={onEliminar}
          obtenerTextoBotonAvance={obtenerTextoBotonAvance}
        />
      ))}
    </div>
  );
};

export default ViewerTrackingList;