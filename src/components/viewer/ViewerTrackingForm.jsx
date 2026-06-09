import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CalendarInput from "../common/CalendarInput";

const ViewerTrackingForm = ({
  seguimientoEditando,
  onGuardarSeguimiento,
  onCancelarEdicion,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [estadoSeleccionado, setEstadoSeleccionado] = useState(
    seguimientoEditando.estado
  );

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const serie = seguimientoEditando.serie;

  useEffect(() => {
    reset({
      estado: seguimientoEditando.estado,
      esFavorita: seguimientoEditando.esFavorita ?? false,
      ratingPersonal: seguimientoEditando.ratingPersonal ?? "",
      temporadaActual: seguimientoEditando.temporadaActual ?? "",
      episodioActual: seguimientoEditando.episodioActual ?? "",
    });

    setFechaInicio(
      seguimientoEditando.fechaInicio
        ? seguimientoEditando.fechaInicio.substring(0, 10)
        : ""
    );

    setFechaFin(
      seguimientoEditando.fechaFin
        ? seguimientoEditando.fechaFin.substring(0, 10)
        : ""
    );

    setEstadoSeleccionado(seguimientoEditando.estado);
  }, [seguimientoEditando, reset]);

  const procesarForm = async (data) => {
    await onGuardarSeguimiento({
      ...data,
      fechaInicio,
      fechaFin,
    });
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

  const estadoRegister = register("estado");

  return (
    <form className="form seguimiento-form" onSubmit={handleSubmit(procesarForm)}>
      <h3>Editar seguimiento: {serie?.titulo || "Serie sin título"}</h3>

      <label htmlFor="estado">Estado</label>
      <select
        id="estado"
        {...estadoRegister}
        onChange={(event) => {
          estadoRegister.onChange(event);
          cambiarEstado(event);
        }}
      >
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

          <CalendarInput
            id="fechaInicio"
            label="Fecha de inicio"
            value={fechaInicio}
            onChange={setFechaInicio}
            mostrarCalendario={false}
          />
        </>
      )}

      {estadoSeleccionado === "terminada" && (
        <>
          <CalendarInput
            id="fechaFin"
            label="Fecha de fin"
            value={fechaFin}
            onChange={setFechaFin}
            mostrarCalendario={false}
          />

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

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Guardando...
          </>
        ) : (
          "Guardar seguimiento"
        )}
      </button>

      <button type="button" onClick={onCancelarEdicion}>
        Cancelar
      </button>
    </form>
  );
};

export default ViewerTrackingForm;