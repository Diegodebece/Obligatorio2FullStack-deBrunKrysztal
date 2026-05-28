import React from 'react'

const LoginForm = () => {
    return (
        <form id="login-form" className="form">
            <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                    type="email"
                    id="login-email"
                    name="email"
                    placeholder="usuario@email.com"
                    required=""
                />
            </div>
            <div className="form-group">
                <label htmlFor="login-password">Contraseña</label>
                <input
                    type="password"
                    id="login-password"
                    name="password"
                    placeholder="Ingresá tu contraseña"
                    required=""
                />
            </div>
            <p id="login-error" className="message error-message" />
            <button
                id="login-submit"
                type="submit"
                className="btn btn-primary"
                disabled=""
            >
                Ingresar
            </button>
        </form>

    )
}

export default LoginForm