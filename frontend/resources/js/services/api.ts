import axios from 'axios';

// Configuración base de axios
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Para cookies de sesión/CSRF
});

// Interceptor para agregar token de autenticación si existe
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas de error
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Servicios para las plantas
export const plantaService = {
    getAll: () => api.get('/plantas'),
    getById: (id: number) => api.get(`/plantas/${id}`),
    create: (data: any) => api.post('/plantas', data),
    update: (id: number, data: any) => api.put(`/plantas/${id}`, data),
    delete: (id: number) => api.delete(`/plantas/${id}`),
};

// Servicios para autenticación
export const authService = {
    login: (credentials: { email: string; password: string }) => 
        api.post('/login', credentials),
    register: (data: { name: string; email: string; password: string; password_confirmation: string }) =>
        api.post('/register', data),
    logout: () => api.post('/logout'),
    user: () => api.get('/user'),
};

export default api;
