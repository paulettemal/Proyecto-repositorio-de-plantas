import { SharedData } from "@/types";

export interface Planta {
    id: number;
    nombreComun: string;
    nombreCientifico: string;
    descripcion?: string;
    distribucion?: string;
    propiedades?: string;
    principiosActivos?: string;
    url?: string;
    imagenUrl?: string;
}
export interface WelcomeProps extends SharedData {
    plantas?: Planta[];
}