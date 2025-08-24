import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { plantaService } from '@/services/api';
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
import PlantasLayout from '@/components/PlantasLayout';

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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Cargando plantas...</div>
            </div>
        );
    }

    return (
        <PlantasLayout title="Plantas" showCreateButton={true}>
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
        </PlantasLayout>
    );
}