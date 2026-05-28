import React from 'react'

const ViewerTracking = () => {
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
              <article className="tarjeta">
                <div className="imagen">imagenSerie</div>

                <div>
                  <h3>nombreSerie</h3>
                  <p>estadoSeguimiento</p>
                  <p>ratingPersonal</p>
                  <p>esFavorita</p>

                  <button>Editar</button>
                  <button className="danger">Eliminar</button>
                </div>
              </article>
            </div>
          </section>
  )
}

export default ViewerTracking