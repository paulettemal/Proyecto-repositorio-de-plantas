import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Planta } from './interface';


interface WelcomeProps extends SharedData {
    plantas?: Planta[];
}

export default function Welcome() {
    const pageProps = usePage<WelcomeProps>().props;
    const { auth } = pageProps;


    return (
        <>
            <Head title="Inicio" />
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
                <header className="py-6 px-4 sm:px-6 lg:px-8 ">
                    <div className="max-w-7xl mx-auto flex justify-end">
                        <nav className="flex items-center gap-4">
                            <Link href={('/nosotros')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">Nosotros</Link>
                            <Link href={('/explora')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">Explora</Link>
                            <Link href={('/favoritos')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">Favoritos</Link>
                            
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200" >
                                    Dashboard
                                </Link>) : (
                                <>
                                    
                                    <Link href={route('login')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200" >
                                        Iniciar sesión
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

            </div>
        </>
    );
}