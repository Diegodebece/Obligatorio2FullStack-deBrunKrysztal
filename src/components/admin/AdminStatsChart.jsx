import { useSelector } from "react-redux";
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

const AdminStatsChart = () => {
  const seguimientos = useSelector(
    (state) => state.estadisticas.seguimientos
  );

  const pendientes = seguimientos.filter(
    (seguimiento) => seguimiento.estado === "pendiente"
  ).length;

  const viendo = seguimientos.filter(
    (seguimiento) => seguimiento.estado === "viendo"
  ).length;

  const terminadas = seguimientos.filter(
    (seguimiento) => seguimiento.estado === "terminada"
  ).length;

  const favoritas = seguimientos.filter(
    (seguimiento) => seguimiento.esFavorita
  ).length;

  const data = {
    labels: ["Pendiente", "Viendo", "Terminada", "Favoritas"],
    datasets: [
      {
        label: "Cantidad de seguimientos",
        data: [pendientes, viendo, terminadas, favoritas],
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

  const options = {
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
    <div className="grafico">
      <Bar data={data} options={options} />
    </div>
  );
};

export default AdminStatsChart;