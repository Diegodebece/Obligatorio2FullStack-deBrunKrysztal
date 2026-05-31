import React from 'react'
import ViewerAside from '../components/viewer/ViewerAside'
import ViewerSummary from '../components/viewer/ViewerSummary'
import ViewerTracking from '../components/viewer/ViewerTracking'
import ViewerAI from '../components/viewer/ViewerAI'
import ViewerCatalog from '../components/viewer/ViewerCatalog'
import ViewerStats from '../components/viewer/ViewerStats'
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
                const [seriesRes, categoriasRes, seguimientosRes] = await Promise.all([
                    api.get("/series", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    api.get("/categorias", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    api.get("/seguimientos", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                dispatch(listarSeries(seriesRes.data.data));
                dispatch(listarCategorias(categoriasRes.data.data));
                dispatch(listarSeguimientos(seguimientosRes.data.data));
            } catch (error) {
                toast.error(error.response?.data?.message || "Error al cargar los datos del viewer");
            }
        };

        cargarDatosViewer();
    }, [dispatch]);

    return (
        <main className="layout">
            <ViewerAside />
            <section className="content">
                <ViewerSummary />
                <ViewerCatalog />
                <ViewerTracking />
                <ViewerStats />
                <ViewerAI />


            </section>
        </main>


    )
}

export default ViewerPage