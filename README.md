# Sanos y Salvos - Comunidad de Mascotas

**Sanos y Salvos** es una plataforma moderna diseñada para ayudar a las familias a reencontrarse con sus mascotas perdidas. Combinamos la vigilancia comunitaria con herramientas de geolocalización avanzadas para asegurar que ninguna mascota esté lejos de casa por mucho tiempo.

## 🚀 Características Principales

-   **Reportes de Extravío Precisos**: Formulario detallado con carga de múltiples fotos, descripción de rasgos médicos y selección de ubicación exacta mediante un mapa interactivo.
-   **Mapa de Avistamientos**: Visualización en tiempo real de mascotas perdidas y avistadas en tu zona mediante integración con Leaflet y OpenStreetMap.
-   **Sistema de Notificaciones**: Mantente informado sobre posibles avistamientos, comentarios en tus reportes o actualizaciones de la comunidad.
-   **Historias de Éxito**: Un espacio para compartir los reencuentros que motivan a la comunidad a seguir ayudando.
-   **Diseño Premium y Responsivo**: Interfaz sofisticada (paleta de colores "Sandstone") adaptada a dispositivos móviles y escritorio.
-   **Seguridad**: Perfiles de usuario protegidos para gestionar tus propios reportes y alertas.

## 🛠️ Tecnologías Utilizadas

-   **Frontend**: React 18+ con TypeScript.
-   **Estilos**: Tailwind CSS 4.0.
-   **Mapas**: Leaflet con React-Leaflet.
-   **Animaciones**: Framer Motion (motion/react).
-   **Iconos**: Lucide React.
-   **Build Tool**: Vite.

## 🏃 Cómo Ejecutar el Proyecto

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```
2.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
3.  **Abrir en el navegador**:
    Visita `http://localhost:3000`

## 📁 Estructura del Proyecto

```text
/src
  /components     # Componentes reutilizables (Navbar, Footer, NotificationMenu, etc.)
  /views          # Vistas principales de la aplicación (Home, Report, Map, Auth, etc.)
  /lib            # Utilidades generales
  /constants      # Constantes globales e imágenes
  App.tsx         # Componente raíz y manejo de rutas/vistas
  index.css       # Estilos globales y configuración del tema
/public           # Activos públicos estáticos
ENDPOINTS.md      # Documentación detallada de la API (Simulada)
```

## 🔐 Credenciales de Prueba

Para probar el flujo de usuario sin registrarte, puedes usar:
- **Usuario**: `admin@test.com`
- **Contraseña**: `password123`

---
*Desarrollado con ❤️ para ayudar a nuestros amigos de cuatro patas.*
