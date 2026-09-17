# Series Tracker Frontend

Frontend desarrollado para una aplicación web full-stack que permite a los usuarios descubrir, seguir y gestionar series de TV.

La aplicación consume una API REST externa para manejar autenticación, usuarios, series, categorías, seguimientos, estadísticas y recomendaciones. Incluye vistas diferenciadas para usuarios viewer y administradores.

## Funcionalidades

- Registro e inicio de sesión de usuarios
- Autenticación mediante JWT
- Rutas protegidas según sesión activa
- Panel de usuario viewer
- Catálogo de series
- Seguimiento de series por usuario
- Gestión de progreso de visualización
- Calificaciones de series
- Estadísticas personales
- Recomendaciones y tendencias
- Panel de administración
- Gestión de series
- Gestión de categorías
- Gestión de usuarios
- Visualización de estadísticas administrativas
- Validación de formularios
- Notificaciones visuales para acciones y errores

## Tecnologías

- React
- Vite
- Redux Toolkit
- React Redux
- React Router
- Axios
- React Hook Form
- Joi
- JWT Decode
- React Toastify
- Chart.js
- React Chart.js 2
- React Modal
- React DayPicker

## Arquitectura

El proyecto sigue una estructura modular, separando páginas, componentes, estado global, validaciones y comunicación con la API.

```text
src/
├── api/
├── app/
│   └── guards/
├── components/
│   ├── admin/
│   ├── common/
│   ├── login/
│   ├── logout/
│   ├── register/
│   └── viewer/
├── features/
├── pages/
├── store/
├── styles/
├── validators/
└── ...
