import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Planta } from '../Interfaces/Interface';
import Eliminar from './eliminar';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Plantas',
        href: '/plantas',
    },
];

interface Props {
    plantas: Planta[];
}

export default function Index({ plantas }: Props) {
    const { processing, delete: destroy } = useForm();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState<Planta | null>(null);

    const handleDeleteClick = (plant: Planta) => {
        setSelectedPlant(plant);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedPlant) {
            destroy(route('plantas.destroy', selectedPlant.id), {
                onSuccess: () => {
                    setDeleteModalOpen(false);
                    setSelectedPlant(null);
                }
            });
        }
    };

    const handleCloseModal = () => {
        setDeleteModalOpen(false);
        setSelectedPlant(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plantas" />
            <Eliminar isOpen={deleteModalOpen} onClose={handleCloseModal}  onConfirm={handleConfirmDelete} plantaNombre={selectedPlant?.nombreComun || ''} loading={processing} />

            <div className="m-4 overflow-x-auto">
                <Link href={route('plantas.create')}>
                    <Button className="rounded-2xl p-4 w-40 mb-4 bg-emerald-900 text-amber-50">
                        Crear planta
                    </Button>
                </Link>
                
                {plantas.length > 0 ? (
                    <div className="w-full overflow-hidden rounded-lg border shadow">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow className='bg-emerald-100'>
                                    <TableHead className="w-20 font-extrabold">Id</TableHead>
                                    <TableHead className="min-w-[150px] font-extrabold">Nombre común</TableHead>
                                    <TableHead className="min-w-[150px] font-extrabold">Nombre científico</TableHead>
                                    <TableHead className="min-w-[200px] font-extrabold">Descripción</TableHead>
                                    <TableHead className="min-w-[150px] font-extrabold">Distribución</TableHead>
                                    <TableHead className="min-w-[200px] font-extrabold">Propiedades</TableHead>
                                    <TableHead className="min-w-[200px] font-extrabold">Principios activos</TableHead>
                                    <TableHead className="min-w-[150px] font-extrabold">Imagen</TableHead>
                                    <TableHead className="min-w-[200px] font-extrabold">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {plantas.map((plant: Planta) => (
                                    <TableRow key={plant.id}>
                                        <TableCell className="font-medium">{plant.id}</TableCell>
                                        <TableCell className="truncate max-w-[150px]">{plant.nombreComun}</TableCell>
                                        <TableCell className="truncate max-w-[150px]">{plant.nombreCientifico}</TableCell>
                                        <TableCell className="truncate max-w-[200px]">{plant.descripcion}</TableCell>
                                        <TableCell className="truncate max-w-[150px]">{plant.distribucion}</TableCell>
                                        <TableCell className="truncate max-w-[200px]">{plant.propiedades}</TableCell>
                                        <TableCell className="truncate max-w-[200px]">{plant.principiosActivos}</TableCell>
                                        <TableCell>
                                            {plant.url ? (
                                                <a href={plant.url} target="_blank" rel="noopener noreferrer">
                                                    <img 
                                                        src={plant.url || '/placeholder-plant.jpg'} 
                                                        alt={plant.nombreComun} 
                                                        className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity" 
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/placeholder-plant.jpg';
                                                        }}
                                                    />
                                                </a>
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                                                    <span className="text-xs text-gray-500">Sin imagen</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="space-x-2">
                                            <Link href={route('plantas.edit', plant.id)}>
                                                <Button className="rounded-2xl p-2 bg-black text-amber-50">
                                                    Editar
                                                </Button>
                                            </Link>
                                            <Button disabled={processing} onClick={() => handleDeleteClick(plant)} className="rounded-2xl p-2 bg-red-600 text-amber-50">
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No hay plantas registradas.</p>
                        <Link href={route('plantas.create')}>
                            <Button className="mt-4 bg-emerald-900 text-amber-50">
                                Crear primera planta
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}