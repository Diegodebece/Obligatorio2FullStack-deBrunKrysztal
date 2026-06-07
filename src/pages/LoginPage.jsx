import { Link } from "react-router";
import LoginForm from "../components/login/LoginForm.jsx";

const LoginPage = () => {
  return (
    <section className="login">
      <article className="auth-card">
        <h1>YourNextEpisode 😎</h1>
        <h2>Login</h2>

        <LoginForm />

        <p>
          ¿No tenés cuenta? <Link to="/register">Registrate</Link>
        </p>
      </article>
    </section>
  );
};

export default LoginPage;