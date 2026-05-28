import React from 'react'

const RegisterForm = () => {
  return (
    <form className="form">
            <label>Nombre de usuario</label>
            <input type="text" placeholder="usernameUsuario" />

            <label>Email</label>
            <input type="email" placeholder="emailUsuario" />

            <label>Contraseña</label>
            <input type="password" placeholder="passwordUsuario" />

            <label>Repetir contraseña</label>
            <input type="password" placeholder="repetirPassword" />

            <button type="button">Registrarme</button>
          </form>
  )
}

export default RegisterForm