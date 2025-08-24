import { useState, useEffect, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { plantaService } from '@/services/api';

export default function EditPlanta() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState({
        nombre_comun: '',
        nombre_cientifico: '',
        familia: '',
        descripcion: '',
        usos_medicinales: '',
        preparacion: '',
        region: '',
        precauciones: '',
    });
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    useEffect(() => {
        if (id) {
            fetchPlanta();
        }
    }, [id]);

    const fetchPlanta = async () => {
        try {
            setLoading(true);
            const response = await plantaService.getById(Number(id));
            const planta = response.data.data || response.data;
            setFormData({
                nombre_comun: planta.nombre_comun || '',
                nombre_cientifico: planta.nombre_cientifico || '',
                familia: planta.familia || '',
                descripcion: planta.descripcion || '',
                usos_medicinales: planta.usos_medicinales || '',
                preparacion: planta.preparacion || '',
                region: planta.region || '',
                precauciones: planta.precauciones || '',
            });
        } catch (error) {
            setErrors({ general: 'Error al cargar la planta' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            await plantaService.update(Number(id), formData);
            navigate('/plantas');
        } catch (error: any) {
            setErrors(error.response?.data?.errors || { general: 'Error al actualizar la planta' });
        } finally {
            setProcessing(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Cargando planta...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Editar Planta - Repositorio de Plantas</title>
            </Helmet>

            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex items-center mb-6">
                        <Link
                            to="/plantas"
                            className="mr-4 inline-flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Volver
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Editar Planta</h1>
                    </div>

                    {errors.general && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {errors.general}
                        </div>
                    )}

                    <div className="bg-white shadow sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-6 p-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="nombre_comun" className="block text-sm font-medium text-gray-700">
                                        Nombre Común *
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre_comun"
                                        id="nombre_comun"
                                        required
                                        value={formData.nombre_comun}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    />
                                    {errors.nombre_comun && (
                                        <p className="mt-1 text-sm text-red-600">{errors.nombre_comun}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="nombre_cientifico" className="block text-sm font-medium text-gray-700">
                                        Nombre Científico *
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre_cientifico"
                                        id="nombre_cientifico"
                                        required
                                        value={formData.nombre_cientifico}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    />
                                    {errors.nombre_cientifico && (
                                        <p className="mt-1 text-sm text-red-600">{errors.nombre_cientifico}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="familia" className="block text-sm font-medium text-gray-700">
                                        Familia
                                    </label>
                                    <input
                                        type="text"
                                        name="familia"
                                        id="familia"
                                        value={formData.familia}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    />
                                    {errors.familia && (
                                        <p className="mt-1 text-sm text-red-600">{errors.familia}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                        Región
                                    </label>
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        value={formData.region}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    />
                                    {errors.region && (
                                        <p className="mt-1 text-sm text-red-600">{errors.region}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <textarea
                                    name="descripcion"
                                    id="descripcion"
                                    rows={3}
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                                {errors.descripcion && (
                                    <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="usos_medicinales" className="block text-sm font-medium text-gray-700">
                                    Usos Medicinales
                                </label>
                                <textarea
                                    name="usos_medicinales"
                                    id="usos_medicinales"
                                    rows={3}
                                    value={formData.usos_medicinales}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                                {errors.usos_medicinales && (
                                    <p className="mt-1 text-sm text-red-600">{errors.usos_medicinales}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="preparacion" className="block text-sm font-medium text-gray-700">
                                    Preparación
                                </label>
                                <textarea
                                    name="preparacion"
                                    id="preparacion"
                                    rows={3}
                                    value={formData.preparacion}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                                {errors.preparacion && (
                                    <p className="mt-1 text-sm text-red-600">{errors.preparacion}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="precauciones" className="block text-sm font-medium text-gray-700">
                                    Precauciones
                                </label>
                                <textarea
                                    name="precauciones"
                                    id="precauciones"
                                    rows={3}
                                    value={formData.precauciones}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                                {errors.precauciones && (
                                    <p className="mt-1 text-sm text-red-600">{errors.precauciones}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link
                                    to="/plantas"
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    {processing ? 'Guardando...' : 'Actualizar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}