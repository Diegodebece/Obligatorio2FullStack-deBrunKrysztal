import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Link } from "react-router";

import api from "../../api/api";
import { guardarToken } from "../../features/auth/auth.slice";

const ViewerSummary = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const seguimientos = useSelector((state) => state.seguimientos.seguimientos);

  const usuario = jwtDecode(token);
  const planActual = usuario.plan;
  const planActualFormateado =
    planActual.charAt(0).toUpperCase() + planActual.slice(1);

  const totalSeguimientos = seguimientos.length;

  const totalFavoritas = seguimientos.filter(
    (seguimiento) => seguimiento.esFavorita
  ).length;

  const totalTerminadas = seguimientos.filter(
    (seguimiento) => seguimiento.estado === "terminada"
  ).length;

  const limiteSeguimientos = planActual === "plus" ? 4 : "Sin límite";
  const porcentajeUsoPlan =
    planActual === "plus"
      ? Math.round((totalSeguimientos / 4) * 100)
      : 100;

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
        <p>{planActualFormateado}</p>

        {planActual === "plus" && (
          <button type="button" onClick={cambiarAPremium}>
            Cambiar a premium
          </button>
        )}

      </article>

      <article className="resumen-card">
        <h3>Uso del plan</h3>
        {planActual === "premium" ? (
    <p>{totalSeguimientos} seguimientos activos</p>
  ) : (
    <>
      <p>
        {porcentajeUsoPlan}% ({totalSeguimientos} de {limiteSeguimientos} seguimientos)
      </p>

      <div className="barra-progreso">
        <div
          className="barra-progreso-rellena"
          style={{ width: `${porcentajeUsoPlan}%` }}
        />
      </div>
    </>
  )}
      </article>

      <article className="resumen-card">
        <h3>Favoritas</h3>
        <p>{totalFavoritas}</p>
      </article>

      <article className="resumen-card">
        <h3>Terminadas</h3>
        <p>{totalTerminadas}</p>
      </article>


      {seguimientos.length === 0 ? (
        <div className="resumen-vacio">
          <p>Todavía no tenés seguimientos.</p>

          <Link to="/viewer/catalogo">
            Ir al catálogo de series
          </Link>
        </div>
      ) : (
        <>
          <h3>Mis series {" "}
            <Link className="titulo-link-secundario" to="/viewer/seguimientos">
              (editar)
            </Link>
          </h3>

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
                  <td>{seguimiento.ratingPersonal ?? "Sin rankear"}</td>
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

export default ViewerSummary;