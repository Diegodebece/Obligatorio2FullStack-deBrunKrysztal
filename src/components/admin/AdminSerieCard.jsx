const AdminSerieCard = () => {
  return (
    <article className="tarjeta">
      <div className="imagen">imagenSerie</div>

      <div>
        <h3>nombreSerie</h3>
        <p>descripcionSerie</p>
        <p>plataformaSerie</p>
        <p>categoriaSerie</p>
        <p>cantidadTemporadas</p>
        <p>episodiosPorTemporada</p>
        <p>minutosPorEpisodio</p>

        <button type="button">Editar</button>
        <button type="button" className="danger">Eliminar</button>
      </div>
    </article>
  );
};

export default AdminSerieCard;