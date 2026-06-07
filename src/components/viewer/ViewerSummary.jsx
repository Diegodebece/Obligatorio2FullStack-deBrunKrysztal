import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import api from "../../api/api";
import { guardarToken } from "../../features/auth/auth.slice";

const ViewerSummary = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  
  const seguimientos = useSelector((state) => state.seguimientos.seguimientos);

  const usuario = jwtDecode(token);
  const planActual = usuario.plan;

  const totalSeguimientos = seguimientos.length;

  const totalFavoritas = seguimientos.filter((seguimiento) => seguimiento.esFavorita).length;
  const totalTerminadas = seguimientos.filter((seguimiento) => seguimiento.estado === "terminada").length;

  const cambiarAPremium = async () => {
    try {
      const response = await api.patch(
        "/usuarios/me/plan",
        {},
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
    <section className="cards-resumen" id="viewer-resumen">
      <article className="resumen-card">
        <h3>Plan actual</h3>
        <p>{planActual}</p>

        {planActual === "plus" && (
          <button type="button" onClick={cambiarAPremium}>
            Cambiar a premium
          </button>
        )}

        {planActual === "premium" && <p>Ya tenés plan premium</p>}
      </article>

      <article className="resumen-card">
        <h3>Mis seguimientos</h3>
        <p>{totalSeguimientos}</p>
      </article>

      <article className="resumen-card">
        <h3>Favoritas</h3>
        <p>{totalFavoritas}</p>
      </article>

      <article className="resumen-card">
        <h3>Terminadas</h3>
        <p>{totalTerminadas}</p>
      </article>
    </section>
  );
};

export default ViewerSummary;