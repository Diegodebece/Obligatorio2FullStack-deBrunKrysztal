import React from 'react'

const AdminAside = () => {
  return (
    <aside className="sidebar">
          <h2>nombreAdmin</h2>
          <p>emailAdmin</p>

          <span className="badge admin-badge">admin</span>

          <ul>
            <li>CRUD series</li>
            <li>CRUD categorías</li>
            <li>Gestión usuarios</li>
            <li>Seguimientos generales</li>
          </ul>
        </aside>
  )
}

export default AdminAside