import { Helmet } from 'react-helmet-async';
import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, LoaderCircle } from 'lucide-react';
import { authService } from '@/services/api';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        if (formData.password !== formData.password_confirmation) {
            setErrors({ password_confirmation: 'Las contraseñas no coinciden' });
            setProcessing(false);
            return;
        }

        try {
            const response = await authService.register(formData);
            setStatus('Registro exitoso. Ahora puedes iniciar sesión.');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error: any) {
            setErrors(error.response?.data?.errors || { general: 'Error al registrarse' });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Helmet>
                <title>Registro - Repositorio de Plantas</title>
            </Helmet>

            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="mx-auto h-12 w-12 flex items-center justify-center">
                        <Leaf className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Crear cuenta
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Únete al repositorio de plantas medicinales
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
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre completo
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="Tu nombre completo"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

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

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Confirmar contraseña
                            </label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                required
                                value={formData.password_confirmation}
                                onChange={(e) => setFormData(prev => ({ ...prev, password_confirmation: e.target.value }))}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="Confirma tu contraseña"
                            />
                            {errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                            )}
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
                            {processing ? 'Registrando...' : 'Crear cuenta'}
                        </button>
                    </div>

                    <div className="text-center space-y-2">
                        <Link 
                            to="/login" 
                            className="text-green-600 hover:text-green-500 text-sm"
                        >
                            ¿Ya tienes cuenta? Inicia sesión aquí
                        </Link>
                        <br />
                        <Link 
                            to="/" 
                            className="text-gray-600 hover:text-gray-500 text-sm"
                        >
                            ← Volver al inicio
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}