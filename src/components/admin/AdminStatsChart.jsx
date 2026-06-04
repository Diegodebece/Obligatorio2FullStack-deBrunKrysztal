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
      },
    ],
  };

  return (
    <div className="grafico">
      <Bar data={data} />
    </div>
  );
};

export default AdminStatsChart;