const AdminUsersTable = () => {
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
        <tr>
          <td>usernameUsuario</td>
          <td>emailUsuario</td>
          <td>viewer</td>
          <td>plus</td>
          <td>
            <select>
              <option value="viewer">viewer</option>
              <option value="admin">admin</option>
            </select>
          </td>
          <td>
            <button type="button">Cambiar rol</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AdminUsersTable;