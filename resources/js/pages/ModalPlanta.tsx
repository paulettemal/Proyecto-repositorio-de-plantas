import { Planta } from './interface';

export default function ModalPlanta({ 
    planta, 
    onClose 
    }: { 
    planta: Planta | null, 
    onClose: () => void 
    }) {
    if (!planta) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                
                <div className="relative w-full h-60 overflow-hidden rounded-t-2xl bg-gray-100">
                    {planta.url ? (
                        <img 
                            src={planta.url} 
                            alt={planta.nombreComun}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-300">
                            <span className="text-8xl">🌿</span>
                        </div>
                    )}
                    
                    <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white transition-all shadow-lg" aria-label="Cerrar" >
                        <span className="text-lg">×</span>
                    </button>
                </div>

                <div className="p-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{planta.nombreComun}</h2>
                        <p className="text-lg italic text-gray-600">{planta.nombreCientifico}</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {planta.distribucion && (
                                <div>
                                    <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-3">Distribución</h3>
                                    <p className="text-gray-700 leading-relaxed">{planta.distribucion}</p>
                                </div>
                            )}
                            {planta.descripcion && (
                                <div>
                                    <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-3">Descripción</h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{planta.descripcion}</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            {planta.propiedades && (
                                <div>
                                    <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-3">Propiedades Medicinales</h3>
                                    <p className="text-gray-700 leading-relaxed">{planta.propiedades}</p>
                                </div>
                            )}

                            {planta.principiosActivos && (
                                <div>
                                    <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-3">Principios Activos</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {Array.isArray(planta.principiosActivos) 
                                            ? planta.principiosActivos.join(', ')
                                            : planta.principiosActivos}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}