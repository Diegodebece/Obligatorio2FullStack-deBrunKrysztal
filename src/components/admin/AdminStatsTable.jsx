const AdminStatsTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Serie</th>
          <th>Usuarios viendo</th>
          <th>Usuarios pendiente</th>
          <th>Usuarios terminada</th>
          <th>Favoritas</th>
          <th>Rating promedio</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>nombreSerie</td>
          <td>cantidadUsuariosViendo</td>
          <td>cantidadUsuariosPendiente</td>
          <td>cantidadUsuariosTerminada</td>
          <td>cantidadFavoritas</td>
          <td>ratingPromedioSerie</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AdminStatsTable;