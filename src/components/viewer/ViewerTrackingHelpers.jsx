export const obtenerTituloSeguimiento = (seguimiento) => {
    return seguimiento.serie?.titulo || "Serie sin título";
};

export const obtenerTextoBotonAvance = (seguimiento) => {
    const serie = seguimiento.serie;

    if (seguimiento.estado === "terminada") {
        return "Completada";
    }

    if (
        seguimiento.estado === "pendiente" ||
        !seguimiento.temporadaActual ||
        !seguimiento.episodioActual
    ) {
        return "Comencé a verla";
    }

    const esUltimoEpisodio =
        seguimiento.episodioActual >= serie.episodiosPorTemporada;

    const esUltimaTemporada =
        seguimiento.temporadaActual >= serie.cantidadTemporadas;

    if (esUltimoEpisodio && esUltimaTemporada) {
        return "Terminé la serie";
    }

    if (esUltimoEpisodio) {
        return "Siguiente temporada";
    }

    return "+1 episodio";
};

export const filtrarYOrdenarSeguimientos = (seguimientos, filtroSeguimiento) => {
    return seguimientos
        .filter((seguimiento) => {
            if (filtroSeguimiento === "todos") {
                return true;
            }

            if (filtroSeguimiento === "favoritas") {
                return seguimiento.esFavorita;
            }

            return seguimiento.estado === filtroSeguimiento;
        })
        .sort((seguimientoA, seguimientoB) =>
            obtenerTituloSeguimiento(seguimientoA).localeCompare(
                obtenerTituloSeguimiento(seguimientoB)
            )
        );
};