import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const AdminSerieForm = ({
  onGuardarSerie,
  serieEditando,
  onCancelarEdicion,
}) => {
  const categorias = useSelector((state) => state.categorias.categorias);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (serieEditando) {
      reset({
        titulo: serieEditando.titulo,
        descripcion: serieEditando.descripcion,
        plataforma: serieEditando.plataforma,
        categoria: serieEditando.categoria?._id || serieEditando.categoria,
        cantidadTemporadas: serieEditando.cantidadTemporadas,
        episodiosPorTemporada: serieEditando.episodiosPorTemporada,
        minutosPorEpisodio: serieEditando.minutosPorEpisodio,
      });
    } else {
      reset({
        titulo: "",
        descripcion: "",
        plataforma: "",
        categoria: "",
        cantidadTemporadas: "",
        episodiosPorTemporada: "",
        minutosPorEpisodio: "",
      });
    }
  }, [serieEditando, reset]);

  const procesarForm = (data) => {
    const formData = new FormData();

    formData.append("titulo", data.titulo);
    formData.append("descripcion", data.descripcion);
    formData.append("plataforma", data.plataforma);
    formData.append("categoria", data.categoria);
    formData.append("cantidadTemporadas", data.cantidadTemporadas);
    formData.append("episodiosPorTemporada", data.episodiosPorTemporada);
    formData.append("minutosPorEpisodio", data.minutosPorEpisodio);

    if (data.imagen && data.imagen.length > 0) {
      formData.append("imagen", data.imagen[0]);
    }

    onGuardarSerie(formData);
  };

  return (
    <form className="form admin-form" onSubmit={handleSubmit(procesarForm)}>
      <label htmlFor="serie-titulo">Título</label>
      <input
        id="serie-titulo"
        type="text"
        placeholder="nombreSerie"
        {...register("titulo")}
      />

      <label htmlFor="serie-descripcion">Descripción</label>
      <textarea
        id="serie-descripcion"
        placeholder="descripcionSerie"
        {...register("descripcion")}
      ></textarea>

      <label htmlFor="serie-plataforma">Plataforma</label>
      <input
        id="serie-plataforma"
        type="text"
        placeholder="plataformaSerie"
        {...register("plataforma")}
      />

      <label htmlFor="serie-categoria">Categoría</label>
      <select id="serie-categoria" {...register("categoria")}>
        <option value="">Seleccionar categoría</option>

        {categorias.map((categoria) => (
          <option key={categoria._id} value={categoria._id}>
            {categoria.nombre}
          </option>
        ))}
      </select>

      <label htmlFor="serie-temporadas">Cantidad de temporadas</label>
      <input
        id="serie-temporadas"
        type="number"
        placeholder="cantidadTemporadas"
        {...register("cantidadTemporadas")}
      />

      <label htmlFor="serie-episodios">Episodios por temporada</label>
      <input
        id="serie-episodios"
        type="number"
        placeholder="episodiosPorTemporada"
        {...register("episodiosPorTemporada")}
      />

      <label htmlFor="serie-minutos">Minutos por episodio</label>
      <input
        id="serie-minutos"
        type="number"
        placeholder="minutosPorEpisodio"
        {...register("minutosPorEpisodio")}
      />

      <label htmlFor="serie-imagen">Imagen</label>
      <input
        id="serie-imagen"
        type="file"
        accept="image/*"
        {...register("imagen")}
      />

      <button type="submit">
        {serieEditando ? "Modificar serie" : "Guardar serie"}
      </button>

      {serieEditando && (
        <button type="button" onClick={onCancelarEdicion}>
          Cancelar edición
        </button>
      )}
    </form>
  );
};

export default AdminSerieForm;