import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api";
import {
  modificarSeguimiento,
  eliminarSeguimiento,
} from "../../features/seguimientos/seguimientos.slice";

import ViewerTrackingForm from "./ViewerTrackingForm";

const ViewerTracking = () => {
  const dispatch = useDispatch();

  const seguimientos = useSelector((state) => state.seguimientos.seguimientos);

  const [seguimientoEditando, setSeguimientoEditando] = useState(null);
  const [filtroSeguimiento, setFiltroSeguimiento] = useState("todos");

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
    </section>
  );
};

export default ViewerTracking;