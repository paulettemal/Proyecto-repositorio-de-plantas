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

    useEffect(() => {
        fetchPlantas();
    }, []);

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
        <div className="min-h-screen bg-gray-50">
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

            <div className="m-4 overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                    <Link to="/plantas/create">
                        <Button className="rounded-2xl p-4 w-40 bg-emerald-900 text-amber-50">
                            Crear planta
                        </Button>
                    </Link>
                    
                    <Button 
                        onClick={handleLogout} 
                        className="rounded-2xl p-4 bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                        Cerrar Sesión
                    </Button>
                </div>
                
                {plantas.length > 0 ? (
                    <div className="w-full overflow-hidden rounded-lg border shadow">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow className='bg-emerald-100'>
                                    <TableHead className="w-20 font-extrabold">Id</TableHead>
                                    <TableHead className="min-w-[150px] font-extrabold">Nombre común</TableHead>
                                    <TableHead className="min-w-[150px] font-extrabold">Nombre científico</TableHead>
                                    <TableHead className="min-w-[200px] font-extrabold">Descripción</TableHead>
                                    <TableHead className="min-w-[150px] font-extrabold">Distribución</TableHead>
                                    <TableHead className="min-w-[200px] font-extrabold">Propiedades</TableHead>
                                    <TableHead className="min-w-[200px] font-extrabold">Principios activos</TableHead>
                                    <TableHead className="min-w-[150px] font-extrabold">Imagen</TableHead>
                                    <TableHead className="min-w-[200px] font-extrabold">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {plantas.map((plant: Planta) => (
                                    <TableRow key={plant.id}>
                                        <TableCell className="font-medium">{plant.id}</TableCell>
                                        <TableCell className="truncate max-w-[150px]">{plant.nombreComun}</TableCell>
                                        <TableCell className="truncate max-w-[150px]">{plant.nombreCientifico}</TableCell>
                                        <TableCell className="truncate max-w-[200px]">{plant.descripcion}</TableCell>
                                        <TableCell className="truncate max-w-[150px]">{plant.distribucion}</TableCell>
                                        <TableCell className="truncate max-w-[200px]">{plant.propiedades}</TableCell>
                                        <TableCell className="truncate max-w-[200px]">{plant.principiosActivos}</TableCell>
                                        <TableCell>
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
                                        <TableCell className="space-x-2">
                                            <Link to={`/plantas/${plant.id}/edit`}>
                                                <Button className="rounded-2xl p-2 bg-black text-amber-50">
                                                    Editar
                                                </Button>
                                            </Link>
                                            <Button disabled={processing} onClick={() => handleDeleteClick(plant)} className="rounded-2xl p-2 bg-red-600 text-amber-50">
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
                        <p className="text-gray-500">No hay plantas registradas.</p>
                        <Link to="/plantas/create">
                            <Button className="mt-4 bg-emerald-900 text-amber-50">
                                Crear primera planta
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}