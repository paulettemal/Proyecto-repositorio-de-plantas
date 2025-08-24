# Frontend - Repositorio de Plantas (React)

Este es el frontend del proyecto Repositorio de Plantas desarrollado con React + TypeScript + Vite.

## Instalación

1. Instalar dependencias de Node.js:
```bash
npm install
```

## Ejecución

Para ejecutar el servidor de desarrollo:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Scripts disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run lint` - Ejecutar ESLint
- `npm run format` - Formatear código con Prettier

## Configuración

El frontend está configurado para conectarse al backend Laravel que debe estar ejecutándose en `http://localhost:8000`.

### Configuración de Axios

El archivo `resources/js/services/api.ts` contiene la configuración de axios para comunicarse con el backend:

- Base URL: `http://localhost:8000/api`
- Manejo automático de tokens de autenticación
- Interceptores para manejo de errores

## Estructura del proyecto

- `resources/js/pages/` - Páginas de la aplicación
- `resources/js/components/` - Componentes reutilizables
- `resources/js/services/` - Servicios para comunicación con API
- `resources/css/` - Estilos CSS y Tailwind

## Dependencias principales

- React 19
- TypeScript
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Radix UI Components
