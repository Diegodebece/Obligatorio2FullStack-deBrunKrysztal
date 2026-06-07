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
        <input type="text" placeholder="Buscar por título" />

        <select>
          <option>Categoría</option>
        </select>

        <input type="text" placeholder="Plataforma" />

        <button type="button">Filtrar</button>
      </div>

      <div className="tarjetas">
        {series.length === 0 && <p>No hay series disponibles.</p>}

        {series.map((serie) => (
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