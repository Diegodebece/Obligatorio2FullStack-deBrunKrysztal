import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { cerrarSesion } from "../../features/auth/auth.slice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(cerrarSesion());
    navigate("/");
  };

  return (
    <button type="button" onClick={logout}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;