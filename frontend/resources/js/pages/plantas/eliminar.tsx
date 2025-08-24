import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface EliminarProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    plantaNombre?: string;
    loading?: boolean;
}

export default function Eliminar({
    isOpen,
    onClose,
    onConfirm,
    title = "¿Está seguro?",
    message = "Esta acción no se puede deshacer.",
    plantaNombre = "",
    loading = false,
    }: EliminarProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {message}
                        {plantaNombre && (
                        <p className="mt-2 font-semibold ">
                            Planta a eliminar: <span className="font-bold text-red-600">{plantaNombre}</span>
                        </p>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                <Button variant="outline" onClick={onClose} disabled={loading}>
                    Cancelar
                </Button>
                <Button variant="destructive" onClick={onConfirm} disabled={loading} >
                    {loading ? "Eliminando..." : "Eliminar"}
                </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}