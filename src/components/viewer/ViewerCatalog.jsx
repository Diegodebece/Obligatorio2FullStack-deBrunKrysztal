import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api";
import { crearSeguimiento } from "../../features/seguimientos/seguimientos.slice";
import ViewerSerieCard from "./ViewerSerieCard";
import ViewerTrackingForm from "./ViewerTrackingForm";

const seguimientoInicial = {
  estado: "pendiente",
  esFavorita: false,
  ratingPersonal: "",
  temporadaActual: "",
  episodioActual: "",
  fechaInicio: "",
};

const ViewerCatalog = () => {
  const dispatch = useDispatch();
  const series = useSelector((state) => state.series.series);
  const categorias = useSelector((state) => state.categorias.categorias);
  const [serieSeleccionada, setSerieSeleccionada] = useState(null);
  const [formSeguimiento, setFormSeguimiento] = useState(seguimientoInicial);

  const seguimientos = useSelector((state) => state.seguimientos.seguimientos);

  const serieYaEstaEnSeguimientos = (serieId) => {
    return seguimientos.some((seguimiento) => {
      const idSerie = seguimiento.serie?._id || seguimiento.serie;
      return idSerie === serieId;
    });
  };

  const obtenerNombreCategoria = (categoriaSerie) => {
    const idCategoria = categoriaSerie?._id || categoriaSerie;

    const categoriaEncontrada = categorias.find(
      (categoria) => categoria._id === idCategoria
    );

    return categoriaEncontrada?.nombre || "Sin categoría";
  };

  const onAbrirFormularioSeguimiento = (serie) => {
    setSerieSeleccionada(serie);
    setFormSeguimiento(seguimientoInicial);
  };

  const onCambiarFormulario = (event) => {
    const { name, value, type, checked } = event.target;

    setFormSeguimiento({
      ...formSeguimiento,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const convertirNumeroONull = (valor) => {
    return valor === "" ? null : Number(valor);
  };

  const onCancelarSeguimiento = () => {
    setSerieSeleccionada(null);
    setFormSeguimiento(seguimientoInicial);
  };

  const onAgregarSeguimiento = async (event) => {
    event.preventDefault();

    if (!serieSeleccionada) return;

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/seguimientos",
        {
          serie: serieSeleccionada._id,
          estado: formSeguimiento.estado,
          esFavorita: formSeguimiento.esFavorita,
          ratingPersonal: convertirNumeroONull(formSeguimiento.ratingPersonal),
          temporadaActual: convertirNumeroONull(formSeguimiento.temporadaActual),
          episodioActual: convertirNumeroONull(formSeguimiento.episodioActual),
          fechaInicio: formSeguimiento.fechaInicio || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        crearSeguimiento({
          ...response.data,
          serie: serieSeleccionada,
        })
      );

      toast.success("Serie agregada a seguimiento");
      onCancelarSeguimiento();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al agregar seguimiento"
      );
    }
  };


  return (
    <section className="panel" id="catalogo">
      <h2>Catálogo de series</h2>

      {serieSeleccionada && (
        <ViewerTrackingForm
          serie={serieSeleccionada}
          formSeguimiento={formSeguimiento}
          onCambiarFormulario={onCambiarFormulario}
          onGuardarSeguimiento={onAgregarSeguimiento}
          onCancelarSeguimiento={onCancelarSeguimiento}
        />
      )}


      <div className="filtros">
        <input type="text" placeholder="Buscar por título" />

        <select>
          <option>Categoría</option>
        </select>

        <input type="text" placeholder="Plataforma" />

        <button>Filtrar</button>
      </div>

      <div className="tarjetas">
        {series.length === 0 && <p>No hay series disponibles.</p>}

        {series.map((serie) => (
          <ViewerSerieCard
            key={serie._id}
            serie={serie}
            nombreCategoria={obtenerNombreCategoria(serie.categoria)}
            onAgregarSeguimiento={onAbrirFormularioSeguimiento}
            estaEnSeguimientos={serieYaEstaEnSeguimientos(serie._id)}
          />
        ))}
      </div>

    </section>
  )
}

export default ViewerCatalog
