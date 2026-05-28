import React from 'react'

const AdminSeriesManagement = () => {
  return (

          <section className="panel" id="admin-series">
            <h2>CRUD de series</h2>

            <form className="form admin-form">
              <label>Título</label>
              <input type="text" placeholder="nombreSerie" />

              <label>Descripción</label>
              <textarea placeholder="descripcionSerie"></textarea>

              <label>Plataforma</label>
              <input type="text" placeholder="plataformaSerie" />

              <label>Categoría</label>
              <select>
                <option>categoriaSerie</option>
              </select>

              <label>Cantidad de temporadas</label>
              <input type="number" placeholder="cantidadTemporadas" />

              <label>Episodios por temporada</label>
              <input type="number" placeholder="episodiosPorTemporada" />

              <label>Minutos por episodio</label>
              <input type="number" placeholder="minutosPorEpisodio" />

              <label>Imagen</label>
              <input type="file" />

              <button type="button">Guardar serie</button>
            </form>

            <div className="tarjetas">
              <article className="tarjeta">
                <div className="imagen">imagenSerie</div>

                <div>
                  <h3>nombreSerie</h3>
                  <p>descripcionSerie</p>
                  <p>plataformaSerie</p>
                  <p>categoriaSerie</p>

                  <button>Editar</button>
                  <button className="danger">Eliminar</button>
                </div>
              </article>
            </div>
          </section>
  )
}

export default AdminSeriesManagement