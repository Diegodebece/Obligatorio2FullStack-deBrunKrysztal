const ViewerTrackingCard = ({
    seguimiento,
    onAvanzar,
    onEditar,
    onEliminar,
    obtenerTextoBotonAvance,
}) => {
    const obtenerTituloSeguimiento = () => {
        return seguimiento.serie?.titulo || "Serie sin título";
    };

    return (
        <article className="tarjeta">
            <div className="imagen">
                {seguimiento.serie?.imagen ? (
                    <img
                        src={seguimiento.serie.imagen}
                        alt={obtenerTituloSeguimiento()}
                    />
                ) : (
                    "imagenSerie"
                )}
            </div>

            <div>
                <h3>{obtenerTituloSeguimiento()}</h3>

                <p>Estado: {seguimiento.estado}</p>
                <p>Rating: {seguimiento.ratingPersonal || "Sin rating"}</p>

                <p>
                    Temporada actual: {seguimiento.temporadaActual || "Sin indicar"}
                </p>

                <p>
                    Episodio actual: {seguimiento.episodioActual || "Sin indicar"}
                </p>

                <button
                    type="button"
                    disabled={seguimiento.estado === "terminada"}
                    onClick={() => onAvanzar(seguimiento)}
                >
                    {obtenerTextoBotonAvance(seguimiento)}
                </button>

                <p>
                    Fecha inicio:{" "}
                    {seguimiento.fechaInicio
                        ? seguimiento.fechaInicio.substring(0, 10)
                        : "Sin indicar"}
                </p>

                <p>
                    Fecha fin:{" "}
                    {seguimiento.fechaFin
                        ? seguimiento.fechaFin.substring(0, 10)
                        : "Sin indicar"}
                </p>

                <p>{seguimiento.esFavorita ? "Favorita" : "No favorita"}</p>

                <button type="button" onClick={() => onEditar(seguimiento)}>
                    Editar
                </button>

                <button
                    type="button"
                    className="danger"
                    onClick={() => onEliminar(seguimiento._id)}
                >
                    Eliminar
                </button>
            </div>
        </article>
    );
};

export default ViewerTrackingCard;