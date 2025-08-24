import { Helmet } from 'react-helmet-async';
import Pie from './Componentes/Footer';
import { useEffect, useState } from 'react';
import { Planta } from './Interfaces/Interface';
import Cabecera from './Componentes/Cabecera';
import ModalPlanta from './Componentes/ModalPlanta';
import CartillaPlanta from './Componentes/CartillaPlanta';
import { CiSearch } from "react-icons/ci";
import { plantaService } from '@/services/api';

export default function Explora() {
    const [plantas, setPlantas] = useState<Planta[]>([]);
    const [filteredPlantas, setFilteredPlantas] = useState<Planta[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlanta, setSelectedPlanta] = useState<Planta | null>(null);
    const [filterType, setFilterType] = useState<'all' | 'name' | 'property'>('all');
    
    useEffect(() => {
        const fetchPlantas = async () => {
            try {
                setIsLoading(true);
                const response = await plantaService.getAll();
                
                // La API devuelve {success: true, data: [...]}
                if (response.data.success && Array.isArray(response.data.data)) {
                    console.log('Datos recibidos:', response.data.data);
                    setPlantas(response.data.data);
                    setFilteredPlantas(response.data.data);
                } else {
                    console.error('Formato de respuesta inesperado:', response.data);
                    setError('Formato de respuesta inesperado de la API');
                }
            } catch (error) {
                console.error('Error al cargar plantas:', error);
                setError('No se pudieron cargar las plantas');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlantas();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredPlantas(plantas);
            return;
        }

        const term = searchTerm.toLowerCase();
        const filtered = plantas.filter(planta => {
            const principiosArray = Array.isArray(planta.principiosActivos) 
                ? planta.principiosActivos 
                : typeof planta.principiosActivos === 'string' 
                    ? [planta.principiosActivos]
                    : [];

            switch(filterType) {
                case 'name':
                    return (
                        planta.nombreComun?.toLowerCase().includes(term) ||
                        planta.nombreCientifico?.toLowerCase().includes(term)
                    );
                case 'property':
                    return (
                        (planta.propiedades?.toLowerCase().includes(term)) ||
                        principiosArray.some(pa => pa.toLowerCase().includes(term))
                    );
                default:
                    return (
                        planta.nombreComun?.toLowerCase().includes(term) ||
                        planta.nombreCientifico?.toLowerCase().includes(term) ||
                        planta.distribucion?.toLowerCase().includes(term) ||
                        planta.propiedades?.toLowerCase().includes(term) ||
                        principiosArray.some(pa => pa.toLowerCase().includes(term))
                    );
            }
        });
        setFilteredPlantas(filtered);
    }, [searchTerm, plantas, filterType]);

    return (
        <>
            <Helmet>
                <title>Explora - Repositorio de Plantas</title>
            </Helmet>
            <div className="bg-[#477e39] h-[70px]">
                <Cabecera />
            </div>
            
            <div className='bg-white min-h-screen flex flex-col'>
                <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-extrabold text-gray-900  sm:tracking-tight">
                                Catálogo de plantas
                            </h1>
                            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                                Descubre la diversidad de nuestra flora local
                            </p>
                            
                            <div className="mt-8 max-w-2xl mx-auto">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-grow">
                                    <input type="text" className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Buscar plantas..."
                                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  />
                                    <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => setFilterType('all')}
                                            className={`px-4 py-3 rounded-lg ${filterType === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                            Todos
                                        </button>
                                        <button onClick={() => setFilterType('name')}
                                            className={`px-4 py-3 rounded-lg ${filterType === 'name' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} >
                                            Nombre
                                        </button>
                                        <button onClick={() => setFilterType('property')}
                                            className={`px-4 py-3 rounded-lg ${filterType === 'property' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                            Propiedades
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-500 text-left">
                                    {filterType === 'all' && 'Buscando en campos de nombres, distribución, propiedades y principios activos'}
                                    {filterType === 'name' && 'Buscando solo en nombres (común y científico)'}
                                    {filterType === 'property' && 'Buscando solo en propiedades y principios activos'}
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-12 min-h-[400px] flex items-center justify-center">
                                <p className="text-gray-500">Cargando plantas...</p>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                                <p className="text-red-700">{error}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPlantas.length > 0 ? (
                                    filteredPlantas.map(planta => (
                                        <CartillaPlanta key={planta.id} planta={planta} onClick={() => setSelectedPlanta(planta)} />
                                ))) : (
                                    <div className="col-span-full text-center py-12">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {searchTerm ? 'No se encontraron resultados' : 'No hay plantas disponibles'}
                                        </h3>
                                        <p className="mt-1 text-gray-500">
                                            {searchTerm ? 'Intenta con otro término de búsqueda' : 'No se encontraron plantas en nuestro catálogo.'}
                                        </p>
                                        {searchTerm && (
                                            <button onClick={() => setSearchTerm('')}
                                                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                                Limpiar búsqueda
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
                <Pie />
            </div>

            {selectedPlanta && (
                <ModalPlanta planta={selectedPlanta} onClose={() => setSelectedPlanta(null)} />
            )}
        </>
    );
}