import React from 'react'

const AdminCategoriesManagement = () => {
  return (
    <section className="panel" id="admin-categorias">
            <h2>CRUD de categorías</h2>

            <form className="form categoria-form">
              <label>Nombre</label>
              <input type="text" placeholder="nombreCategoria" />

              <label>Descripción</label>
              <input type="text" placeholder="descripcionCategoria" />

              <label>Estado</label>
              <select>
                <option>activa</option>
                <option>inactiva</option>
              </select>

              <button type="button">Guardar categoría</button>
            </form>

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
                    <button>Editar</button>
                    <button className="danger">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
  )
}

export default AdminCategoriesManagement