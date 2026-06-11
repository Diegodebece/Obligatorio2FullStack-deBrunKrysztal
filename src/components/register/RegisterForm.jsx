import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import api from "../../api/api";
import { guardarToken } from "../../features/auth/auth.slice";
import { registrarUsuarioSchema } from "../../validators/usuarios.validators";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid }, } = useForm({
    resolver: joiResolver(registrarUsuarioSchema),
    mode: "onChange",
  });

  const procesarForm = async (data) => {
    try {
      const datosRegistro = {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const response = await api.post("/auth/registro", datosRegistro);
      const token = response.data.token;

      if (!token) {
        throw new Error("No se recibió token del servidor");
      }

      dispatch(guardarToken(token));
      const usuario = jwtDecode(token);
      toast.success("Usuario registrado correctamente");

      if (usuario.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/viewer");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(procesarForm)}>
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario:</label>
          <input type="text" id="username" {...register("username")} />
          {errors.username && <span className="error">{errors.username.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Repetir contraseña:</label>
          <input type="password" id="confirmPassword" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting || !isDirty || !isValid}>
          Registrarme
        </button>
      </form>
    </>
  );
};

export default RegisterForm;