import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/services/api';

interface PlantasLayoutProps {
    children: React.ReactNode;
    title: string;
    showCreateButton?: boolean;
}

export default function PlantasLayout({ children, title, showCreateButton = false }: PlantasLayoutProps) {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // Cerrar menú del usuario cuando se haga clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Verificar si el clic fue en el menú del usuario o en sus elementos
            const target = event.target as Element;
            const userMenu = document.querySelector('[data-user-menu]');
            const userMenuButton = document.querySelector('[data-user-menu-button]');
            
            if (userMenuOpen && 
                userMenu && 
                !userMenu.contains(target) && 
                userMenuButton && 
                !userMenuButton.contains(target)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userMenuOpen]);

    const handleLogout = async () => {
        console.log('Iniciando logout...');
        try {
            setProcessing(true);
            console.log('Llamando a authService.logout()...');
            await authService.logout();
            console.log('Logout exitoso, limpiando token...');
            localStorage.removeItem('token');
            console.log('Redirigiendo a /welcome...');
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Aún así, limpiar el token y redirigir
            localStorage.removeItem('token');
            console.log('Redirigiendo a /welcome después del error...');
            navigate('/');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Panel izquierdo verde */}
            <div className="w-64 bg-emerald-600 text-white flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white">Platform</h1>
                </div>
                
                {/* Navegación activa */}
                <div className="px-6 py-3">
                    <div className="bg-white rounded-lg shadow-sm p-3 flex items-center space-x-3">
                        <div className="w-5 h-5 bg-emerald-600 rounded"></div>
                        <span className="text-black font-medium">Plantas</span>
                    </div>
                </div>
                
                {/* Espacio flexible para empujar el usuario hacia abajo */}
                <div className="flex-1"></div>
                
                {/* Panel del usuario */}
                <div className="p-6 relative">
                    <div 
                        data-user-menu-button
                        className="flex items-center space-x-3 cursor-pointer hover:bg-emerald-700 rounded-lg p-2 transition-colors"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <span className="text-emerald-600 font-bold text-sm">A</span>
                        </div>
                        <span className="text-white">Administrador</span>
                        <svg className={`w-4 h-4 text-white transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    
                    {/* Menú desplegable del usuario */}
                    {userMenuOpen && (
                        <div data-user-menu className="absolute bottom-full left-6 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                            <div className="p-3">
                                <button
                                    onClick={(e) => {
                                        console.log('Botón de logout clickeado!');
                                        e.stopPropagation();
                                        handleLogout();
                                    }}
                                    disabled={processing}
                                    className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Cerrar Sesión</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-emerald-600 rounded"></div>
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    </div>
                    
                    {showCreateButton && (
                        <Link to="/plantas/create">
                            <button className="rounded-2xl p-4 w-40 bg-emerald-900 text-white hover:bg-emerald-800 transition-colors">
                                Crear planta
                            </button>
                        </Link>
                    )}
                </div>
                
                {children}
            </div>
        </div>
    );
}
