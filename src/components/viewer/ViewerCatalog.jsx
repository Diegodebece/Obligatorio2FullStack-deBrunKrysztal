import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api";
import { crearSeguimiento } from "../../features/seguimientos/seguimientos.slice";
import ViewerSerieCard from "./ViewerSerieCard";

const ViewerCatalog = () => {
  const dispatch = useDispatch();
  const series = useSelector((state) => state.series.series);
  const categorias = useSelector((state) => state.categorias.categorias);

  const obtenerNombreCategoria = (categoriaSerie) => {
    const idCategoria = categoriaSerie?._id || categoriaSerie;

    const categoriaEncontrada = categorias.find(
      (categoria) => categoria._id === idCategoria
    );

    return categoriaEncontrada?.nombre || "Sin categoría";
  };

  const onAgregarSeguimiento = async (serie) => {
    try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/seguimientos",
      {
        serie: serie._id,
        estado: "pendiente",
        esFavorita: false,
        ratingPersonal: null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(
      crearSeguimiento({
        ...response.data,
        serie,
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
        <input type="text" placeholder="buscarPorTitulo" />

        <select>
          <option>categoriaSerie</option>
        </select>

        <input type="text" placeholder="plataformaSerie" />

        <button>Filtrar</button>
      </div>

      <div className="tarjetas">
        {series.length === 0 && <p>No hay series disponibles.</p>}

        {series.map((serie) => (
          <ViewerSerieCard
            key={serie._id}
            serie={serie}
            nombreCategoria={obtenerNombreCategoria(serie.categoria)}
            onAgregarSeguimiento={onAgregarSeguimiento}
          />
        ))}
      </div>

    </section>
  )
}

export default ViewerCatalog