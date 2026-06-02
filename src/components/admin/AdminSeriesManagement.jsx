import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api";
import {
  listarSeries,
  crearSerie,
  modificarSerie,
  eliminarSerie,
} from "../../features/series/series.slice";

import AdminSerieCard from "./AdminSerieCard";
import AdminSerieForm from "./AdminSerieForm";

const AdminSeriesManagement = () => {
  const dispatch = useDispatch();
  const [serieEditando, setSerieEditando] = useState(null);
  const formularioRef = useRef(null);

  const cargarSeries = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/series", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(listarSeries(response.data.data));
    } catch (error) {
      toast.error("Error al cargar series");
    }
  };

  useEffect(() => {
    cargarSeries();
  }, []);

  const guardarSerie = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      if (serieEditando) {
        const response = await api.patch(
          `/series/${serieEditando._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(modificarSerie(response.data.data));
        toast.success("Serie modificada correctamente");
        setSerieEditando(null);
      } else {
        const response = await api.post("/series", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(crearSerie(response.data.data));
        toast.success("Serie creada correctamente");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al guardar serie");
    }
  };

  const borrarSerie = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/series/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(eliminarSerie(id));
      toast.success("Serie eliminada correctamente");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al eliminar serie");
    }
  };

  const editarSerie = (serie) => {
    setSerieEditando(serie);

    requestAnimationFrame(() => {
      const posicionFormulario =
        formularioRef.current?.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: posicionFormulario - 190,
        behavior: "smooth",
      });
    });
  };

  return (
    <section className="panel" id="admin-series">
      <h2>CRUD de series</h2>

      <div ref={formularioRef}>
        <AdminSerieForm
          onGuardarSerie={guardarSerie}
          serieEditando={serieEditando}
          onCancelarEdicion={() => setSerieEditando(null)}
        />
      </div>

      <div className="tarjetas">
        <AdminSerieCard
          onEditarSerie={editarSerie}
          onEliminarSerie={borrarSerie}
        />
      </div>
    </section>
  );
};

export default AdminSeriesManagement;
