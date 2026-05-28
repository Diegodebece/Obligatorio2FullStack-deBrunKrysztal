import React from 'react';
import { Link } from 'react-router';
import { Outlet } from 'react-router'

const ContainerPage = () => {
  return (
    <>
    <header className="header admin-header">
        <div>
          <h1>Series Tracker</h1>
          <p>Panel de administración - Admin</p>
        </div>

        <nav>
          <Link to="/register">Crear cuenta</Link>
          <a href="#admin-categorias">Categorías</a>
          <a href="#admin-usuarios">Usuarios</a>
          <a href="#admin-seguimientos">Seguimientos</a>
        </nav>

        <button>Cerrar sesión</button>
      </header>

    <Outlet />

    </>
  )
}

export default ContainerPage