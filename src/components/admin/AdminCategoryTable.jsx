const AdminCategoryTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>nombreCategoria</td>
          <td>descripcionCategoria</td>
          <td>activa</td>
          <td>
            <button type="button">Editar</button>

            <button
              type="button"
              className="danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AdminCategoryTable;