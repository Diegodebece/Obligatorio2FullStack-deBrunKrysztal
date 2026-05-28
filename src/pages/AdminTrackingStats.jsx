import React from 'react'

const AdminTrackingStats = () => {
  return (
    <section className="panel" id="admin-seguimientos">
            <h2>Seguimientos generales</h2>

            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Serie</th>
                  <th>Estado</th>
                  <th>Favorita</th>
                  <th>Rating</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>usernameUsuario</td>
                  <td>nombreSerie</td>
                  <td>viendo</td>
                  <td>true</td>
                  <td>ratingPersonal</td>
                </tr>
              </tbody>
            </table>
          </section>
  )
}

export default AdminTrackingStats