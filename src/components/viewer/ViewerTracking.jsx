import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api";
import {
  modificarSeguimiento,
  eliminarSeguimiento,
} from "../../features/seguimientos/seguimientos.slice";

import ViewerTrackingCard from "./ViewerTrackingCard";
import ViewerTrackingList from "./ViewerTrackingList";
import ViewerRatingModal from "./ViewerRatingModal";
import ViewerTrackingEditModal from "./ViewerTrackingEditModal";
import ViewerTrackingFilters from "./ViewerTrackingFilters";
import { obtenerTextoBotonAvance, filtrarYOrdenarSeguimientos } from "./ViewerTrackingHelpers";


const ViewerTracking = () => {
  const dispatch = useDispatch();

  const seguimientos = useSelector((state) => state.seguimientos.seguimientos);

  const [seguimientoEditando, setSeguimientoEditando] = useState(null);
  const [filtroSeguimiento, setFiltroSeguimiento] = useState("todos");
  const [seguimientoParaFinalizar, setSeguimientoParaFinalizar] = useState(null);
  const [ratingFinal, setRatingFinal] = useState(5);



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

  const seguimientosFiltrados = filtrarYOrdenarSeguimientos(seguimientos, filtroSeguimiento);

  return (
    <section className="panel" id="viewer-seguimientos">
      <h2>Mis seguimientos</h2>

      <ViewerTrackingFilters
        filtroSeguimiento={filtroSeguimiento}
        onCambiarFiltro={setFiltroSeguimiento}
      />

      <p>
        Mostrando {seguimientosFiltrados.length} de {seguimientos.length}{" "}
        seguimientos
      </p>

      <ViewerTrackingList
        seguimientos={seguimientos}
        seguimientosFiltrados={seguimientosFiltrados}
        onAvanzar={avanzarSeguimiento}
        onEditar={setSeguimientoEditando}
        onEliminar={borrarSeguimiento}
        obtenerTextoBotonAvance={obtenerTextoBotonAvance}
      />

      <ViewerTrackingEditModal
        seguimientoEditando={seguimientoEditando}
        onGuardarSeguimiento={guardarEdicionSeguimiento}
        onCancelarEdicion={() => setSeguimientoEditando(null)}
      />

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