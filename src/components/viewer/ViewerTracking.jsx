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

  const guardarEdicionSeguimiento = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const datosSeguimiento = {
        serie: seguimientoEditando.serie?._id || seguimientoEditando.serie,
        estado: data.estado,
        esFavorita: data.esFavorita,
        ratingPersonal: Number.isNaN(data.ratingPersonal)
          ? null
          : data.ratingPersonal,
        temporadaActual: Number.isNaN(data.temporadaActual)
          ? null
          : data.temporadaActual,
        episodioActual: Number.isNaN(data.episodioActual)
          ? null
          : data.episodioActual,
        fechaInicio: data.fechaInicio || null,
        fechaFin: null,
      };

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
          serie: response.data.serie || seguimientoEditando.serie,
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

      <div className="tarjetas">
        {seguimientos.length === 0 && <p>No tenés seguimientos todavía.</p>}

        {seguimientos.map((seguimiento) => (
          <article className="tarjeta" key={seguimiento._id}>
            <div className="imagen">
              {seguimiento.serie?.imagen ? (
                <img
                  src={seguimiento.serie.imagen}
                  alt={seguimiento.serie.titulo}
                />
              ) : (
                "imagenSerie"
              )}
            </div>

            <div>
              <h3>{seguimiento.serie?.titulo || "Serie sin título"}</h3>

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