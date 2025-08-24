# 🌿 Kawsay Sacha

### Redescubre la sabiduría ancestral en cada planta ecuatoriana

## Descripción

**Kawsay Sacha** es una plataforma web dedicada a documentar, preservar y difundir el conocimiento ancestral sobre plantas medicinales ecuatorianas. Nuestro objetivo es crear un puente entre la sabiduría tradicional y las nuevas generaciones, promoviendo el uso responsable y sostenible de la medicina natural.

La plataforma ofrece un catálogo digital interactivo que permite a los usuarios explorar plantas medicinales nativas de Ecuador, conocer sus propiedades, usos tradicionales y contribuir a la conservación de este valioso patrimonio cultural.

## Características

- **Búsqueda inteligente**: Encuentra plantas por nombre común, científico o propiedades medicinales
- **Diseño responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Sistema de favoritos**: Guarda plantas de interés para consultas futuras
- **Información detallada**: Datos botánicos, distribución, usos tradicionales y principios activos
- **Galería visual**: Imágenes de alta calidad para facilitar la identificación
- **Enfoque sostenible**: Promoviendo la conservación y el cultivo responsable
- **Rendimiento optimizado**: Experiencia de usuario fluida y tiempos de carga rápidos

## Tecnologías Utilizadas

### Frontend

- **React.js** con TypeScript
- **Tailwind CSS** para estilos
- **React Router** para navegación

### Backend

- **Laravel 10** (PHP)
- **SQLite** como base de datos
- **API REST** para comunicación

### Herramientas de Desarrollo

- **Git** para control de versiones
- **Postman** para testing de API

## Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- PHP (v8.2 o superior)
- Composer
- SQLite

### Configuración del Backend (Laravel API)

1. Navega al directorio backend

```bash
cd backend
```

2. Instala las dependencias de PHP

```bash
composer install
```

3. Configura las variables de entorno

```bash
cp .env.example .env
php artisan key:generate
```

4. Ejecuta las migraciones y seeders

```bash
php artisan migrate
php artisan db:seed --class=PlantaSeeder
```

5. Inicia el servidor de desarrollo

```bash
php artisan serve
```

El backend estará disponible en `http://localhost:8000`

### Configuración del Frontend (React)

1. Navega al directorio frontend

```bash
cd frontend
```

2. Instala las dependencias de Node.js

```bash
npm install
```

3. Inicia la aplicación de desarrollo

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
Proyecto-repositorio-de-plantas/
├── backend/                 # Laravel API
│   ├── app/                # Controladores y modelos
│   ├── routes/             # Rutas de la API
│   ├── database/           # Migraciones y seeders
│   └── config/             # Configuración de Laravel
├── frontend/               # React Application
│   ├── resources/js/       # Componentes React
│   ├── resources/css/      # Estilos CSS
│   └── services/           # Servicios de API
└── README.md               # Este archivo
```


## API Endpoints

### Autenticación
- `POST /api/register` - Registro de usuario
- `POST /api/login` - Inicio de sesión
- `POST /api/logout` - Cerrar sesión (requiere autenticación)
- `GET /api/user` - Obtener usuario actual (requiere autenticación)

### Plantas
- `GET /api/plantas` - Listar todas las plantas
- `GET /api/plantas/{id}` - Obtener una planta específica
- `POST /api/plantas` - Crear nueva planta (requiere autenticación)
- `PUT /api/plantas/{id}` - Actualizar planta (requiere autenticación)
- `DELETE /api/plantas/{id}` - Eliminar planta (requiere autenticación)

## Uso

### Para usuarios

- **Explorar catálogo**: Navega por las plantas en la página principal
- **Buscar plantas**: Utiliza los filtros por nombre o propiedades
- **Ver detalles**: Haz clic en cualquier planta para información completa
- **Favoritos**: Guarda plantas de interés para acceso rápido
- **Gestión de plantas**: Crear, editar y eliminar plantas (usuarios autenticados)

### Usuario de Prueba
- **Email**: `test@example.com`
- **Password**: `password123`

## Solución de Problemas

### Problema: Login no redirige a plantas.index

**Síntomas:**
- El login es exitoso pero no redirige a la página de plantas
- Se queda en la página de login

**Solución:**
1. Verifica que ambos servidores estén corriendo:
   - Backend: `http://localhost:8000`
   - Frontend: `http://localhost:3000`

2. Abre la consola del navegador (F12) y revisa los logs durante el login

3. Verifica que el token se esté guardando en localStorage

4. Si persiste el problema, usa el archivo `test_api.html` para probar la API directamente

### Problema: Error "plantas.map is not a function"

**Síntomas:**
- Error en la consola: `plantas.map is not a function`
- La página de plantas no carga correctamente

**Causa:**
- Conflicto de rutas entre `web.php` y `api.php`
- La API estaba devolviendo formato incorrecto

**Solución Aplicada:**
- ✅ Eliminada ruta duplicada en `web.php`
- ✅ API ahora devuelve formato correcto: `{"success": true, "data": [...]}`
- ✅ Frontend actualizado para manejar el formato correcto

### Mejoras Implementadas en la Vista de Plantas

**Nuevas Características:**
- ✅ Tabla mejorada con diseño profesional usando componentes UI
- ✅ Modal de confirmación para eliminación de plantas
- ✅ Manejo de imágenes con fallback para URLs inválidas
- ✅ Botones de acción estilizados (Editar/Eliminar)
- ✅ Diseño responsivo con scroll horizontal
- ✅ Colores y estilos consistentes con el tema del proyecto

**Componentes Agregados:**
- `Eliminar.tsx` - Modal de confirmación para eliminación
- `create.tsx` - Formulario para crear nuevas plantas
- `edit.tsx` - Formulario para editar plantas existentes
- Componentes UI de tabla, botones, inputs y textareas
- Manejo mejorado de estados y errores

**Formularios Funcionales:**
- ✅ **Crear Planta**: Formulario completo con validación y envío a API
- ✅ **Editar Planta**: Carga datos existentes y permite modificación
- ✅ **Validación en tiempo real**: Errores se limpian al escribir
- ✅ **Manejo de estados**: Loading, processing y error states
- ✅ **Navegación**: Redirección automática después de operaciones exitosas

**Funcionalidades de Usuario:**
- ✅ **Cerrar Sesión**: Botón de logout en la página de plantas
- ✅ **Limpieza de Token**: Elimina token del localStorage al cerrar sesión
- ✅ **Redirección Segura**: Vuelve a la página de inicio (welcome) después del logout
- ✅ **Manejo de Errores**: Continúa con el logout incluso si la API falla
- ✅ **Navegación de Regreso**: Botones para volver al inicio desde login y registro
- ✅ **Panel de Usuario**: Panel izquierdo verde con menú desplegable para cerrar sesión
- ✅ **Diseño Mejorado**: Fondo blanco con mejor legibilidad y colores optimizados
- ✅ **Layout Compartido**: Panel izquierdo consistente en todas las páginas de plantas
- ✅ **Legibilidad de Formularios**: Texto negro en campos de entrada con fondo blanco

**Páginas Funcionales:**
- ✅ **Plantas (CRUD)**: Gestión completa de plantas con tabla profesional
- ✅ **Explora**: Catálogo público de plantas con búsqueda y filtros
- ✅ **Crear/Editar**: Formularios funcionales para gestión de plantas
- ✅ **Login/Logout**: Autenticación completa con redirección automática

### Archivo de Prueba
Se incluye `test_api.html` para probar la API directamente desde el navegador sin el frontend React.

## Equipo de Desarrollo

- **Isaac Criollo** - Frontend (Catálogo) & Backend (CRUD - create)
- **Joel Guamaní** - Filtros & Backend (CRUD - edit)
- **Paulette Maldonado** - Detalles de especie & Backend (CRUD - delete)
