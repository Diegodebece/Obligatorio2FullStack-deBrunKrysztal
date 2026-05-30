import { useSelector } from "react-redux";

const AdminCategoryTable = ({ onEditarCategoria, onEliminarCategoria }) => {
  const categorias = useSelector((state) => state.categorias.categorias);

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
        {categorias.map((categoria) => (
          <tr key={categoria._id}>
            <td>{categoria.nombre}</td>
            <td>{categoria.descripcion}</td>
            <td>{categoria.activa ? "activa" : "inactiva"}</td>
            <td>
              <button
                type="button"
                onClick={() => onEditarCategoria(categoria)}
              >
                Editar
              </button>

              <button
                type="button"
                className="danger"
                onClick={() => onEliminarCategoria(categoria._id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminCategoryTable;