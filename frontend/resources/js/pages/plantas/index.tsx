import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { plantaService, authService } from '@/services/api';
import { Planta } from '../Interfaces/Interface';
import Eliminar from './eliminar';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';

export default function Index() {
    const navigate = useNavigate();
    const [plantas, setPlantas] = useState<Planta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState<Planta | null>(null);
    const [processing, setProcessing] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    useEffect(() => {
        fetchPlantas();
    }, []);

    // Cerrar menú del usuario cuando se haga clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuOpen) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userMenuOpen]);

    const fetchPlantas = async () => {
        try {
            setLoading(true);
            const response = await plantaService.getAll();
            
            // La API ahora devuelve {success: true, data: [...]}
            if (response.data.success && Array.isArray(response.data.data)) {
                setPlantas(response.data.data);
            } else {
                console.error('Formato de respuesta inesperado:', response.data);
                setPlantas([]);
            }
        } catch (error) {
            setError('Error al cargar las plantas');
            console.error('Error fetching plantas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (plant: Planta) => {
        setSelectedPlant(plant);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedPlant) {
            try {
                setProcessing(true);
                await plantaService.delete(selectedPlant.id);
                setPlantas(plantas.filter(planta => planta.id !== selectedPlant.id));
                setDeleteModalOpen(false);
                setSelectedPlant(null);
            } catch (error) {
                alert('Error al eliminar la planta');
                console.error('Error deleting planta:', error);
            } finally {
                setProcessing(false);
            }
        }
    };

    const handleCloseModal = () => {
        setDeleteModalOpen(false);
        setSelectedPlant(null);
    };

    const handleLogout = async () => {
        try {
            setProcessing(true);
            await authService.logout();
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Aún así, limpiar el token y redirigir
            localStorage.removeItem('token');
            navigate('/');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Cargando plantas...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex">
            <Helmet>
                <title>Plantas</title>
            </Helmet>
            
            <Eliminar 
                isOpen={deleteModalOpen} 
                onClose={handleCloseModal}  
                onConfirm={handleConfirmDelete} 
                plantaNombre={selectedPlant?.nombreComun || ''} 
                loading={processing} 
            />

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
                        <div className="absolute bottom-full left-6 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                            <div className="p-3">
                                <button
                                    onClick={handleLogout}
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
                        <h2 className="text-2xl font-bold text-gray-900">Plantas</h2>
                    </div>
                    
                    <Link to="/plantas/create">
                        <Button className="rounded-2xl p-4 w-40 bg-emerald-900 text-white hover:bg-emerald-800 transition-colors">
                            Crear planta
                        </Button>
                    </Link>
                </div>
                
                {plantas.length > 0 ? (
                    <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow className='bg-emerald-50 border-b border-gray-200'>
                                    <TableHead className="w-20 font-bold text-gray-900 py-4">Id</TableHead>
                                    <TableHead className="min-w-[150px] font-bold text-gray-900 py-4">Nombre común</TableHead>
                                    <TableHead className="min-w-[150px] font-bold text-gray-900 py-4">Nombre científico</TableHead>
                                    <TableHead className="min-w-[200px] font-bold text-gray-900 py-4">Descripción</TableHead>
                                    <TableHead className="min-w-[150px] font-bold text-gray-900 py-4">Distribución</TableHead>
                                    <TableHead className="min-w-[200px] font-bold text-gray-900 py-4">Propiedades</TableHead>
                                    <TableHead className="min-w-[200px] font-bold text-gray-900 py-4">Principios activos</TableHead>
                                    <TableHead className="min-w-[150px] font-bold text-gray-900 py-4">Imagen</TableHead>
                                    <TableHead className="min-w-[200px] font-bold text-gray-900 py-4">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {plantas.map((plant: Planta, index: number) => (
                                    <TableRow key={plant.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                                        <TableCell className="font-medium text-gray-900 py-4">{plant.id}</TableCell>
                                        <TableCell className="truncate max-w-[150px] text-gray-700 py-4">{plant.nombreComun}</TableCell>
                                        <TableCell className="truncate max-w-[150px] text-gray-700 py-4">{plant.nombreCientifico}</TableCell>
                                        <TableCell className="truncate max-w-[200px] text-gray-700 py-4">{plant.descripcion}</TableCell>
                                        <TableCell className="truncate max-w-[150px] text-gray-700 py-4">{plant.distribucion}</TableCell>
                                        <TableCell className="truncate max-w-[200px] text-gray-700 py-4">{plant.propiedades}</TableCell>
                                        <TableCell className="truncate max-w-[200px] text-gray-700 py-4">{plant.principiosActivos}</TableCell>
                                        <TableCell className="py-4">
                                            {plant.url ? (
                                                <a href={plant.url} target="_blank" rel="noopener noreferrer">
                                                    <img 
                                                        src={plant.url || '/placeholder-plant.jpg'} 
                                                        alt={plant.nombreComun} 
                                                        className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity" 
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/placeholder-plant.jpg';
                                                        }}
                                                    />
                                                </a>
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                                                    <span className="text-xs text-gray-500">Sin imagen</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="space-x-2 py-4">
                                            <Link to={`/plantas/${plant.id}/edit`}>
                                                <Button className="rounded-2xl p-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                                                    Editar
                                                </Button>
                                            </Link>
                                            <Button disabled={processing} onClick={() => handleDeleteClick(plant)} className="rounded-2xl p-2 bg-red-600 text-white hover:bg-red-700 transition-colors">
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600 text-lg">No hay plantas registradas.</p>
                        <Link to="/plantas/create">
                            <Button className="mt-4 bg-emerald-900 text-white hover:bg-emerald-800 transition-colors">
                                Crear primera planta
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}