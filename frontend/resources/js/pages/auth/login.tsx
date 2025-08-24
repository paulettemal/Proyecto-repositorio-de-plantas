import { Helmet } from 'react-helmet-async';
import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, LoaderCircle } from 'lucide-react';
import { authService } from '@/services/api';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            const response = await authService.login({
                email: formData.email,
                password: formData.password,
            });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setStatus('Login exitoso');
                navigate('/');
            }
        } catch (error: any) {
            setErrors(error.response?.data?.errors || { general: 'Error al iniciar sesión' });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Helmet>
                <title>Iniciar Sesión - Repositorio de Plantas</title>
            </Helmet>

            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="mx-auto h-12 w-12 flex items-center justify-center">
                        <Leaf className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Iniciar sesión
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Accede a tu cuenta del repositorio de plantas
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {status && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {status}
                        </div>
                    )}

                    {errors.general && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {errors.general}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="tu@email.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="Tu contraseña"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                checked={formData.remember}
                                onChange={(e) => setFormData(prev => ({ ...prev, remember: e.target.checked }))}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                Recordarme
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                            ) : null}
                            {processing ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </button>
                    </div>

                    <div className="text-center space-y-2">
                        <Link 
                            to="/register" 
                            className="text-green-600 hover:text-green-500 text-sm"
                        >
                            ¿No tienes cuenta? Regístrate aquí
                        </Link>
                        <br />
                        <Link 
                            to="/forgot-password" 
                            className="text-green-600 hover:text-green-500 text-sm"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}