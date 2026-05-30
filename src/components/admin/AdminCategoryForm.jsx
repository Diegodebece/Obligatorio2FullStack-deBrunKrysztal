import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AdminCategoryForm = ({
  onGuardarCategoria,
  categoriaEditando,
  onCancelarEdicion,
}) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (categoriaEditando) {
      reset({
        nombre: categoriaEditando.nombre,
        descripcion: categoriaEditando.descripcion,
        activa: categoriaEditando.activa.toString(),
      });
    } else {
      reset({
        nombre: "",
        descripcion: "",
        activa: "true",
      });
    }
  }, [categoriaEditando, reset]);

  const procesarForm = (data) => {
    const datosCategoria = {
      nombre: data.nombre,
      descripcion: data.descripcion,
      activa: data.activa === "true",
    };

    onGuardarCategoria(datosCategoria);

  };

  return (
    <form className="form categoria-form" onSubmit={handleSubmit(procesarForm)}>
      <label htmlFor="categoria-nombre">Nombre</label>
      <input
        id="categoria-nombre"
        type="text"
        placeholder="nombreCategoria"
        {...register("nombre")}
      />

      <label htmlFor="categoria-descripcion">Descripción</label>
      <input
        id="categoria-descripcion"
        type="text"
        placeholder="descripcionCategoria"
        {...register("descripcion")}
      />

      <label htmlFor="categoria-activa">Estado</label>
      <select id="categoria-activa" {...register("activa")}>
        <option value="true">activa</option>
        <option value="false">inactiva</option>
      </select>

      <button type="submit">
        {categoriaEditando ? "Modificar categoría" : "Guardar categoría"}
      </button>

      {categoriaEditando && (
        <button type="button" onClick={onCancelarEdicion}>
          Cancelar edición
        </button>
      )}
    </form>
  );
};

export default AdminCategoryForm;