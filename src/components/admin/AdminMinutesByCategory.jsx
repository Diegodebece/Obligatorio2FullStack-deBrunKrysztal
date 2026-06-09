import { useSelector } from "react-redux";
import MinutesByCategoryChart from "../common/MinutesByCategoryChart";

const AdminMinutesByCategory = () => {
    const categorias = useSelector((state) => state.categorias.categorias);
    const seguimientos = useSelector(
        (state) => state.estadisticas.seguimientos
    );

    const obtenerNombreCategoria = (categoriaSerie) => {
        if (!categoriaSerie) {
            return "Sin categoría";
        }

        if (categoriaSerie.nombre) {
            return categoriaSerie.nombre;
        }

        const categoriaEncontrada = categorias.find(
            (categoria) => categoria._id === categoriaSerie
        );

        return categoriaEncontrada?.nombre || "Sin categoría";
    };

    const calcularEpisodiosVistos = (seguimiento) => {
        const serie = seguimiento.serie;

        if (!serie || seguimiento.estado === "pendiente") {
            return 0;
        }

        const episodiosPorTemporada = serie.episodiosPorTemporada || 0;

        if (seguimiento.estado === "terminada") {
            return serie.cantidadTemporadas * episodiosPorTemporada;
        }

        if (seguimiento.estado === "viendo") {
            const temporadasCompletas = Math.max(
                (seguimiento.temporadaActual || 1) - 1,
                0
            );

            return (
                temporadasCompletas * episodiosPorTemporada +
                (seguimiento.episodioActual || 0)
            );
        }

        return 0;
    };

    const minutosPorCategoria = {};

    for (let seguimiento of seguimientos) {
        const serie = seguimiento.serie;

        if (!serie) {
            continue;
        }

        const categoria = obtenerNombreCategoria(serie.categoria);
        const episodiosVistos = calcularEpisodiosVistos(seguimiento);
        const minutosVistos = episodiosVistos * (serie.minutosPorEpisodio || 0);

        minutosPorCategoria[categoria] =
            (minutosPorCategoria[categoria] || 0) + minutosVistos;
    }

    const datosMinutosPorCategoria = Object.entries(minutosPorCategoria)
        .filter(([, minutos]) => minutos > 0)
        .map(([categoria, minutos]) => ({
            categoria,
            minutos,
        }));

    return (
        <MinutesByCategoryChart
            titulo="Minutos vistos por categoría entre todos los usuarios"
            datos={datosMinutosPorCategoria}
        />
    );
};

export default AdminMinutesByCategory;