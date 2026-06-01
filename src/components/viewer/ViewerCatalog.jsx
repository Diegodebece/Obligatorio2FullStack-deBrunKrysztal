import ViewerSerieCard from "./ViewerSerieCard";
import { useSelector } from "react-redux";

const ViewerCatalog = () => {
  const series = useSelector((state) => state.series.series);
  const categorias = useSelector((state) => state.categorias.categorias);

  const obtenerNombreCategoria = (categoriaSerie) => {
    const idCategoria = categoriaSerie?._id || categoriaSerie;

    const categoriaEncontrada = categorias.find(
      (categoria) => categoria._id === idCategoria
    );

    return categoriaEncontrada?.nombre || "Sin categoría";
  };

  const onAgregarSeguimiento = (serie) => {
    console.log("Agregar a seguimiento", serie);
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