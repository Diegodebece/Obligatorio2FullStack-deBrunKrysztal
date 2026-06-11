import { Outlet } from "react-router";
import ViewerAside from "../components/viewer/ViewerAside";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import api from "../api/api";
import { listarSeries } from "../features/series/series.slice";
import { listarCategorias } from "../features/categorias/categorias.slice";
import { listarSeguimientos } from "../features/seguimientos/seguimientos.slice";

const esperar = (milisegundos) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milisegundos);
  });
};


const ViewerPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cargarDatosViewer = async () => {
      const token = localStorage.getItem("token");

      try {
        const seriesRes = await api.get("/series", {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: 1, limit: 50 },
        });

        dispatch(listarSeries(seriesRes.data.data));
      } catch (error) {
        try {
          await esperar(3000);

          const seriesRes = await api.get("/series", {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: 1, limit: 50 },
          });

          dispatch(listarSeries(seriesRes.data.data));
        } catch (errorRetry) {
          toast.error(
            errorRetry.response?.data?.message || "Error al cargar series"
          );
        }
      }

      try {
        const categoriasRes = await api.get("/categorias", {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: 1, limit: 50 },
        });

        dispatch(listarCategorias(categoriasRes.data.data));
      } catch (error) {
        try {
          await esperar(3000);

          const categoriasRes = await api.get("/categorias", {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: 1, limit: 50 },
          });

          dispatch(listarCategorias(categoriasRes.data.data));
        } catch (errorRetry) {
          toast.error(
            errorRetry.response?.data?.message || "Error al cargar categorías"
          );
        }
      }

      try {
        const seguimientosRes = await api.get("/seguimientos/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(listarSeguimientos(seguimientosRes.data.data));
      } catch (error) {
        if (error.response?.status === 404) {
          dispatch(listarSeguimientos([]));
          return;
        }

        try {
          await esperar(3000);

          const seguimientosRes = await api.get("/seguimientos/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          dispatch(listarSeguimientos(seguimientosRes.data.data));
        } catch (errorRetry) {
          if (errorRetry.response?.status === 404) {
            dispatch(listarSeguimientos([]));
          } else {
            toast.error(
              errorRetry.response?.data?.message || "Error al cargar seguimientos"
            );
          }
        }
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