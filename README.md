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

## 🚀 Instalación y Configuración

### 📋 Prerrequisitos

- **Node.js**: v18 o superior
- **PHP**: v8.2 o superior
- **Composer**: Para dependencias de PHP
- **SQLite**: Base de datos incluida
- **Git**: Para clonar el repositorio

### 🔧 Configuración del Backend (Laravel API)

#### **Paso 1: Clonar y Navegar**
```bash
git clone <tu-repositorio>
cd Proyecto-repositorio-de-plantas/backend
```

#### **Paso 2: Instalar Dependencias**
```bash
composer install
```

#### **Paso 3: Configurar Variables de Entorno**
```bash
cp .env.example .env
php artisan key:generate
```

#### **Paso 5: Iniciar Servidor Backend**
```bash
php artisan serve
```

**✅ Backend funcionando en:** `http://localhost:8000`

### ⚛️ Configuración del Frontend (React)

#### **Paso 1: Navegar al Directorio Frontend**
```bash
cd ../frontend
```

#### **Paso 2: Instalar Dependencias**
```bash
npm install
```

#### **Paso 3: Iniciar Aplicación de Desarrollo**
```bash
npm run dev
```

**✅ Frontend funcionando en:** `http://localhost:3000`

### 🔐 Usuario de Prueba

Para probar la aplicación completa:

- **Email**: `test@example.com`
- **Password**: `password123`

### 📱 Acceso a la Aplicación

1. **Abrir navegador** en `http://localhost:3000`
2. **Hacer login** con las credenciales de prueba
3. **Navegar** a la sección de Plantas
4. **Explorar** las funcionalidades CRUD

## 📁 Estructura del Proyecto

```
Proyecto-repositorio-de-plantas/
├── backend/                    # Laravel API
│   ├── app/                   # Controladores y modelos
│   │   ├── Http/Controllers/  # Controladores de la API
│   │   ├── Models/            # Modelos Eloquent
│   │   └── Policies/          # Políticas de autorización
│   ├── routes/                # Rutas de la API
│   ├── database/              # Migraciones y seeders
│   ├── config/                # Configuración de Laravel
│   └── bootstrap/             # Bootstrap de la aplicación
├── frontend/                  # React Application
│   ├── resources/js/          # Componentes React
│   │   ├── components/        # Componentes UI reutilizables
│   │   ├── pages/             # Páginas de la aplicación
│   │   ├── services/          # Servicios de API
│   │   └── types/             # Definiciones de TypeScript
│   ├── resources/css/         # Estilos CSS
│   └── public/                # Archivos públicos
├── composer.json              # Dependencias PHP
├── package.json               # Dependencias Node.js
└── README.md                  # Este archivo
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


### **Testing de la API**
```bash
# Probar endpoints de autenticación
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test2@example.com","password":"password123","password_confirmation":"password123"}'

# Probar login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Probar endpoint de plantas (público)
curl http://localhost:8000/api/plantas

# Probar endpoint protegido (con token)
curl -H "Authorization: Bearer TU_TOKEN_AQUI" \
  http://localhost:8000/api/user
```

## 📚 Recursos Adicionales

### **Documentación Oficial**
- [Laravel 10.x](https://laravel.com/docs/10.x)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### **Herramientas de Desarrollo**
- **Postman**: Testing de API
- **Laravel Telescope**: Debugging de Laravel
- **React Developer Tools**: Debugging de React
- **Vite DevTools**: Debugging de Vite

## 👥 Equipo de Desarrollo

- **Isaac Criollo** - Frontend (Catálogo) & Backend (CRUD - create)
- **Joel Guamaní** - Filtros & Backend (CRUD - edit)
- **Paulette Maldonado** - Detalles de especie & Backend (CRUD - delete)

