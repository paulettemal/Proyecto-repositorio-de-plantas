import Pie from './Componentes/Footer';
import Cabecera from './Componentes/Cabecera';
import Stack from './CompWelcome/Stack';
import { PiTreeLight } from "react-icons/pi";
import { MdFilterList } from "react-icons/md";
import { IoEarth } from "react-icons/io5";
import { Link } from 'react-router-dom';
import DatosODS from './CompWelcome/DatosODS';

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
                            <Link to="/explora" className=" bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-300" >
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
                                        <Link to="/explora" className="w-full md:px-10 lg:px-12 py-3 px-6 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-lg font-medium hover:bg-green-200 dark:hover:bg-green-900/60 transition-colors inline-block text-center">
                                            Explorar
                                        </Link>
                                        
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
                                        <Link to="/explora" className="w-full md:px-10 lg:px-12 py-3 px-6 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-lg font-medium hover:bg-amber-300 dark:hover:bg-green-900/60 transition-colors inline-block text-center">
                                            Buscar
                                        </Link>
                                        
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
                                        <a href="https://www.ambiente.gob.ec/conservacion-de-areas-protegidas-un-hito-historico-en-materia-ambiental/"     target="_blank" className="w-full md:px-10 lg:px-12 py-3 px-6 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-300 dark:hover:bg-green-900/60 transition-colors inline-block text-center">
                                            Aprender
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 bg-gradient-to-b from-green-50 to-white pb-20 flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:items-start lg:gap-12">
                        <div className="w-full max-w-sm flex justify-center lg:w-auto lg:flex-shrink-0">
                            <Stack/>
                        </div>
                        <div className="w-full max-w-md px-4 lg:max-w-lg lg:px-0">
                            <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-600">
                                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-3">
                                    ¿Sabías qué?
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <span className="font-medium">El 40% de las plantas medicinales de Ecuador son endémicas</span>, 
                                    es decir, ¡solo crecen aquí! Conoce cómo preservar este patrimonio único.
                                    Ecuador es uno de los 17 países megadiversos del mundo, albergando el 10% de todas las especies 
                                    de plantas del planeta en solo el 0.2% de la superficie terrestre.
                                </p>
                                <Link to="/explora" className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors inline-block">
                                    Descubre más
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className='h-200 md:h-120 pt-0  bg-[#477e39] '>
                        <DatosODS></DatosODS>
                    </div>



                    <div>
                        <div className="text-center bg-gray-50 dark:bg-gray-800 p-12">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                                ¿Listo para explorar?
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto ">
                                Sumérgete en el fascinante mundo de las plantas medicinales ecuatorianas 
                                y descubre siglos de sabiduría ancestral.
                            </p>
                            <Link to="/explora" className=" bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
                                Explorar plantas
                            </Link>
                        </div>
                    </div>
                </div>
            
            <Pie />
            </div>
        </>
    );
}

