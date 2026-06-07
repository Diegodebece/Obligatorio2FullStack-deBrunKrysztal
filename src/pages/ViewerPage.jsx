import { Outlet } from "react-router";
import ViewerAside from "../components/viewer/ViewerAside";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import api from "../api/api";
import { listarSeries } from "../features/series/series.slice";
import { listarCategorias } from "../features/categorias/categorias.slice";
import { listarSeguimientos } from "../features/seguimientos/seguimientos.slice";

const ViewerPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cargarDatosViewer = async () => {
      try {
        const token = localStorage.getItem("token");

        const [seriesRes, categoriasRes] = await Promise.all([
          api.get("/series", {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: 1, limit: 50 },
          }),
          api.get("/categorias", {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: 1, limit: 50 },
          }),
        ]);

        dispatch(listarSeries(seriesRes.data.data));
        dispatch(listarCategorias(categoriasRes.data.data));

        try {
          const seguimientosRes = await api.get("/seguimientos/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          dispatch(listarSeguimientos(seguimientosRes.data.data));
        } catch (error) {
          if (error.response?.status === 404) {
            dispatch(listarSeguimientos([]));
          } else {
            throw error;
          }
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error al cargar los datos del viewer"
        );
      }
    };

    cargarDatosViewer();
  }, [dispatch]);

  return (
    <main className="layout">
      <ViewerAside />

      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default ViewerPage;