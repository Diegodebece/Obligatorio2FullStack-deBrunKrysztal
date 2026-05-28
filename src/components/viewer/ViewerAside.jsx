import React from 'react'

const Aside = () => {
  return (
    <aside className="sidebar">
          <h2>nombreUsuario</h2>
          <p>emailUsuario</p>

          <span className="badge">viewer</span>
          <span className="badge">plus</span>

          <ul>
            <li>Resumen</li>
            <li>Catálogo de series</li>
            <li>Mis seguimientos</li>
            <li>Estadísticas</li>
            <li>Recomendaciones IA</li>
            <li>API externa</li>
          </ul>
        </aside>
  )
}

export default Aside