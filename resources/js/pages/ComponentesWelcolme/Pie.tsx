import { SharedData } from "@/types";
import { Link } from "lucide-react";
import { Planta } from "../interface";
import { usePage } from "@inertiajs/react";



export default function Pie() {
    
    return (
        <>
            <footer className="bg-[#2a5739] dark:bg-gray-800">
                    <div className=" py-6 px-4 sm:px-6 lg:px-8">
                        <p className=" text-gray-500 dark:text-gray-400 text-sm">
                            Catálogo de plantas elaborado por Isaac Criollo, Joel Guamaní y Paulette Maldonado, para la materia de Lenguajes de Programación de ESPOL. <br></br> IMPORTANTE: Este catálogo de plantas medicinales tiene fines educativos y culturales.
                            Su contenido <span className="font-semibold">no</span> sustituye el diagnóstico médico 
                            profesional.
                        </p>
                    </div>
            </footer>
        </>
    );
}
