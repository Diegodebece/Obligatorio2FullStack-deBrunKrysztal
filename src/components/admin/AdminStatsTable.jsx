import { useSelector } from "react-redux";

const AdminStatsTable = () => {
  const seguimientos = useSelector(
    (state) => state.estadisticas.seguimientos
  );

  const series = useSelector((state) => state.series.series);

  const obtenerTituloSerie = (serieSeguimiento) => {
    if (!serieSeguimiento) {
      return "Serie sin datos";
    }

    if (serieSeguimiento.titulo) {
      return serieSeguimiento.titulo;
    }

    const idSerie =
      serieSeguimiento._id ? serieSeguimiento._id : serieSeguimiento;

    const serieEncontrada = series.find(
      (serie) => String(serie._id) === String(idSerie)
    );

    return serieEncontrada ? serieEncontrada.titulo : "Serie sin datos";
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Serie</th>
          <th>Estado</th>
          <th>Favorita</th>
          <th>Rating</th>
        </tr>
      </thead>

      <tbody>
        {seguimientos.map((seguimiento) => (
          <tr key={seguimiento._id}>
            <td>{obtenerTituloSerie(seguimiento.serie)}</td>
            <td>{seguimiento.estado}</td>
            <td>{seguimiento.esFavorita ? "Sí" : "No"}</td>
            <td>{seguimiento.ratingPersonal || "Sin rating"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminStatsTable;