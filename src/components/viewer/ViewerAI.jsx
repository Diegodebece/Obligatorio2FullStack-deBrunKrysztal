import React from 'react'

const ViewerAI = () => {
  return (
    <>
    <section className="panel" id="ia">
            <h2>Recomendaciones con IA</h2>
            <p>La IA recomienda series según favoritos y ratings.</p>

            <button>Generar recomendación</button>

            <div className="resultado">
              resultadoRecomendacionIA
            </div>
          </section>

          <section className="panel" id="api">
            <h2>API externa</h2>

            <form className="form">
              <input type="text" placeholder="buscarSerieExterna" />
              <button type="button">Buscar</button>
            </form>

            <div className="tarjeta">
              <div className="imagen">imagenExterna</div>

              <div>
                <h3>nombreSerieExterna</h3>
                <p>descripcionSerieExterna</p>
                <p>ratingExterno</p>
                <p>estadoExterno</p>
              </div>
            </div>
          </section>
    </>
  )
}

export default ViewerAI