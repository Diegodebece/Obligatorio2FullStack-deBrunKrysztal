import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import api from "../../api/api";
import {
  listarCategorias,
  crearCategoria,
  modificarCategoria,
  eliminarCategoria,
} from "../../features/categorias/categorias.slice";

import AdminCategoryForm from "./AdminCategoryForm";
import AdminCategoryTable from "./AdminCategoryTable";

const AdminCategoriesManagement = () => {
  const dispatch = useDispatch();
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const formularioRef = useRef(null);

  const cargarCategorias = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/categorias", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 50,
        },
      });

      dispatch(listarCategorias(response.data.data));
    } catch (error) {
      toast.error("Error al cargar categorías");
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const guardarCategoria = async (data) => {
    try {
      const token = localStorage.getItem("token");

      if (categoriaEditando) {
        const response = await api.patch(
          `/categorias/${categoriaEditando._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(modificarCategoria(response.data.data));
        toast.success("Categoría modificada correctamente");
        setCategoriaEditando(null);
      } else {
        const response = await api.post("/categorias", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(crearCategoria(response.data.data));
        toast.success("Categoría creada correctamente");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al guardar categoría");
    }
  };

  const borrarCategoria = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/categorias/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(eliminarCategoria(id));
      toast.success("Categoría eliminada correctamente");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al eliminar categoría");
    }
  };

  const editarCategoria = (categoria) => {
    setCategoriaEditando(categoria);

    requestAnimationFrame(() => {
      const posicionFormulario =
        formularioRef.current?.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: posicionFormulario - 190,
        behavior: "smooth",
      });
    });
  };

  return (
    <section className="panel" id="admin-categorias">
      <h2>CRUD de categorías</h2>

      <div ref={formularioRef}>
        <AdminCategoryForm
          onGuardarCategoria={guardarCategoria}
          categoriaEditando={categoriaEditando}
          onCancelarEdicion={() => setCategoriaEditando(null)}
        />
      </div>

      <AdminCategoryTable
        onEditarCategoria={editarCategoria}
        onEliminarCategoria={borrarCategoria}
      />
    </section>
  );
};

export default AdminCategoriesManagement;
