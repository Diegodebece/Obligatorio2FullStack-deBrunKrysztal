import { Link } from "react-router";
import RegisterForm from "../components/register/RegisterForm.jsx";

const RegisterPage = () => {
  return (
    <section className="auth">
      <article className="auth-card">
        <h2>Registro</h2>

        <RegisterForm />

        <p>
          ¿Ya tenés cuenta? <Link to="/">Iniciar sesión</Link>
        </p>
      </article>
    </section>
  );
};

export default RegisterPage;