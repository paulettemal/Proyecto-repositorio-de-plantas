import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Table,
    TableBody,
<<<<<<< HEAD
=======
    TableCaption,
>>>>>>> 36e706d70e6ca5aa5e1368df37ce74f830737842
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@headlessui/react';
<<<<<<< HEAD
import { useState } from 'react';
import Eliminar from './eliminar';
=======
>>>>>>> 36e706d70e6ca5aa5e1368df37ce74f830737842

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Plantas',
        href: '/plantas',
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

interface Props {
    plantas: Planta[];
}

export default function Index({ plantas }: Props) {
<<<<<<< HEAD
    const { processing, delete: destroy } = useForm();
    const [deleteDialog, setDeleteDialog] = useState({
        isOpen: false,
        id: null as number | null,
        nombreComun: '',
    });

    const handleDelete = (id: number, nombreComun: string) => {
        setDeleteDialog({
            isOpen: true,
            id,
            nombreComun,
        });
    };

    const confirmDelete = () => {
        if (deleteDialog.id) {
            destroy(route('plantas.destroy', deleteDialog.id));
        }
        setDeleteDialog({
            isOpen: false,
            id: null,
            nombreComun: '',
        });
    };

    const cancelDelete = () => {
        setDeleteDialog({
            isOpen: false,
            id: null,
            nombreComun: '',
        });
    };

    const plantaAEliminar = deleteDialog.id 
        ? plantas.find(p => p.id === deleteDialog.id)
        : null;
=======
    
>>>>>>> 36e706d70e6ca5aa5e1368df37ce74f830737842

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plantas" />
            <div className="m-4 overflow-x-auto">
                <Link href={route('plantas.create')}>
                    <Button className="rounded-2xl p-4 w-40 mb-4 bg-emerald-900 text-amber-50">
<<<<<<< HEAD
                        Crear planta
                    </Button>
                </Link>

                {plantas.length > 0 ? (
=======
                        Crear  planta
                    </Button>
                </Link>

                {plantas.length > 0 && (
>>>>>>> 36e706d70e6ca5aa5e1368df37ce74f830737842
                    <div className="w-full overflow-hidden rounded-lg border shadow">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow className='bg-emerald-100'>
<<<<<<< HEAD
                                    <TableHead className="w-20 font-extrabold">Id</TableHead>
=======
                                    <TableHead className="w-20 font-extrabold ">Id</TableHead>
>>>>>>> 36e706d70e6ca5aa5e1368df37ce74f830737842
                                    <TableHead className="min-w-[150px] font-extrabold">Nombre común</TableHead>
                                    <TableHead className="min-w-[150px] font-extrabold">Nombre científico</TableHead>
                                    <TableHead className="min-w-[200px] font-extrabold">Descripción</TableHead>
                                    <TableHead className="min-w-[150px] font-extrabold">Distribución</TableHead>
                                    <TableHead className="min-w-[200px] font-extrabold">Propiedades</TableHead>
                                    <TableHead className="min-w-[200px] font-extrabold">Principios activos</TableHead>
<<<<<<< HEAD
                                    <TableHead className="min-w-[150px] font-extrabold">Imagen</TableHead>
=======
                                    <TableHead className="min-w-[150px] font-extrabold">Url</TableHead>
>>>>>>> 36e706d70e6ca5aa5e1368df37ce74f830737842
                                    <TableHead className="min-w-[200px] font-extrabold">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
<<<<<<< HEAD
                                {plantas.map((plant) => (
                                    <TableRow key={plant.id}>
                                        <TableCell className="font-medium">{plant.id}</TableCell>
=======
                                {plantas.map((plant: Planta) => (
                                    <TableRow key={plant.id}>
                                        <TableCell className="font-medium ">{plant.id}</TableCell>
>>>>>>> 36e706d70e6ca5aa5e1368df37ce74f830737842
                                        <TableCell className="truncate max-w-[150px]">{plant.nombreComun}</TableCell>
                                        <TableCell className="truncate max-w-[150px]">{plant.nombreCientifico}</TableCell>
                                        <TableCell className="truncate max-w-[200px]">{plant.descripcion}</TableCell>
                                        <TableCell className="truncate max-w-[150px]">{plant.distribucion}</TableCell>
                                        <TableCell className="truncate max-w-[200px]">{plant.propiedades}</TableCell>
                                        <TableCell className="truncate max-w-[200px]">{plant.principiosActivos}</TableCell>
                                        <TableCell>
                                            {plant.url ? (
                                                <a href={plant.url} target="_blank" rel="noopener noreferrer">
<<<<<<< HEAD
                                                    <img 
                                                        src={plant.url || '/placeholder-plant.jpg'} 
                                                        alt={plant.nombreComun} 
                                                        className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity" 
                                                        onError={(e) => {(e.target as HTMLImageElement).src = '/placeholder-plant.jpg'}}
                                                    />
=======
                                                    <img src={plant.url || '/placeholder-plant.jpg'} alt={plant.nombreComun} 
                                                    className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity" 
                                                    onError={(e) => {(e.target as HTMLImageElement).src = '/placeholder-plant.jpg';}}/>
>>>>>>> 36e706d70e6ca5aa5e1368df37ce74f830737842
                                                </a>
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                                                    <span className="text-xs text-gray-500">Sin imagen</span>
                                                </div>
                                            )}
                                        </TableCell>
<<<<<<< HEAD
                                        <TableCell className="space-x-2">
=======
                                        <TableCell className=" space-x-2">
>>>>>>> 36e706d70e6ca5aa5e1368df37ce74f830737842
                                            <Link href={route('plantas.edit', plant.id)}>
                                                <Button className="rounded-2xl p-2 bg-black text-amber-50">
                                                    Editar
                                                </Button>
                                            </Link>
<<<<<<< HEAD
                                            <Button 
                                                disabled={processing} 
                                                onClick={() => handleDelete(plant.id, plant.nombreComun)} 
                                                className="rounded-2xl p-2 bg-red-600 text-amber-50"
                                            >
                                                Eliminar
                                            </Button>
=======
>>>>>>> 36e706d70e6ca5aa5e1368df37ce74f830737842
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
<<<<<<< HEAD
                ) : (
                    <div className="w-full p-8 text-center border rounded-lg">
                        <p className="text-gray-500">No hay plantas registradas</p>
                        <Link href={route('plantas.create')} className="inline-block mt-4">
                            <Button className="rounded-2xl p-2 bg-emerald-900 text-amber-50">
                                Crear primera planta
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            <Eliminar
                isOpen={deleteDialog.isOpen}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                loading={processing}
                title="¿Está seguro que quiere eliminar esta planta?"
                message={`¿Está seguro que quiere eliminar la planta "${plantaAEliminar?.nombreComun || deleteDialog.nombreComun}"? Esta acción no se puede deshacer y todos los datos asociados serán eliminados permanentemente.`}
                plantaNombre={plantaAEliminar?.nombreComun || deleteDialog.nombreComun}
            />
=======
                )}
            </div>
>>>>>>> 36e706d70e6ca5aa5e1368df37ce74f830737842
        </AppLayout>
    );
}