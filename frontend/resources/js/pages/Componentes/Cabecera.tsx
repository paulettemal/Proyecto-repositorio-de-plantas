import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { WelcomeProps } from '../Interfaces/Interface';

export default function Cabecera() {
    const [auth, setAuth] = useState<any>(null);
    
    useEffect(() => {
        // Aquí puedes obtener el usuario autenticado desde el localStorage o API
        const token = localStorage.getItem('token');
        if (token) {
            setAuth({ user: { name: 'Usuario' } }); // Placeholder
        }
    }, []);

    return (
        <div className="relative z-10">
            <header className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex justify-end ">
                    <nav className="flex items-center gap-4 ">
                        <Link to="/" className=" text-[14px] inline-flex items-center px-4 md:px-2 sm:px-1 py-2 font-medium text-white hover:text-green-900 dark:hover:text-green-100">
                            Nosotros
                        </Link>
                        <Link to="/explora" className=" text-[14px] inline-flex items-center px-4 md:px-2 sm:px-1 py-2 font-medium text-white hover:text-green-900 dark:hover:text-green-100">
                            Explora
                        </Link>
                        <Link to="/favoritos" className="text-[14px] inline-flex items-center px-4 md:px-2 sm:px-1 py-2 font-medium text-white hover:text-green-900 dark:hover:text-green-100">
                            Favoritos
                        </Link>
                        {auth?.user ? (
                            <Link to="/plantas" className="text-[14px] inline-flex items-center px-4 md:px-2 sm:px-1 py-2 font-medium text-white hover:text-green-900 dark:hover:text-green-100">
                                Dashboard
                            </Link>
                        ) : (
                            <Link to="/login" className="text-[14px] inline-flex items-center px-4 md:px-2 sm:px-1 py-2 font-medium text-white hover:text-green-900 dark:hover:text-green-100">
                                Iniciar sesión
                            </Link>
                        )}
                    </nav>
                </div>
            </header>
        </div>
    );
}