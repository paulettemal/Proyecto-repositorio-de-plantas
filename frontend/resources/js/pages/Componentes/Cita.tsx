import { Head } from '@inertiajs/react';

export default function Cita() {
    return (
        <>
            <div className="bg-[#2a5739] text-white p-8 w-full font-sans">
                <div className="w-[400px] sm:w-[600px] md:w-[900px] mx-auto">
                    <blockquote className="italic text-[18px] leading-relaxed my-8 text-center">
                    "Los jardines de nuestras abuelas son bibliotecas vivientes. Cada planta medicinal cultivada en los Andes lleva consigo siglos de conocimiento intergeneracional. Estas especies no son simples hierbas, sino legados de resistencia cultural y soluciones terapéuticas que debemos preservar para las futuras generaciones."</blockquote>
                    <p className="text-right mt-4 font-light text-amber-100">
                    — Dra. Norma Ramos, Antropóloga Médica
                    </p>
                    
                </div>
            </div>
        </>
    );
}


