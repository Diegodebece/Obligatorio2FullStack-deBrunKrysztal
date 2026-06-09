import { useSelector } from "react-redux";

const AdminStatsTable = () => {
  const seguimientos = useSelector(
    (state) => state.estadisticas.seguimientos
  );

  const series = useSelector((state) => state.series.series);

  const obtenerIdSerie = (serieSeguimiento) => {
    if (!serieSeguimiento) {
      return null;
    }

    return serieSeguimiento._id ? serieSeguimiento._id : serieSeguimiento;
  };

  const obtenerTituloSerie = (serieSeguimiento) => {
    if (!serieSeguimiento) {
      return "Serie sin datos";
    }

    if (serieSeguimiento.titulo) {
      return serieSeguimiento.titulo;
    }

    const idSerie = obtenerIdSerie(serieSeguimiento);

    const serieEncontrada = series.find(
      (serie) => String(serie._id) === String(idSerie)
    );

    return serieEncontrada ? serieEncontrada.titulo : "Serie sin datos";
  };

  const resumenPorSerie = {};

  for (let seguimiento of seguimientos) {
    const idSerie = obtenerIdSerie(seguimiento.serie);

    if (!idSerie) {
      continue;
    }

    if (!resumenPorSerie[idSerie]) {
      resumenPorSerie[idSerie] = {
        id: idSerie,
        titulo: obtenerTituloSerie(seguimiento.serie),
        totalSeguimientos: 0,
        totalFavoritos: 0,
        totalTerminadas: 0,
      };
    }

    resumenPorSerie[idSerie].totalSeguimientos++;

    if (seguimiento.esFavorita) {
      resumenPorSerie[idSerie].totalFavoritos++;
    }

    if (seguimiento.estado === "terminada") {
      resumenPorSerie[idSerie].totalTerminadas++;
    }
  }

  const seriesResumen = Object.values(resumenPorSerie);

  const obtenerTextoTerminadas = (serie) => {
    if (serie.totalSeguimientos === 0) {
      return "0 (0%)";
    }

    const porcentaje = Math.round(
      (serie.totalTerminadas / serie.totalSeguimientos) * 100
    );

    return `${serie.totalTerminadas} (${porcentaje}%)`;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Serie</th>
          <th>Total seguimientos</th>
          <th>Favoritos</th>
          <th>Usuarios que la terminaron</th>
        </tr>
      </thead>

      <tbody>
        {seriesResumen.map((serie) => (
          <tr key={serie.id}>
            <td>{serie.titulo}</td>
            <td>{serie.totalSeguimientos}</td>
            <td>{serie.totalFavoritos}</td>
            <td>{obtenerTextoTerminadas(serie)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminStatsTable;