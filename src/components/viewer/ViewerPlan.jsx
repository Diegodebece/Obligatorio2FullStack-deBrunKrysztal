import { jwtDecode } from "jwt-decode";

const ViewerPlan = () => {
  const token = localStorage.getItem("token");
  const usuario = token ? jwtDecode(token) : null;
  const planActual = usuario?.plan || "plus";

  return (
    <section className="panel" id="viewer-plan">
      <h2>Mi plan</h2>

      <p>
        Tu plan actual: <strong>{planActual}</strong>
      </p>

      <table>
        <thead>
          <tr>
            <th>Beneficio</th>
            <th>Plus</th>
            <th>Premium</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Seguimientos activos</td>
            <td>4</td>
            <td>Ilimitados</td>
          </tr>

          <tr>
            <td>Estadísticas personales</td>
            <td>Sí</td>
            <td>Sí</td>
          </tr>

          <tr>
            <td>Recomendaciones IA</td>
            <td>Limitadas</td>
            <td>Ilimitadas</td>
          </tr>

          <tr>
            <td>Series favoritas</td>
            <td>Sí</td>
            <td>Sí</td>
          </tr>

          <tr>
            <td>Soporte prioritario</td>
            <td>No</td>
            <td>Sí</td>
          </tr>
        </tbody>
      </table>

      {planActual !== "premium" && (
        <button type="button">
          Cambiar a Premium
        </button>
      )}
    </section>
  );
};

export default ViewerPlan;