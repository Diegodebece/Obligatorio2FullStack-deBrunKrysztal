import React from 'react';
import LoginForm from '../components/login/LoginForm.jsx';

const LoginPage = () => {
    return (
        <section className="login">
            <article className="auth-card">
                <h1>YourNextEpisode 😎</h1>
                <h2>Login</h2>

                <LoginForm />

            </article>
        </section>
    )
}

export default LoginPage