import { SharedData } from "@/types";

export interface Planta {
    id: number;
    nombreComun: string;
    nombreCientifico: string;
    distribucion?: string;
    descripcion?: string;
    propiedades?: string;
    principiosActivos?: string;
    url?: string;
}


export interface WelcomeProps extends SharedData {
    plantas?: Planta[];
}