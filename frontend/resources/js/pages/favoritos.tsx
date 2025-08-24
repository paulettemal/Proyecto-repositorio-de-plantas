import { Helmet } from 'react-helmet-async';
import Pie from './Componentes/Footer';
import { useEffect, useState } from 'react';
import { Planta } from './Interfaces/Interface';
import Cabecera from './Componentes/Cabecera';
import ModalPlanta from './Componentes/ModalPlanta';
import CartillaPlanta from './Componentes/CartillaPlanta';
import { Heart } from 'lucide-react';

export default function Favoritos() {
    const [favorites, setFavorites] = useState<Planta[]>([]);
    const [selectedPlanta, setSelectedPlanta] = useState<Planta | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = () => {
            const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Planta[];
            setFavorites(storedFavorites);
            setIsLoading(false);
        };
        loadFavorites();
        const handleStorageChange = () => {
            loadFavorites();
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
        }, []);

    const removeFavorite = (id: number) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <>
            <Helmet>
                <title>Favoritos - Repositorio de Plantas</title>
            </Helmet>
                <div className="bg-[#477e39] h-[70px]">
                <Cabecera />
            </div>
            <div className='bg-white min-h-screen flex flex-col'>        
                <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:tracking-tight">
                            Tus plantas favoritas 
                        </h1>
                        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                            Revisa las plantas que has guardado
                        </p>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-12 min-h-[400px] flex items-center justify-center">
                                <p className="text-gray-500">Cargando favoritos...</p>
                            </div>
                            ) : favorites.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <h3 className="text-lg font-medium text-gray-900">
                                No tienes plantas favoritas aún
                                </h3>
                                <p className="mt-1 text-gray-500">
                                Agrega plantas a tus favoritos desde el catálogo
                                </p>
                            </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {favorites.map(planta => (
                                    <div key={planta.id} className="relative">
                                        <CartillaPlanta planta={planta} onClick={() => setSelectedPlanta(planta)} />
                                        <button onClick={() => removeFavorite(planta.id)} className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full backdrop-blur-sm" aria-label="Quitar de favoritos" >
                                            <Heart size={20} className="fill-red-500 text-red-500" />
                                        </button>
                                    </div>
                                    ))}
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