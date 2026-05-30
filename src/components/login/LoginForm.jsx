import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import api from "../../api/api";
import { guardarToken } from "../../features/auth/auth.slice";
import { loginUsuarioSchema } from "../../validators/auth.validators";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid },} = useForm({
    resolver: joiResolver(loginUsuarioSchema),
    mode: "onChange",
  });

 const procesarForm = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      const token = response.data.token;
      dispatch(guardarToken(token));
      const usuario = jwtDecode(token);
      toast.success("¡Bienvenido!");

      if (usuario.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/viewer");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(procesarForm)}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>

          <input
            type="email"
            id="email"
            {...register("email")}
          />

          {errors.email && (
            <span className="error">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>

          <input
            type="password"
            id="password"
            {...register("password")}
          />

          {errors.password && (
            <span className="error">
              {errors.password.message}
            </span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting || !isDirty || !isValid}>
          Ingresar
        </button>
      </form>
    </>
  );
};

export default LoginForm;