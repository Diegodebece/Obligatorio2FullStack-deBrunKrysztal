import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/api";

const ViewerAI = () => {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [seriesExternas, setSeriesExternas] = useState([]);

  const [cargandoIA, setCargandoIA] = useState(false);
  const [cargandoExternas, setCargandoExternas] = useState(false);

  const generarRecomendaciones = async () => {
    try {
      setCargandoIA(true);

      const token = localStorage.getItem("token");

      const response = await api.get("/seguimientos/recomendaciones", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const recomendacionesRecibidas =
        response.data.final || response.data.data || response.data;

      setRecomendaciones(recomendacionesRecibidas);

      toast.success("Recomendaciones generadas correctamente");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.mensaje ||
        "Error al generar recomendaciones"
      );
    } finally {
      setCargandoIA(false);
    }
  };

  const cargarSeriesExternas = async () => {
    try {
      setCargandoExternas(true);

      const token = localStorage.getItem("token");

      const response = await api.get("/seguimientos/trending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const seriesRecibidas = response.data.data || response.data;

      setSeriesExternas(seriesRecibidas);

      toast.success("Series externas cargadas correctamente");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.mensaje ||
        "Error al cargar series externas"
      );
    } finally {
      setCargandoExternas(false);
    }
  };

  const obtenerTitulo = (serie) => {
    if (typeof serie === "string") {
      return serie;
    }

    return serie.titulo || serie.name || "Serie recomendada";
  };

  const obtenerImagen = (serie) => {
    if (typeof serie === "string") {
      return null;
    }

    return serie.imagen || serie.image || serie.poster || null;
  };

  const obtenerGeneros = (serie) => {
    if (typeof serie === "string") {
      return null;
    }

    if (serie.generos) {
      return serie.generos.join(", ");
    }

    if (serie.genres) {
      return serie.genres.join(", ");
    }

    return null;
  };

  const obtenerRating = (serie) => {
    if (typeof serie === "string") {
      return null;
    }

    return serie.rating || serie.puntaje || null;
  };

  const obtenerEstreno = (serie) => {
    if (typeof serie === "string") {
      return null;
    }

    return serie.estreno || serie.premiered || null;
  };

  return (

    <section className="panel" id="viewer-ia">
      <h2>Recomendaciones con IA</h2>

      <p>
        Generá recomendaciones según tus seguimientos actuales.
      </p>

      <button
        type="button"
        onClick={generarRecomendaciones}
        disabled={cargandoIA}
      >
        {cargandoIA ? (
          <>
            <span className="spinner"></span>
            Generando...
          </>
        ) : (
          "Generar recomendaciones"
        )}
      </button>

      {!cargandoIA && recomendaciones.length > 0 && (
        <p className="mensaje-recomendaciones">
          Tu próxima serie favorita puede ser una de estas!!
        </p>
      )}

      <div className="tarjetas">
        {cargandoIA && (
          <div className="loading-panel">
            <span className="spinner spinner-grande"></span>
            <span>Buscando las mejores series en base a tus gustos...</span>
          </div>
        )}

        {!cargandoIA && recomendaciones.length === 0 && (
          <p>Todavía no generaste recomendaciones.</p>
        )}

        {!cargandoIA &&
          recomendaciones.map((serie, index) => (

            <article className="tarjeta" key={index}>
              <div className="imagen">
                {obtenerImagen(serie) ? (
                  <img src={obtenerImagen(serie)} alt={obtenerTitulo(serie)} />
                ) : (
                  "imagenSerie"
                )}
              </div>

              <div>
                <h3>{obtenerTitulo(serie)}</h3>

                {obtenerGeneros(serie) && <p>{obtenerGeneros(serie)}</p>}

                {obtenerRating(serie) && <p>Rating: {obtenerRating(serie)}</p>}

                {obtenerEstreno(serie) && (
                  <p>Estreno: {obtenerEstreno(serie)}</p>
                )}
              </div>
            </article>
          ))}
      </div>

      <section className="panel" id="viewer-api">
        <h2>API externa</h2>

        <p>
          Consultá series populares desde una API externa.
        </p>

        <button
          type="button"
          onClick={cargarSeriesExternas}
          disabled={cargandoExternas}
        >
          {cargandoExternas ? (
            <>
              <span className="spinner"></span>
              Cargando...
            </>
          ) : (
            "Ver series populares"
          )}
        </button>

        <div className="tarjetas">
          {seriesExternas.length === 0 && (
            <p>Todavía no cargaste series externas.</p>
          )}

          {seriesExternas.map((serie, index) => (
            <article className="tarjeta" key={serie.id || index}>
              <div className="imagen">
                {obtenerImagen(serie) ? (
                  <img src={obtenerImagen(serie)} alt={obtenerTitulo(serie)} />
                ) : (
                  "imagenSerie"
                )}
              </div>

              <div>
                <h3>{obtenerTitulo(serie)}</h3>

                {obtenerGeneros(serie) && <p>{obtenerGeneros(serie)}</p>}

                {obtenerRating(serie) && <p>Rating: {obtenerRating(serie)}</p>}

                {obtenerEstreno(serie) && (
                  <p>Estreno: {obtenerEstreno(serie)}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default ViewerAI;