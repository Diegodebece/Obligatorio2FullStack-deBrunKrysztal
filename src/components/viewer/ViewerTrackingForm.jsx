import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ViewerTrackingForm = ({
  seguimientoEditando,
  onGuardarSeguimiento,
  onCancelarEdicion,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [estadoSeleccionado, setEstadoSeleccionado] = useState(
    seguimientoEditando.estado
  );

  const serie = seguimientoEditando.serie;

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
      fechaFin: seguimientoEditando.fechaFin
        ? seguimientoEditando.fechaFin.substring(0, 10)
        : "",
    });

    setEstadoSeleccionado(seguimientoEditando.estado);
  }, [seguimientoEditando, reset]);

  const procesarForm = (data) => {
    onGuardarSeguimiento(data);
  };

  const cambiarEstado = (event) => {
    setEstadoSeleccionado(event.target.value);
  };

  const temporadas = [];

  for (let i = 1; i <= serie.cantidadTemporadas; i++) {
    temporadas.push(i);
  }

  const episodios = [];

  for (let i = 1; i <= serie.episodiosPorTemporada; i++) {
    episodios.push(i);
  }

  return (
    <form className="form seguimiento-form" onSubmit={handleSubmit(procesarForm)}>
      <h3>Editar seguimiento: {serie?.titulo || "Serie sin título"}</h3>

      <label htmlFor="estado">Estado</label>
      <select id="estado" {...register("estado")} onChange={cambiarEstado}>
        <option value="pendiente">Pendiente</option>
        <option value="viendo">Viendo</option>
        <option value="terminada">Terminada</option>
      </select>

      {estadoSeleccionado !== "pendiente" && (
        <>
          <label htmlFor="temporadaActual">Temporada actual</label>
          <select id="temporadaActual" {...register("temporadaActual")}>
            <option value="">Sin indicar</option>

            {temporadas.map((temporada) => (
              <option key={temporada} value={temporada}>
                Temporada {temporada}
              </option>
            ))}
          </select>

          <label htmlFor="episodioActual">Episodio actual</label>
          <select id="episodioActual" {...register("episodioActual")}>
            <option value="">Sin indicar</option>

            {episodios.map((episodio) => (
              <option key={episodio} value={episodio}>
                Episodio {episodio}
              </option>
            ))}
          </select>

          <label htmlFor="fechaInicio">Fecha de inicio</label>
          <input id="fechaInicio" type="date" {...register("fechaInicio")} />
        </>
      )}

      {estadoSeleccionado === "terminada" && (
        <>
          <label htmlFor="fechaFin">Fecha de fin</label>
          <input id="fechaFin" type="date" {...register("fechaFin")} />

          <label htmlFor="ratingPersonal">Rating personal</label>
          <input
            id="ratingPersonal"
            type="number"
            min="1"
            max="10"
            placeholder="Rating personal"
            {...register("ratingPersonal", {
              valueAsNumber: true,
              min: {
                value: 1,
                message: "El rating mínimo es 1",
              },
              max: {
                value: 10,
                message: "El rating máximo es 10",
              },
            })}
          />

          {errors.ratingPersonal && (
            <span className="error">{errors.ratingPersonal.message}</span>
          )}
        </>
      )}

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