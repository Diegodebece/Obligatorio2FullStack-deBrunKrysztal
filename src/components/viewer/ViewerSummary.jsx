import React from 'react'

const ViewerSummary = () => {
    return (

            <section className="cards-resumen">
                <article className="resumen-card">
                    <h3>Plan actual</h3>
                    <p>plus</p>
                    <button>Cambiar a premium</button>
                </article>

                <article className="resumen-card">
                    <h3>Uso del plan</h3>
                    <p>cantidadSeguimientos / 4</p>
                    <div className="barra">
                        <div className="barra-progreso"></div>
                    </div>
                </article>

                <article className="resumen-card">
                    <h3>Favoritas</h3>
                    <p>cantidadFavoritas</p>
                </article>

                <article className="resumen-card">
                    <h3>Terminadas</h3>
                    <p>cantidadTerminadas</p>
                </article>
            </section>
    )
}

export default ViewerSummary