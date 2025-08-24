import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { plantaService } from '@/services/api';
import { Planta } from '../Interfaces/Interface';

export default function PlantasList() {
    const [plantas, setPlantas] = useState<Planta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchPlantas();
    }, []);

    const fetchPlantas = async () => {
        try {
            setLoading(true);
            const response = await plantaService.getAll();
            setPlantas(response.data.data || response.data);
        } catch (error) {
            setError('Error al cargar las plantas');
            console.error('Error fetching plantas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta planta?')) {
            return;
        }

        try {
            await plantaService.delete(id);
            setPlantas(plantas.filter(planta => planta.id !== id));
        } catch (error) {
            alert('Error al eliminar la planta');
            console.error('Error deleting planta:', error);
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
                <title>Gestión de Plantas - Repositorio de Plantas</title>
            </Helmet>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Gestión de Plantas</h1>
                        <Link
                            to="/plantas/create"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Nueva Planta
                        </Link>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        {plantas.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-gray-500">No hay plantas registradas</div>
                                <Link
                                    to="/plantas/create"
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                >
                                    Agregar primera planta
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nombre Científico
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Familia
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Región
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {plantas.map((planta) => (
                                            <tr key={planta.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {planta.nombre_comun}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {planta.nombre_cientifico}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {planta.familia}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {planta.region}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => {/* Ver detalles */}}
                                                            className="text-blue-600 hover:text-blue-900"
                                                            title="Ver detalles"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                        <Link
                                                            to={`/plantas/${planta.id}/edit`}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                            title="Editar"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(planta.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                            title="Eliminar"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}