import { useSelector } from "react-redux";

const AdminUsersTable = ({ onCambiarRolUsuario }) => {
  const usuarios = useSelector((state) => state.usuarios.usuarios);

  return (
    <table>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Email</th>
          <th>Rol actual</th>
          <th>Plan</th>
          <th>Nuevo rol</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario._id}>
            <td>{usuario.username}</td>
            <td>{usuario.email}</td>
            <td>{usuario.rol}</td>
            <td>{usuario.plan}</td>
            <td>
              <select id={`rol-${usuario._id}`} defaultValue={usuario.rol}>
                <option value="viewer">viewer</option>
                <option value="admin">admin</option>
              </select>
            </td>
            <td>
              <button
                type="button"
                onClick={() => {
                  const select = document.getElementById(`rol-${usuario._id}`);
                  onCambiarRolUsuario(usuario._id, select.value);
                }}
              >
                Cambiar rol
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminUsersTable;