import React from 'react'

const AdminUsersManagement = () => {
  return (
    <section className="panel" id="admin-usuarios">
            <h2>Gestión de usuarios</h2>

            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Plan</th>
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
                      <option>viewer</option>
                      <option>admin</option>
                    </select>
                    <button>Cambiar rol</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
  )
}

export default AdminUsersManagement