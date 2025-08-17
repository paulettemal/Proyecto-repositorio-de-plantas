import { Planta } from './interface';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

function CartillaPlanta({ 
    planta,
    onClick 
    }: { 
    planta: Planta,
    onClick: () => void 
    }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!Array.isArray(favorites)) {
            throw new Error('Formato inválido en localStorage');
        }
        setIsFavorite(favorites.some((fav: Planta) => fav.id === planta.id));
        } catch (err) {
        console.error('Error al leer favoritos:', err);
        setError('Error al cargar favoritos');
        localStorage.setItem('favorites', '[]');
        }
    }, [planta.id]);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (!Array.isArray(favorites)) {
            throw new Error('Formato inválido en localStorage');
        }

        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = favorites.filter((fav: Planta) => fav.id !== planta.id);
        } else {
            updatedFavorites = [...favorites, planta];
        }
        
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
        } catch (err) {
        console.error('Error al actualizar favoritos:', err);
        setError('Error al guardar favoritos');
        }
    };

    const handleImageError = () => {
        console.log('Error cargando imagen para:', planta.nombreComun, 'URL:', planta.url);
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(false);
    };

    if (error) {
        return (
        <div className="bg-white rounded-lg shadow-md p-4 text-red-500">
            {error}
            <button onClick={() => setError(null)} className="ml-2 text-sm text-blue-500" >
                Reintentar
            </button>
        </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer relative"onClick={onClick}>
            <button onClick={toggleFavorite} className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white/90 transition-colors" aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}>
                <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-300 hover:text-red-500"} />
            </button>
            <div className="w-full h-48 bg-green-100 flex items-center justify-center relative overflow-hidden">
                {planta.url && !imageError ? (
                <>
                    {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                        </div>
                    )}
                    <img src={planta.url} alt={planta.nombreComun} className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imageLoading ? 'opacity-0' : 'opacity-100'}`} onError={handleImageError} onLoad={handleImageLoad}/>
                </>
                ) : (
                <div className="flex flex-col items-center justify-center text-green-600 p-4 text-center">
                    <span className="text-4xl mb-2">🌿</span>
                    <span className="text-sm">{imageError ? 'Error al cargar imagen' : 'Imagen no disponible'}</span>
                </div>
                )}
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                    {planta.nombreComun}
                </h3>
                <p className="mt-1 text-sm italic text-green-600">
                    {planta.nombreCientifico}
                </p>
                {planta.propiedades && (
                    <p className="mt-3 text-gray-600 line-clamp-2">
                        <span className="font-medium">Propiedades:</span> {
                            planta.propiedades
                                .split('-')
                                .map(item => item.trim())
                                .filter(item => item.length > 0)
                                .join(', ')
                        }
                    </p>
                )}
                <div className="mt-4 text-sm font-medium text-green-600">
                    Haz clic para ver detalles
                </div>
            </div>
        </div>
    );
}

export default CartillaPlanta;