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
        title: 'Crear nueva planta',
        href: '#',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nombreComun: '',
        nombreCientifico: '',
        descripcion: '',
        distribucion: '',
        propiedades: '',
        principiosActivos: '',
        url: ''
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('plantas.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear nueva planta" />
            
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Agregar nueva planta</h1>
                    <p className="text-gray-600 mt-2">Complete todos los campos para registrar una nueva planta medicinal</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    
                    <div className="space-y-6">
                        <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Información básica</h2>
                        
                        <div className="space-y-2">
                            <label htmlFor="nombreComun" className="block text-sm font-medium text-gray-700">
                                Nombre común <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="nombreComun"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Ej: Manzanilla, Menta, Aloe vera"
                                value={data.nombreComun}
                                onChange={e => setData('nombreComun', e.target.value)}
                                required
                            />
                            {errors.nombreComun && (
                                <p className="mt-1 text-sm text-red-600">{errors.nombreComun}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="nombreCientifico" className="block text-sm font-medium text-gray-700">
                                Nombre científico
                            </label>
                            <Input
                                id="nombreCientifico"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Ej: Matricaria chamomilla, Mentha piperita, Aloe barbadensis"
                                value={data.nombreCientifico}
                                onChange={e => setData('nombreCientifico', e.target.value)}
                            />
                            {errors.nombreCientifico && (
                                <p className="mt-1 text-sm text-red-600">{errors.nombreCientifico}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Descripción</h2>
                        <div className="space-y-2">
                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                                Descripción detallada <span className="text-red-500">*</span>
                            </label>
                            <Textarea id="descripcion" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[120px]" placeholder="Describa las características físicas de la planta, hábitat, etc."
                                value={data.descripcion} onChange={e => setData('descripcion', e.target.value)} required/>
                                {errors.descripcion && (
                                    <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>
                                )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="distribucion" className="block text-sm font-medium text-gray-700">
                                Distribución geográfica
                            </label>
                            <Input id="distribucion" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Regiones o países donde se encuentra la planta" value={data.distribucion} onChange={e => setData('distribucion', e.target.value)}  />
                                {errors.distribucion && (
                                    <p className="mt-1 text-sm text-red-600">{errors.distribucion}</p>
                                )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Propiedades medicinales</h2>
                        <div className="space-y-2">
                            <label htmlFor="propiedades" className="block text-sm font-medium text-gray-700">
                                Propiedades y usos
                            </label>
                            <Textarea id="propiedades" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[120px]" placeholder="Describa los usos medicinales tradicionales y beneficios para la salud" value={data.propiedades} onChange={e => setData('propiedades', e.target.value)}/>
                                {errors.propiedades && (
                                    <p className="mt-1 text-sm text-red-600">{errors.propiedades}</p>
                                )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="principiosActivos" className="block text-sm font-medium text-gray-700">
                                Principios activos
                            </label>
                            <Textarea id="principiosActivos" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[120px]"
                                placeholder="Liste los compuestos químicos activos responsables de sus propiedades medicinales" value={data.principiosActivos} onChange={e => setData('principiosActivos', e.target.value)} />
                                {errors.principiosActivos && (
                                    <p className="mt-1 text-sm text-red-600">{errors.principiosActivos}</p>
                                )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Imagen</h2>
                        <div className="space-y-2">
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                URL de la imagen
                            </label>
                            <Input id="url" type="url" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="https://ejemplo.com/imagen-planta.jpg" value={data.url} onChange={e => setData('url', e.target.value)}/>
                            <p className="mt-1 text-sm text-gray-500">Ingrese una URL válida de una imagen de la planta</p>
                                {errors.url && (
                                    <p className="mt-1 text-sm text-red-600">{errors.url}</p>
                                )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <a href="/plantas" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                            Cancelar
                        </a>
                        <Button type="submit" disabled={processing} className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-50" >
                            {processing ? 'Creando...' : 'Crear planta'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}