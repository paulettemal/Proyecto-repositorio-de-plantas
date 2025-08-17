import { Head } from '@inertiajs/react';
import Pie from './ComponentesWelcolme/Pie';
import Cabecera from './ComponentesWelcolme/Cabecera';
import Cita from './ComponentesWelcolme/Cita';
import CircularGallery from './ComponentesWelcolme/Stack'
import Stack from './ComponentesWelcolme/Stack';
import { PiTreeLight } from "react-icons/pi";
import { MdFilterList } from "react-icons/md";
import { IoEarth } from "react-icons/io5";
import { Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <div className="relative">
                <div className="relative h-[50vh] md:h-screen">
                    <img src="/car3.jpg"  className="absolute inset-0 w-full h-full object-cover" alt="Fondo" />
                <div className="absolute inset-0 bg-black/30" />
                <Cabecera />

                <div className="  relative z-10 flex h-screen items-center justify-center text-center px-4">
                    <div>
                        <h1 className="mt-[-310px] md:mt-[-220px] lg:mt-[-200px] text-5xl md:text-7xl font-bold text-white  ">KAWSAY SACHA</h1>
                        <p className="text-xl text-white">redescubre la sabiduría ancestral</p>
                        <div className='mt-5'>
                            <Link href="/explora" className=" bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-300" >
                            Explorar catálogo
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="bg-[#477e39] min-h-screen dark:from-gray-900 dark:to-gray-800">
                    <div className="container mx-auto px-4 ">
                        <div className="text-center mb-16 ">
                            <h2 className="pt-20 text-2xl md:text-3xl font-bold text-white dark:text-green-300 mb-6 text-center">
                                Medicina ancestral
                            </h2>
                            <p className="pb-10 text-[18px] text-white dark:text-gray-300 max-w-3xl mx-auto text-center">
                                Preservamos y compartimos el conocimiento milenario de las plantas medicinales 
                                del Ecuador, promoviendo el uso responsable y sostenible de nuestra biodiversidad.
                            </p>

                            <div className="grid md:grid-cols-3 gap-8 mb-16 px-4">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 dark:border-green-900/50">
                                    <div className="p-8 text-center">
                                        <div className='pb-5 flex justify-center'>
                                            <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/30">
                                                <PiTreeLight size={60} className="text-green-600 dark:text-green-400"/>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                                            Catálogo Completo
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Información detallada sobre plantas medicinales nativas y de alta difusión en Ecuador.
                                        </p>
                                    </div>
                                    <div className="px-6 pb-6">
                                        <button className="w-full py-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-lg font-medium hover:bg-green-200 dark:hover:bg-green-900/60 transition-colors">
                                            Explorar
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 dark:border-amber-900/50">
                                    <div className="p-8 text-center">
                                        <div className='pb-5 flex justify-center'>
                                            <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-900/30">
                                                <MdFilterList size={60} className="text-amber-600 dark:text-amber-400"/>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                                            Búsqueda Inteligente
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Encuentra plantas por nombre o por las afecciones que ayudan a tratar.
                                        </p>
                                    </div>
                                    <div className="px-6 pb-6">
                                        <button className="w-full py-2 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-lg font-medium hover:bg-amber-200 dark:hover:bg-amber-900/60 transition-colors">
                                            Buscar
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-900/50">
                                    <div className="p-8 text-center">
                                        <div className='pb-5 flex justify-center'>
                                            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30">
                                                <IoEarth size={60} className="text-blue-600 dark:text-blue-400"/>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                                            Conservación
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Promovemos la conservación de la biodiversidad y el uso sostenible.
                                        </p>
                                    </div>
                                    <div className="px-6 pb-6">
                                        <button className="w-full py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors">
                                            Aprender
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 bg-gradient-to-b from-green-50 to-white pb-20 flex flex-col justify-center md:flex-row md:justify-center sm:justify-center">
                        <div className="w-full md:w-1/6 sm:w-1/2 md:mx-auto">
                            <Stack/>
                        </div>
                        <div className=" w-full sm:w-1/2 md:w-1/2  flex flex-col justify-center">
                            <div className="bg-green-50  dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-600">
                                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-3">
                                    ¿Sabías qué?
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 ">
                                    <span className="font-medium">El 40% de las plantas medicinales de Ecuador son endémicas</span>, 
                                        es decir, ¡solo crecen aquí! Conoce cómo preservar este patrimonio único.
                                        Ecuador es uno de los 17 países megadiversos del mundo, albergando el 10% de todas las especies 
                                        de plantas del planeta en solo el 0.2% de la superficie terrestre.
                                </p>
                                <a href="https://ddrn.dk/wp-content/uploads/2018/01/LIBRO_ROJO_de_las_plantas_endemicas_del-1.pdf"  target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors inline-block" >
                                    Descubre más
                                </a>
                            </div>
                        </div>
                        <div className='md:w-1/10 '>
                        </div>
                    </div>

                    <div>
                        <div className="text-center bg-gray-50 dark:bg-gray-800 p-12">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                                ¿Listo para Explorar?
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto ">
                                Sumérgete en el fascinante mundo de las plantas medicinales ecuatorianas 
                                y descubre siglos de sabiduría ancestral.
                            </p>
                            <Link href="/explora" className=" bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
                                Explorar Plantas
                            </Link>
                        </div>
                    </div>
                </div>
            
            <Cita/>
            <Pie />
            </div>
        </>
    );
}

