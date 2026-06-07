import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api";
import {
  modificarSeguimiento,
  eliminarSeguimiento,
} from "../../features/seguimientos/seguimientos.slice";

import ViewerTrackingForm from "./ViewerTrackingForm";
import ViewerRatingModal from "./ViewerRatingModal";

const ViewerTracking = () => {
  const dispatch = useDispatch();

  const seguimientos = useSelector((state) => state.seguimientos.seguimientos);

  const [seguimientoEditando, setSeguimientoEditando] = useState(null);
  const [filtroSeguimiento, setFiltroSeguimiento] = useState("todos");
  const [seguimientoParaFinalizar, setSeguimientoParaFinalizar] = useState(null);
  const [ratingFinal, setRatingFinal] = useState(5);

  const obtenerTextoBotonAvance = (seguimiento) => {
    const serie = seguimiento.serie;

    if (seguimiento.estado === "terminada") {
      return "Completada";
    }

    if (
      seguimiento.estado === "pendiente" ||
      !seguimiento.temporadaActual ||
      !seguimiento.episodioActual
    ) {
      return "Comencé a verla";
    }

    const esUltimoEpisodio =
      seguimiento.episodioActual >= serie.episodiosPorTemporada;

    const esUltimaTemporada =
      seguimiento.temporadaActual >= serie.cantidadTemporadas;

    if (esUltimoEpisodio && esUltimaTemporada) {
      return "Terminé la serie";
    }

    if (esUltimoEpisodio) {
      return "Siguiente temporada";
    }

    return "+1 episodio";
  };

  const avanzarSeguimiento = async (seguimiento) => {
    try {
      const token = localStorage.getItem("token");
      const serie = seguimiento.serie;

      let nuevoEstado = seguimiento.estado;
      let nuevaTemporada = seguimiento.temporadaActual;
      let nuevoEpisodio = seguimiento.episodioActual;
      let nuevaFechaInicio = seguimiento.fechaInicio;
      let nuevaFechaFin = seguimiento.fechaFin;

      if (
        seguimiento.estado === "pendiente" ||
        !seguimiento.temporadaActual ||
        !seguimiento.episodioActual
      ) {
        nuevoEstado = "viendo";
        nuevaTemporada = 1;
        nuevoEpisodio = 1;
        nuevaFechaInicio = seguimiento.fechaInicio || new Date().toISOString();
        nuevaFechaFin = null;
      } else {
        const esUltimoEpisodio =
          seguimiento.episodioActual >= serie.episodiosPorTemporada;

        const esUltimaTemporada =
          seguimiento.temporadaActual >= serie.cantidadTemporadas;

        if (esUltimoEpisodio && esUltimaTemporada) {
          setSeguimientoParaFinalizar(seguimiento);
          setRatingFinal(seguimiento.ratingPersonal || 5);
          return;
        }

        if (esUltimoEpisodio) {
          nuevoEstado = "viendo";
          nuevaTemporada = seguimiento.temporadaActual + 1;
          nuevoEpisodio = 1;
        } else {
          nuevoEstado = "viendo";
          nuevaTemporada = seguimiento.temporadaActual;
          nuevoEpisodio = seguimiento.episodioActual + 1;
        }
      }

      const datosSeguimiento = {
        serie: serie._id || serie,
        estado: nuevoEstado,
        esFavorita: seguimiento.esFavorita,
        ratingPersonal: seguimiento.ratingPersonal,
        temporadaActual: nuevaTemporada,
        episodioActual: nuevoEpisodio,
        fechaInicio: nuevaFechaInicio,
        fechaFin: nuevaFechaFin,
      };

      const response = await api.patch(
        `/seguimientos/${seguimiento._id}`,
        datosSeguimiento,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        modificarSeguimiento({
          ...response.data,
          serie: seguimiento.serie,
        })
      );

      toast.success("Progreso actualizado");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al actualizar progreso"
      );
    }
  };

  const finalizarSerieConRating = async () => {
    try {
      const token = localStorage.getItem("token");
      const seguimiento = seguimientoParaFinalizar;
      const serie = seguimiento.serie;

      const datosSeguimiento = {
        serie: serie._id || serie,
        estado: "terminada",
        esFavorita: seguimiento.esFavorita,
        ratingPersonal: Number(ratingFinal),
        temporadaActual: serie.cantidadTemporadas,
        episodioActual: serie.episodiosPorTemporada,
        fechaInicio: seguimiento.fechaInicio || new Date().toISOString(),
        fechaFin: seguimiento.fechaFin || new Date().toISOString(),
      };

      const response = await api.patch(
        `/seguimientos/${seguimiento._id}`,
        datosSeguimiento,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        modificarSeguimiento({
          ...response.data,
          serie: seguimiento.serie,
        })
      );

      toast.success("Serie marcada como terminada");
      setSeguimientoParaFinalizar(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al finalizar serie");
    }
  };

  const guardarEdicionSeguimiento = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const datosSeguimiento = {
        serie: seguimientoEditando.serie?._id || seguimientoEditando.serie,
        estado: data.estado,
        esFavorita: data.esFavorita,
        ratingPersonal: null,
        temporadaActual: null,
        episodioActual: null,
        fechaInicio: null,
        fechaFin: null,
      };

      if (data.estado === "viendo") {
        datosSeguimiento.temporadaActual =
          data.temporadaActual === "" ? null : Number(data.temporadaActual);

        datosSeguimiento.episodioActual =
          data.episodioActual === "" ? null : Number(data.episodioActual);

        datosSeguimiento.fechaInicio = data.fechaInicio || null;
      }

      if (data.estado === "terminada") {
        datosSeguimiento.temporadaActual =
          data.temporadaActual === "" ? null : Number(data.temporadaActual);

        datosSeguimiento.episodioActual =
          data.episodioActual === "" ? null : Number(data.episodioActual);

        datosSeguimiento.fechaInicio = data.fechaInicio || null;
        datosSeguimiento.fechaFin = data.fechaFin || null;

        datosSeguimiento.ratingPersonal = Number.isNaN(data.ratingPersonal)
          ? null
          : data.ratingPersonal;
      }

      const response = await api.patch(
        `/seguimientos/${seguimientoEditando._id}`,
        datosSeguimiento,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        modificarSeguimiento({
          ...response.data,
          serie: seguimientoEditando.serie,
        })
      );

      toast.success("Seguimiento modificado correctamente");
      setSeguimientoEditando(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al modificar seguimiento"
      );
    }
  };

  const borrarSeguimiento = async (id) => {
    const confirma = confirm("¿Seguro que querés eliminar este seguimiento?");

    if (!confirma) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/seguimientos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(eliminarSeguimiento(id));
      toast.success("Seguimiento eliminado correctamente");

      if (seguimientoEditando?._id === id) {
        setSeguimientoEditando(null);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al eliminar seguimiento"
      );
    }
  };

  const obtenerTituloSeguimiento = (seguimiento) => {
    return seguimiento.serie?.titulo || "Serie sin título";
  };

  const seguimientosFiltrados = seguimientos
    .filter((seguimiento) => {
      if (filtroSeguimiento === "todos") {
        return true;
      }

      if (filtroSeguimiento === "favoritas") {
        return seguimiento.esFavorita;
      }

      return seguimiento.estado === filtroSeguimiento;
    })
    .sort((seguimientoA, seguimientoB) =>
      obtenerTituloSeguimiento(seguimientoA).localeCompare(
        obtenerTituloSeguimiento(seguimientoB)
      )
    );


  return (
    <section className="panel" id="viewer-seguimientos">
      <h2>Mis seguimientos</h2>

      {seguimientoEditando && (
        <ViewerTrackingForm
          seguimientoEditando={seguimientoEditando}
          onGuardarSeguimiento={guardarEdicionSeguimiento}
          onCancelarEdicion={() => setSeguimientoEditando(null)}
        />
      )}

      <div className="filtros">
        <button type="button" onClick={() => setFiltroSeguimiento("todos")}>
          Todos
        </button>

        <button type="button" onClick={() => setFiltroSeguimiento("pendiente")}>
          Pendientes
        </button>

        <button type="button" onClick={() => setFiltroSeguimiento("viendo")}>
          Viendo
        </button>

        <button type="button" onClick={() => setFiltroSeguimiento("terminada")}>
          Terminadas
        </button>

        <button type="button" onClick={() => setFiltroSeguimiento("favoritas")}>
          Favoritas
        </button>
      </div>

      <p>
        Mostrando {seguimientosFiltrados.length} de {seguimientos.length}{" "}
        seguimientos
      </p>

      <div className="tarjetas">
        {seguimientos.length === 0 && <p>No tenés seguimientos todavía.</p>}

        {seguimientos.length > 0 && seguimientosFiltrados.length === 0 && (
          <p>No hay seguimientos para este filtro.</p>
        )}

        {seguimientosFiltrados.map((seguimiento) => (
          <article className="tarjeta" key={seguimiento._id}>
            <div className="imagen">
              {seguimiento.serie?.imagen ? (
                <img
                  src={seguimiento.serie.imagen}
                  alt={obtenerTituloSeguimiento(seguimiento)}
                />
              ) : (
                "imagenSerie"
              )}
            </div>

            <div>
              <h3>{obtenerTituloSeguimiento(seguimiento)}</h3>

              <p>Estado: {seguimiento.estado}</p>
              <p>Rating: {seguimiento.ratingPersonal || "Sin rating"}</p>

              <p>
                Temporada actual:{" "}
                {seguimiento.temporadaActual || "Sin indicar"}
              </p>

              <p>
                Episodio actual:{" "}
                {seguimiento.episodioActual || "Sin indicar"}
              </p>

              <button
                type="button"
                disabled={seguimiento.estado === "terminada"}
                onClick={() => avanzarSeguimiento(seguimiento)}
              >
                {obtenerTextoBotonAvance(seguimiento)}
              </button>

              <p>
                Fecha inicio:{" "}
                {seguimiento.fechaInicio
                  ? seguimiento.fechaInicio.substring(0, 10)
                  : "Sin indicar"}
              </p>

              <p>
                Fecha fin:{" "}
                {seguimiento.fechaFin
                  ? seguimiento.fechaFin.substring(0, 10)
                  : "Sin indicar"}
              </p>

              <p>{seguimiento.esFavorita ? "Favorita" : "No favorita"}</p>

              <button
                type="button"
                onClick={() => setSeguimientoEditando(seguimiento)}
              >
                Editar
              </button>

              <button
                type="button"
                className="danger"
                onClick={() => borrarSeguimiento(seguimiento._id)}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      <ViewerRatingModal
        seguimiento={seguimientoParaFinalizar}
        rating={ratingFinal}
        onCambiarRating={setRatingFinal}
        onConfirmar={finalizarSerieConRating}
        onCancelar={() => setSeguimientoParaFinalizar(null)}
      />
    </section>
  );
};

export default ViewerTracking;