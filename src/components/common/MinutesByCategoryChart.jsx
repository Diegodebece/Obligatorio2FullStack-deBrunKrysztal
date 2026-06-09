import { Bar } from "react-chartjs-2";

const MinutesByCategoryChart = ({ titulo, datos }) => {
  const chartData = {
    labels: datos.map((item) => item.categoria),
    datasets: [
      {
        label: "Minutos vistos",
        data: datos.map((item) => item.minutos),
        maxBarThickness: 52,
        categoryPercentage: 0.65,
        barPercentage: 0.8,
        backgroundColor: [
          "rgba(255, 122, 24, 0.75)",
          "rgba(56, 189, 248, 0.75)",
          "rgba(255, 46, 0, 0.75)",
          "rgba(159, 179, 200, 0.75)",
          "rgba(255, 184, 107, 0.75)",
        ],
        borderColor: [
          "#ff7a18",
          "#38bdf8",
          "#ff2e00",
          "#9fb3c8",
          "#ffb86b",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
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
          color: "rgba(159, 179, 200, 0.12)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#d7e2ea",
        },
        grid: {
          color: "rgba(159, 179, 200, 0.12)",
        },
      },
    },
  };

  if (!datos || datos.length === 0) {
    return (
      <article className="grafico">
        <h3>{titulo}</h3>
        <p>No hay datos suficientes para mostrar esta estadística.</p>
      </article>
    );
  }

  return (
    <article className="grafico">
      <h3>{titulo}</h3>

      <div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </article>
  );
};

export default MinutesByCategoryChart;
