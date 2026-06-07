import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api";
import { crearSeguimiento } from "../../features/seguimientos/seguimientos.slice";
import ViewerSerieCard from "./ViewerSerieCard";

const ViewerCatalog = () => {
  const dispatch = useDispatch();

  const series = useSelector((state) => state.series.series);
  const categorias = useSelector((state) => state.categorias.categorias);
  const seguimientos = useSelector((state) => state.seguimientos.seguimientos);

  const [tituloBuscado, setTituloBuscado] = useState("");
  const [categoriaBuscada, setCategoriaBuscada] = useState("");
  const [plataformaBuscada, setPlataformaBuscada] = useState("");

  const [filtros, setFiltros] = useState({
    titulo: "",
    categoria: "",
    plataforma: "",
  });

  const serieYaEstaEnSeguimientos = (serieId) => {
    return seguimientos.some((seguimiento) => {
      const idSerie = seguimiento.serie?._id || seguimiento.serie;
      return String(idSerie) === String(serieId);
    });
  };

  const obtenerNombreCategoria = (categoriaSerie) => {
    const idCategoria = categoriaSerie?._id || categoriaSerie;

    const categoriaEncontrada = categorias.find(
      (categoria) => String(categoria._id) === String(idCategoria)
    );

    return categoriaEncontrada?.nombre || "Sin categoría";
  };

  const filtrarSeries = () => {
    setFiltros({
      titulo: tituloBuscado,
      categoria: categoriaBuscada,
      plataforma: plataformaBuscada,
    });
  };

  const limpiarFiltros = () => {
    setTituloBuscado("");
    setCategoriaBuscada("");
    setPlataformaBuscada("");

    setFiltros({
      titulo: "",
      categoria: "",
      plataforma: "",
    });
  };

  const seriesFiltradas = series.filter((serie) => {
    const coincideTitulo =
      filtros.titulo === "" ||
      serie.titulo.toLowerCase().includes(filtros.titulo.toLowerCase());

    const coincideCategoria =
      filtros.categoria === "" ||
      String(serie.categoria?._id || serie.categoria) ===
        String(filtros.categoria);

    const coincidePlataforma =
      filtros.plataforma === "" ||
      serie.plataforma
        .toLowerCase()
        .includes(filtros.plataforma.toLowerCase());

    return coincideTitulo && coincideCategoria && coincidePlataforma;
  });

  const agregarSeguimiento = async (serie) => {
    if (serieYaEstaEnSeguimientos(serie._id)) {
      toast.info("Esta serie ya está en tus seguimientos");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const nuevoSeguimiento = {
        serie: serie._id,
        estado: "pendiente",
        esFavorita: false,
        ratingPersonal: null,
        temporadaActual: null,
        episodioActual: null,
        fechaInicio: null,
        fechaFin: null,
      };

      const response = await api.post("/seguimientos", nuevoSeguimiento, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        crearSeguimiento({
          ...response.data,
          serie: serie,
        })
      );

      toast.success("Serie agregada a seguimiento");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al agregar seguimiento"
      );
    }
  };

  return (
    <section className="panel" id="catalogo">
      <h2>Catálogo de series</h2>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por título"
          value={tituloBuscado}
          onChange={(event) => setTituloBuscado(event.target.value)}
        />

        <select
          value={categoriaBuscada}
          onChange={(event) => setCategoriaBuscada(event.target.value)}
        >
          <option value="">Todas las categorías</option>

          {categorias.map((categoria) => (
            <option key={categoria._id} value={categoria._id}>
              {categoria.nombre}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Plataforma"
          value={plataformaBuscada}
          onChange={(event) => setPlataformaBuscada(event.target.value)}
        />

        <button type="button" onClick={filtrarSeries}>
          Filtrar
        </button>

        <button type="button" onClick={limpiarFiltros}>
          Limpiar
        </button>
      </div>

      <div className="tarjetas">
        {seriesFiltradas.length === 0 && (
          <p>No hay series que coincidan con la búsqueda.</p>
        )}

        {seriesFiltradas.map((serie) => (
          <ViewerSerieCard
            key={serie._id}
            serie={serie}
            nombreCategoria={obtenerNombreCategoria(serie.categoria)}
            onAgregarSeguimiento={agregarSeguimiento}
            estaEnSeguimientos={serieYaEstaEnSeguimientos(serie._id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ViewerCatalog;