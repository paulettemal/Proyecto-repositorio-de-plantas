import { Head } from '@inertiajs/react';
import Pie from './ComponentesWelcolme/Pie';
import { useEffect, useState } from 'react';
import { Planta } from './interface';
import Cabecera from './ComponentesWelcolme/Cabecera';
import ModalPlanta from './ModalPlanta';
import CartillaPlanta from './CartillaPlanta';
import { CiSearch } from "react-icons/ci";

export default function Explora() {
    const [plantas, setPlantas] = useState<Planta[]>([]);
    const [filteredPlantas, setFilteredPlantas] = useState<Planta[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlanta, setSelectedPlanta] = useState<Planta | null>(null);
    const [filterType, setFilterType] = useState<'all' | 'name' | 'property'>('all');

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/plantas')
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar las plantas');
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos:', data);
                setPlantas(data.plantas);
                setFilteredPlantas(data.plantas);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar plantas:', error);
                setError('No se pudieron cargar las plantas');
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <Head title="Explora" />
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
                        </div>

                    </div>
                </main>
                <Pie />
            </div>

        </>
    );
}