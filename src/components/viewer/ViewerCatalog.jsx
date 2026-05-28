import React from 'react'

const ViewerCatalog = () => {
  return (
    <section className="panel" id="catalogo">
            <h2>Catálogo de series</h2>

            <div className="filtros">
              <input type="text" placeholder="buscarPorTitulo" />

              <select>
                <option>categoriaSerie</option>
              </select>

              <input type="text" placeholder="plataformaSerie" />

              <button>Filtrar</button>
            </div>

            <div className="tarjetas">
              <article className="tarjeta">
                <div className="imagen">imagenSerie</div>

                <div>
                  <h3>nombreSerie</h3>
                  <p>descripcionSerie</p>
                  <p>plataformaSerie</p>
                  <p>categoriaSerie</p>
                  <p>cantidadTemporadas temporadas</p>

                  <button>Agregar a seguimiento</button>
                </div>
              </article>

              <article className="tarjeta">
                <div className="imagen">imagenSerie</div>

                <div>
                  <h3>nombreSerie</h3>
                  <p>descripcionSerie</p>
                  <p>plataformaSerie</p>
                  <p>categoriaSerie</p>
                  <p>cantidadTemporadas temporadas</p>

                  <button>Agregar a seguimiento</button>
                </div>
              </article>
            </div>
          </section>
  )
}

export default ViewerCatalog