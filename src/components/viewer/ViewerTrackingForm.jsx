import { useEffect } from "react";
import { useForm } from "react-hook-form";

const ViewerTrackingForm = ({
  seguimientoEditando,
  onGuardarSeguimiento,
  onCancelarEdicion,
}) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset({
      estado: seguimientoEditando.estado,
      esFavorita: seguimientoEditando.esFavorita ?? false,
      ratingPersonal: seguimientoEditando.ratingPersonal ?? "",
      temporadaActual: seguimientoEditando.temporadaActual ?? "",
      episodioActual: seguimientoEditando.episodioActual ?? "",
      fechaInicio: seguimientoEditando.fechaInicio
        ? seguimientoEditando.fechaInicio.substring(0, 10)
        : "",
    });
  }, [seguimientoEditando, reset]);

  const procesarForm = (data) => {
    onGuardarSeguimiento(data);
  };

  return (
    <form className="form seguimiento-form" onSubmit={handleSubmit(procesarForm)}>
      <h3>
        Editar seguimiento:{" "}
        {seguimientoEditando.serie?.titulo || "Serie sin título"}
      </h3>

      <label htmlFor="estado">Estado</label>
      <select id="estado" {...register("estado")}>
        <option value="pendiente">Pendiente</option>
        <option value="viendo">Viendo</option>
        <option value="terminada">Terminada</option>
      </select>

      <label htmlFor="temporadaActual">Temporada actual</label>
      <input
        id="temporadaActual"
        type="number"
        min="0"
        placeholder="Temporada actual"
        {...register("temporadaActual", { valueAsNumber: true })}
      />

      <label htmlFor="episodioActual">Episodio actual</label>
      <input
        id="episodioActual"
        type="number"
        min="0"
        placeholder="Episodio actual"
        {...register("episodioActual", { valueAsNumber: true })}
      />

      <label htmlFor="ratingPersonal">Rating personal</label>
      <input
        id="ratingPersonal"
        type="number"
        min="1"
        max="10"
        placeholder="Rating personal"
        {...register("ratingPersonal", { valueAsNumber: true })}
      />

      <label htmlFor="fechaInicio">Fecha de inicio</label>
      <input id="fechaInicio" type="date" {...register("fechaInicio")} />

      <label className="checkbox-line">
        <input type="checkbox" {...register("esFavorita")} />
        Favorita
      </label>

      <button type="submit">Guardar seguimiento</button>

      <button type="button" onClick={onCancelarEdicion}>
        Cancelar
      </button>
    </form>
  );
};

export default ViewerTrackingForm;