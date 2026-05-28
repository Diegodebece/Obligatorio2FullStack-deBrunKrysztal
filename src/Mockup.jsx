import "./App.css";
import "../resources/estilos.css";

function Mockup() {
  return (
    <div className="app">

      {/* LOGIN Y REGISTRO */}
      <section className="auth">
        <article className="auth-card">
          <h1>Series Tracker</h1>
          <h2>Login</h2>

          <form className="form">
            <label>Email</label>
            <input type="email" placeholder="emailUsuario" />

            <label>Contraseña</label>
            <input type="password" placeholder="passwordUsuario" />

            <button type="button">Ingresar</button>
          </form>
        </article>

        <article className="auth-card">
          <h2>Registro</h2>

          <form className="form">
            <label>Nombre de usuario</label>
            <input type="text" placeholder="usernameUsuario" />

            <label>Email</label>
            <input type="email" placeholder="emailUsuario" />

            <label>Contraseña</label>
            <input type="password" placeholder="passwordUsuario" />

            <label>Repetir contraseña</label>
            <input type="password" placeholder="repetirPassword" />

            <button type="button">Registrarme</button>
          </form>
        </article>
      </section>

      {/* PANEL VIEWER PLUS */}
      <header className="header">
        <div>
          <h1>Series Tracker</h1>
          <p>Panel principal - Viewer Plus</p>
        </div>

        <nav>
          <a href="#catalogo">Catálogo</a>
          <a href="#seguimientos">Mis seguimientos</a>
          <a href="#estadisticas">Estadísticas</a>
          <a href="#ia">IA</a>
          <a href="#api">API externa</a>
        </nav>

        <button>Cerrar sesión</button>
      </header>

      <main className="layout">
        <aside className="sidebar">
          <h2>nombreUsuario</h2>
          <p>emailUsuario</p>

          <span className="badge">viewer</span>
          <span className="badge">plus</span>

          <ul>
            <li>Resumen</li>
            <li>Catálogo de series</li>
            <li>Mis seguimientos</li>
            <li>Estadísticas</li>
            <li>Recomendaciones IA</li>
            <li>API externa</li>
          </ul>
        </aside>

        <section className="content">

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

          <section className="panel" id="estadisticas">
            <h2>Estadísticas</h2>

            <div className="grafico">
              <div style={{ height: "40%" }}></div>
              <div style={{ height: "70%" }}></div>
              <div style={{ height: "55%" }}></div>
            </div>
          </section>

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
        </section>
      </main>

      {/* PANEL ADMIN */}
      <header className="header admin-header">
        <div>
          <h1>Series Tracker</h1>
          <p>Panel de administración - Admin</p>
        </div>

        <nav>
          <a href="#admin-series">Series</a>
          <a href="#admin-categorias">Categorías</a>
          <a href="#admin-usuarios">Usuarios</a>
          <a href="#admin-seguimientos">Seguimientos</a>
        </nav>

        <button>Cerrar sesión</button>
      </header>

      <main className="layout admin-layout">
        <aside className="sidebar">
          <h2>nombreAdmin</h2>
          <p>emailAdmin</p>

          <span className="badge admin-badge">admin</span>

          <ul>
            <li>CRUD series</li>
            <li>CRUD categorías</li>
            <li>Gestión usuarios</li>
            <li>Seguimientos generales</li>
          </ul>
        </aside>

        <section className="content">

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

          <section className="panel" id="admin-categorias">
            <h2>CRUD de categorías</h2>

            <form className="form categoria-form">
              <label>Nombre</label>
              <input type="text" placeholder="nombreCategoria" />

              <label>Descripción</label>
              <input type="text" placeholder="descripcionCategoria" />

              <label>Estado</label>
              <select>
                <option>activa</option>
                <option>inactiva</option>
              </select>

              <button type="button">Guardar categoría</button>
            </form>

            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>nombreCategoria</td>
                  <td>descripcionCategoria</td>
                  <td>activa</td>
                  <td>
                    <button>Editar</button>
                    <button className="danger">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="panel" id="admin-usuarios">
            <h2>Gestión de usuarios</h2>

            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Plan</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>usernameUsuario</td>
                  <td>emailUsuario</td>
                  <td>viewer</td>
                  <td>plus</td>
                  <td>
                    <select>
                      <option>viewer</option>
                      <option>admin</option>
                    </select>
                    <button>Cambiar rol</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="panel" id="admin-seguimientos">
            <h2>Seguimientos generales</h2>

            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Serie</th>
                  <th>Estado</th>
                  <th>Favorita</th>
                  <th>Rating</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>usernameUsuario</td>
                  <td>nombreSerie</td>
                  <td>viendo</td>
                  <td>true</td>
                  <td>ratingPersonal</td>
                </tr>
              </tbody>
            </table>
          </section>

        </section>
      </main>
    </div>
  );
}

export default Mockup;