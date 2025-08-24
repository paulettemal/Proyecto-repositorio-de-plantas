# Backend - Repositorio de Plantas (Laravel API)

Este es el backend del proyecto Repositorio de Plantas desarrollado con Laravel que funciona como API REST.

## Instalación

1. Instalar dependencias de PHP:
```bash
composer install
```

2. Copiar el archivo de configuración:
```bash
copy .env.example .env
```

3. Generar la clave de aplicación:
```bash
php artisan key:generate
```

4. Configurar la base de datos en el archivo `.env`

5. Ejecutar las migraciones:
```bash
php artisan migrate
```

6. Ejecutar los seeders (opcional):
```bash
php artisan db:seed
```

## Ejecución

Para ejecutar el servidor de desarrollo:
```bash
php artisan serve
```

El servidor estará disponible en `http://localhost:8000`

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

## Configuración CORS

El backend está configurado para permitir peticiones desde `http://localhost:3000` donde corre el frontend.
