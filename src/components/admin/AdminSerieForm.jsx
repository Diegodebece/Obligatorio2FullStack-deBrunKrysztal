const AdminSerieForm = () => {
  return (
    <form className="form admin-form">
      <label htmlFor="serie-titulo">Título</label>
      <input id="serie-titulo" type="text" placeholder="nombreSerie" />

      <label htmlFor="serie-descripcion">Descripción</label>
      <textarea id="serie-descripcion" placeholder="descripcionSerie"></textarea>

      <label htmlFor="serie-plataforma">Plataforma</label>
      <input id="serie-plataforma" type="text" placeholder="plataformaSerie" />

      <label htmlFor="serie-categoria">Categoría</label>
      <select id="serie-categoria">
        <option>categoriaSerie</option>
      </select>

      <label htmlFor="serie-temporadas">Cantidad de temporadas</label>
      <input id="serie-temporadas" type="number" placeholder="cantidadTemporadas" />

      <label htmlFor="serie-episodios">Episodios por temporada</label>
      <input id="serie-episodios" type="number" placeholder="episodiosPorTemporada" />

      <label htmlFor="serie-minutos">Minutos por episodio</label>
      <input id="serie-minutos" type="number" placeholder="minutosPorEpisodio" />

      <label htmlFor="serie-imagen">Imagen</label>
      <input id="serie-imagen" type="file" accept="image/*" />

      <button type="button">Guardar serie</button>
    </form>
  );
};

export default AdminSerieForm;