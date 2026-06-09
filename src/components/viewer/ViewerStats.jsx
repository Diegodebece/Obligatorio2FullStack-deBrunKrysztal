import { useSelector } from "react-redux";
import MinutesByCategoryChart from "../common/MinutesByCategoryChart";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ViewerStats = () => {
  const seguimientos = useSelector((state) => state.seguimientos.seguimientos);
  const categorias = useSelector((state) => state.categorias.categorias);

  const totalSeguimientos = seguimientos.length;

  const totalPendientes = seguimientos.filter(
    (seguimiento) => seguimiento.estado === "pendiente"
  ).length;

  const totalViendo = seguimientos.filter(
    (seguimiento) => seguimiento.estado === "viendo"
  ).length;

  const totalTerminadas = seguimientos.filter(
    (seguimiento) => seguimiento.estado === "terminada"
  ).length;

  const totalFavoritas = seguimientos.filter(
    (seguimiento) => seguimiento.esFavorita
  ).length;

  let sumaRatings = 0;
  let cantidadRatings = 0;

  for (let seguimiento of seguimientos) {
    if (
      seguimiento.ratingPersonal !== null &&
      seguimiento.ratingPersonal !== undefined
    ) {
      sumaRatings += seguimiento.ratingPersonal;
      cantidadRatings++;
    }
  }

  let ratingPromedio = 0;

  if (cantidadRatings > 0) {
    ratingPromedio = (sumaRatings / cantidadRatings).toFixed(1);
  }

  const obtenerNombreCategoria = (categoriaSerie) => {
    if (!categoriaSerie) {
      return "Sin categoría";
    }

    if (categoriaSerie.nombre) {
      return categoriaSerie.nombre;
    }

    const categoriaEncontrada = categorias.find(
      (categoria) => categoria._id === categoriaSerie
    );

    return categoriaEncontrada?.nombre || "Sin categoría";
  };

  const calcularEpisodiosVistos = (seguimiento) => {
    const serie = seguimiento.serie;

    if (!serie || seguimiento.estado === "pendiente") {
      return 0;
    }

    const episodiosPorTemporada = serie.episodiosPorTemporada || 0;

    if (seguimiento.estado === "terminada") {
      return serie.cantidadTemporadas * episodiosPorTemporada;
    }

    if (seguimiento.estado === "viendo") {
      const temporadasCompletas = Math.max(
        (seguimiento.temporadaActual || 1) - 1,
        0
      );

      return (
        temporadasCompletas * episodiosPorTemporada +
        (seguimiento.episodioActual || 0)
      );
    }

    return 0;
  };

  const minutosPorCategoria = {};

  for (let seguimiento of seguimientos) {
    const serie = seguimiento.serie;

    if (!serie) {
      continue;
    }

    const categoria = obtenerNombreCategoria(serie.categoria);
    const episodiosVistos = calcularEpisodiosVistos(seguimiento);
    const minutosVistos = episodiosVistos * (serie.minutosPorEpisodio || 0);

    minutosPorCategoria[categoria] =
      (minutosPorCategoria[categoria] || 0) + minutosVistos;
  }

  const categoriasConMinutos = Object.entries(minutosPorCategoria).filter(
    ([, minutos]) => minutos > 0
  );

  const datosMinutosPorCategoria = categoriasConMinutos.map(([categoria, minutos]) => ({
    categoria,
    minutos
  }));

  const dataGrafico = {
    labels: ["Pendientes", "Viendo", "Terminadas", "Favoritas"],
    datasets: [
      {
        label: "Cantidad de seguimientos",
        data: [totalPendientes, totalViendo, totalTerminadas, totalFavoritas],
        backgroundColor: [
          "rgba(255, 122, 24, 0.85)",
          "rgba(255, 184, 107, 0.85)",
          "rgba(255, 46, 0, 0.85)",
          "rgba(255, 59, 48, 0.85)",
        ],
        borderColor: ["#ff7a18", "#ffb86b", "#ff2e00", "#ff3b30"],
        borderWidth: 1,
      },
    ],
  };



  const opcionesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#d7e2ea",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#d7e2ea",
        },
        grid: {
          color: "rgba(159, 179, 200, 0.14)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#d7e2ea",
          precision: 0,
        },
        grid: {
          color: "rgba(159, 179, 200, 0.14)",
        },
      },
    },
  };

  return (
    <section className="panel" id="viewer-estadisticas">
      <h2>Mis estadísticas</h2>

      {seguimientos.length === 0 ? (
        <p>Todavía no tenés seguimientos para generar estadísticas.</p>
      ) : (
        <>
          <div className="cards-resumen">
            <article className="resumen-card">
              <h3>Total seguimientos</h3>
              <p>{totalSeguimientos}</p>
            </article>

            <article className="resumen-card">
              <h3>Pendientes</h3>
              <p>{totalPendientes}</p>
            </article>

            <article className="resumen-card">
              <h3>Viendo</h3>
              <p>{totalViendo}</p>
            </article>

            <article className="resumen-card">
              <h3>Terminadas</h3>
              <p>{totalTerminadas}</p>
            </article>

            <article className="resumen-card">
              <h3>Favoritas</h3>
              <p>{totalFavoritas}</p>
            </article>

            <article className="resumen-card">
              <h3>Rating promedio</h3>
              <p>{ratingPromedio}</p>
            </article>
          </div>

          <div className="grafico">
            <h3>Resumen visual</h3>
            <Bar data={dataGrafico} options={opcionesGrafico} />
          </div>

          <MinutesByCategoryChart
            titulo="Minutos vistos por categoría"
            datos={datosMinutosPorCategoria}
          />

          <h3>Detalle por serie</h3>

          <table>
            <thead>
              <tr>
                <th>Serie</th>
                <th>Estado</th>
                <th>Favorita</th>
                <th>Rating</th>
                <th>Temporada</th>
                <th>Episodio</th>
              </tr>
            </thead>

            <tbody>
              {seguimientos.map((seguimiento) => (
                <tr key={seguimiento._id}>
                  <td>{seguimiento.serie?.titulo || "Serie sin título"}</td>
                  <td>{seguimiento.estado}</td>
                  <td>{seguimiento.esFavorita ? "Sí" : "No"}</td>
                  <td>{seguimiento.ratingPersonal ?? "Sin rating"}</td>
                  <td>{seguimiento.temporadaActual ?? "Sin indicar"}</td>
                  <td>{seguimiento.episodioActual ?? "Sin indicar"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
};

export default ViewerStats;