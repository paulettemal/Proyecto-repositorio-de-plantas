import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button, Input } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Textarea } from "@/components/ui/textarea"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Plantas',
        href: '/plantas',
    },
    {
        title: 'Editar planta',
        href: '#',
    },
];

interface Planta {
    id: number;
    nombreComun: string;
    nombreCientifico: string;
    descripcion: string;
    distribucion: string;
    propiedades: string;
    principiosActivos: string;
    url: string;
}

export default function Edit({ planta }: { planta: Planta }) {
    const { data, setData, put, processing, errors } = useForm({
        nombreComun: planta.nombreComun,
        nombreCientifico: planta.nombreCientifico,
        descripcion: planta.descripcion,
        distribucion: planta.distribucion,
        propiedades: planta.propiedades,
        principiosActivos: planta.principiosActivos,
        url: planta.url,
    });

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('plantas.update', planta.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${planta.nombreComun}`} />
            
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Planta: {planta.nombreComun}</h1>
                
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="nombreComun" className="block text-sm font-medium text-gray-700">
                            Nombre común
                        </label>
                        <Input
                            id="nombreComun"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Ej: Manzanilla"
                            value={data.nombreComun}
                            onChange={e => setData('nombreComun', e.target.value)}
                        />
                        {errors.nombreComun && (<p className="mt-1 text-sm text-red-600">{errors.nombreComun}</p> )}
                    </div>


                    <div className="space-y-2">
                        <label htmlFor="nombreCientifico" className="block text-sm font-medium text-gray-700">
                            Nombre científico
                        </label>
                        <Input
                            id="nombreCientifico"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Ej: Matricaria chamomilla"
                            value={data.nombreCientifico}
                            onChange={e => setData('nombreCientifico', e.target.value)}
                        />
                        {errors.nombreCientifico && (<p className="mt-1 text-sm text-red-600">{errors.nombreCientifico}</p>)}
                    </div>


                    <div className="space-y-2">
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <Textarea
                            id="descripcion"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[120px]"
                            placeholder="Describe las características de la planta..."
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}
                        />
                        {errors.descripcion && ( <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>)}
                    </div>


                    <div className="space-y-2">
                        <label htmlFor="distribucion" className="block text-sm font-medium text-gray-700">
                            Distribución geográfica
                        </label>
                        <Input
                            id="distribucion"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Ej: Europa, Asia, Norteamérica"
                            value={data.distribucion}
                            onChange={e => setData('distribucion', e.target.value)}
                        />
                        {errors.distribucion && ( <p className="mt-1 text-sm text-red-600">{errors.distribucion}</p> )}
                    </div>


                    <div className="space-y-2">
                        <label htmlFor="propiedades" className="block text-sm font-medium text-gray-700">
                            Propiedades medicinales
                        </label>
                        <Textarea
                            id="propiedades"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[120px]"
                            placeholder="Lista las propiedades medicinales..."
                            value={data.propiedades}
                            onChange={e => setData('propiedades', e.target.value)}
                        />
                        {errors.propiedades && ( <p className="mt-1 text-sm text-red-600">{errors.propiedades}</p> )}
                    </div>


                    <div className="space-y-2">
                        <label htmlFor="principiosActivos" className="block text-sm font-medium text-gray-700">
                            Principios activos
                        </label>
                        <Textarea
                            id="principiosActivos"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[120px]"
                            placeholder="Lista los principios activos..."
                            value={data.principiosActivos}
                            onChange={e => setData('principiosActivos', e.target.value)}
                        />
                        {errors.principiosActivos && ( <p className="mt-1 text-sm text-red-600">{errors.principiosActivos}</p> )}
                    </div>


                    <div className="space-y-2">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                            URL de la imagen
                        </label>
                        <Input
                            id="url"
                            type="url"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="https://ejemplo.com/imagen.jpg"
                            value={data.url}
                            onChange={e => setData('url', e.target.value)}
                        />
                        {errors.url && ( <p className="mt-1 text-sm text-red-600">{errors.url}</p> )}
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <a href="/plantas" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                            Cancelar
                        </a>
                        <Button type="submit" disabled={processing}
                            className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-50" >
                            {processing ? 'Guardando' : 'Guardar cambios'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}