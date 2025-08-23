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
- PHP (v8.1 o superior)
- Composer
- SQLite

### Configuración del Backend

1. Clona el repositorio

```bash
git clone https://github.com/paulettemal/Proyecto-repositorio-de-plantas.git
cd Proyecto-repositorio-de-plantas
```

2. Instala las dependencias

```bash
composer install
npm i
```

3. Configura las variables de entorno

```bash
cp .env.example .env
php artisan key:generate
```

4. Inicia el servidor de desarrollo

```bash
php artisan serve
```

5. Inicia el servidor de desarrollo

```bash
npm run dev
```

## Uso

### Para Usuarios

- **Explorar catálogo**: Navega por las plantas en la página principal
- **Buscar plantas**: Utiliza los filtros por nombre o propiedades
- **Ver detalles**: Haz clic en cualquier planta para información completa
- **Favoritos**: Guarda plantas de interés para acceso rápido

## Equipo de Desarrollo

- **Isaac Criollo** - Frontend (Catálogo) & Backend (CRUD - create)
- **Joel Guamaní** - Filtros & Backend (CRUD - edit)
- **Paulette Maldonado** - Detalles de especie & Backend (CRUD - delete)
