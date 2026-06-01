import { useSelector } from "react-redux";

const AdminStatsCards = () => {
  const seguimientos = useSelector(
    (state) => state.estadisticas.seguimientos
  );

  const totalSeguimientos = seguimientos.length;

  const totalFavoritas = seguimientos.filter(
    (seguimiento) => seguimiento.esFavorita
  ).length;

  const totalViendo = seguimientos.filter(
    (seguimiento) => seguimiento.estado === "viendo"
  ).length;

  let sumaRatings = 0;
  let cantidadRatings = 0;

  for (let seguimiento of seguimientos) {
    if (seguimiento.ratingPersonal !== null) {
      sumaRatings += seguimiento.ratingPersonal;
      cantidadRatings++;
    }
  }

  let ratingPromedio = 0;

  if (cantidadRatings > 0) {
    ratingPromedio = (sumaRatings / cantidadRatings).toFixed(1);
  }

  return (
    <div className="cards-resumen">
      <article className="resumen-card">
        <h3>Total seguimientos</h3>
        <p>{totalSeguimientos}</p>
      </article>

      <article className="resumen-card">
        <h3>Favoritas</h3>
        <p>{totalFavoritas}</p>
      </article>

      <article className="resumen-card">
        <h3>Viendo</h3>
        <p>{totalViendo}</p>
      </article>

      <article className="resumen-card">
        <h3>Rating promedio</h3>
        <p>{ratingPromedio}</p>
      </article>
    </div>
  );
};

export default AdminStatsCards;