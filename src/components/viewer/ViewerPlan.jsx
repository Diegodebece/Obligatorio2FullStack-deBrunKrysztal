import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import api from "../../api/api";

import { useDispatch, useSelector } from "react-redux";
import { guardarToken } from "../../features/auth/auth.slice";

const ViewerPlan = () => {
  const token = useSelector((state) => state.auth.token);
  const usuario = token ? jwtDecode(token) : null;
  const planActual = usuario?.plan || "Plus";
  const planActualFormateado =
    planActual.charAt(0).toUpperCase() + planActual.slice(1);

  const dispatch = useDispatch();

  const cambiarAPremium = async () => {
    try {
      const response = await api.patch(
        "/usuarios/me/plan",
        { plan: "premium" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(guardarToken(response.data.token));

      toast.success("Plan actualizado a premium");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al cambiar de plan");
    }
  };

  return (
    <section className="panel" id="viewer-plan">
      <h2>Mi plan</h2>

      <p>
        Tu plan actual: <strong>{planActualFormateado}</strong>
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
            <td>📺 Seguimientos activos</td>
            <td>4 series</td>
            <td>♾️ Ilimitados</td>
          </tr>

          <tr>
            <td>📊 Estadísticas personales</td>
            <td>✅ Incluidas</td>
            <td>✅ Incluidas</td>
          </tr>

          <tr>
            <td>🤖 Recomendaciones IA</td>
            <td>⚠️ Genéricas</td>
            <td>✨ Personalizadas</td>
          </tr>

          <tr>
            <td>⭐ Series favoritas</td>
            <td>✅ Incluidas</td>
            <td>✅ Incluidas</td>
          </tr>

          <tr>
            <td>🚀 Soporte prioritario</td>
            <td>❌ No incluido</td>
            <td>✅ Incluido</td>
          </tr>

          <tr>
            <td>🍿 Ideal para</td>
            <td>Uso casual</td>
            <td>Maratones sin límite</td>
          </tr>
        </tbody>
      </table>

      {planActual !== "premium" && (
        <button type="button" onClick={cambiarAPremium}>
          Cambiar a Premium
        </button>
      )}
    </section>
  );
};

export default ViewerPlan;
