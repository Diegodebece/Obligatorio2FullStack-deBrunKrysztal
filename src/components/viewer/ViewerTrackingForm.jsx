const ViewerTrackingForm = ({
  serie,
  formSeguimiento,
  onCambiarFormulario,
  onGuardarSeguimiento,
  onCancelarSeguimiento,
}) => {
  return (
    <form className="form seguimiento-form" onSubmit={onGuardarSeguimiento}>
      <h3>Agregar seguimiento: {serie.titulo}</h3>

      <label>Estado</label>
      <select
        name="estado"
        value={formSeguimiento.estado}
        onChange={onCambiarFormulario}
      >
        <option value="pendiente">Pendiente</option>
        <option value="viendo">Viendo</option>
        <option value="terminada">Terminada</option>
      </select>

      <label>Temporada actual</label>
      <input
        type="number"
        min="0"
        name="temporadaActual"
        placeholder="Temporada actual"
        value={formSeguimiento.temporadaActual}
        onChange={onCambiarFormulario}
      />

      <label>Episodio actual</label>
      <input
        type="number"
        min="0"
        name="episodioActual"
        placeholder="Episodio actual"
        value={formSeguimiento.episodioActual}
        onChange={onCambiarFormulario}
      />

      <label>Rating personal</label>
      <input
        type="number"
        min="1"
        max="10"
        name="ratingPersonal"
        placeholder="Rating personal"
        value={formSeguimiento.ratingPersonal}
        onChange={onCambiarFormulario}
      />

      <label>Fecha de inicio</label>
      <input
        type="date"
        name="fechaInicio"
        value={formSeguimiento.fechaInicio}
        onChange={onCambiarFormulario}
      />

      <label className="checkbox-line">
        <input
          type="checkbox"
          name="esFavorita"
          checked={formSeguimiento.esFavorita}
          onChange={onCambiarFormulario}
        />
        Favorita
      </label>

      <button type="submit">Guardar seguimiento</button>
      <button type="button" onClick={onCancelarSeguimiento}>
        Cancelar
      </button>
    </form>
  );
};

export default ViewerTrackingForm;