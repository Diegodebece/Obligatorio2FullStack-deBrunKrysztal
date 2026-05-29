const AdminCategoryForm = () => {
  return (
    <form className="form categoria-form">
      <label htmlFor="categoria-nombre">Nombre</label>
      <input
        id="categoria-nombre"
        type="text"
        placeholder="nombreCategoria"
      />

      <label htmlFor="categoria-descripcion">Descripción</label>
      <input
        id="categoria-descripcion"
        type="text"
        placeholder="descripcionCategoria"
      />

      <label htmlFor="categoria-activa">Estado</label>
      <select id="categoria-activa">
        <option value="true">activa</option>
        <option value="false">inactiva</option>
      </select>

      <button type="button">Guardar categoría</button>
    </form>
  );
};

export default AdminCategoryForm;