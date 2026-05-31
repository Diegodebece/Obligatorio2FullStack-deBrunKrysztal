import React from 'react'
import { useSelector } from "react-redux";

const ViewerTracking = () => {
  const seguimientos = useSelector((state) => state.seguimientos.seguimientos);
  return (
    <section className="panel" id="seguimientos">
      <h2>Mis seguimientos</h2>

      <form className="form seguimiento-form">
        <label>Serie</label>
        <select>
          <option>nombreSerie</option>
        </select>

        <label>Estado</label>
        <select>
          <option>pendiente</option>
          <option>viendo</option>
          <option>terminada</option>
        </select>

        <label>Rating personal</label>
        <input type="number" placeholder="ratingPersonal" />

        <label className="checkbox-line">
          <input type="checkbox" />
          Favorita
        </label>

        <button type="button">Guardar seguimiento</button>
      </form>

      <div className="tarjetas">
        {seguimientos.length === 0 && <p>No tenés seguimientos todavía.</p>}

        {seguimientos.map((seguimiento) => (
          <article className="tarjeta" key={seguimiento._id}>
            <div className="imagen">
              {seguimiento.serie?.imagen ? (
                <img src={seguimiento.serie.imagen} alt={seguimiento.serie.titulo} />
              ) : (
                "imagenSerie"
              )}
            </div>

            <div>
              <h3>{seguimiento.serie?.titulo || "Serie sin título"}</h3>
              <p>{seguimiento.estado}</p>
              <p>{seguimiento.ratingPersonal || "Sin rating"}</p>
              <p>{seguimiento.esFavorita ? "Favorita" : "No favorita"}</p>

              <button type="button">Editar</button>
              <button type="button" className="danger">Eliminar</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ViewerTracking