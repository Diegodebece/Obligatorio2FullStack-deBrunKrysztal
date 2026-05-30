import { useSelector } from "react-redux";

const AdminSerieCard = ({ onEditarSerie, onEliminarSerie }) => {
  const series = useSelector((state) => state.series.series);
  const categorias = useSelector((state) => state.categorias.categorias);

    const obtenerNombreCategoria = (idCategoria) => {
    const categoriaEncontrada = categorias.find((categoria) => categoria._id === idCategoria);
      return categoriaEncontrada?.nombre || "Sin categoría";
    };

  return (
    <>
      {series.map((serie) => (
        <article className="tarjeta" key={serie._id}>
          <div className="imagen">
            {serie.imagen ? (
              <img src={serie.imagen} alt={serie.titulo} />
            ) : (
              "imagenSerie"
            )}
          </div>

          <div>
            <h3>{serie.titulo}</h3>
            <p>{serie.descripcion}</p>
            <p>{serie.plataforma}</p>
            <p>{obtenerNombreCategoria(serie.categoria)}</p>
            <p>{serie.cantidadTemporadas} temporadas</p>
            <p>{serie.episodiosPorTemporada} episodios por temporada</p>
            <p>{serie.minutosPorEpisodio} minutos por episodio</p>

            <button type="button" onClick={() => onEditarSerie(serie)}>
              Editar
            </button>

            <button
              type="button"
              className="danger"
              onClick={() => onEliminarSerie(serie._id)}
            >
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </>
  );
};

export default AdminSerieCard;