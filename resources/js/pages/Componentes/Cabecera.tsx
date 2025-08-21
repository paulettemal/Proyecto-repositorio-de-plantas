import { Link, usePage } from '@inertiajs/react';
import { WelcomeProps } from '../Interfaces/Interface';

export default function Cabecera() {
    const pageProps = usePage<WelcomeProps>().props;
    const { auth } = pageProps;

    return (
        <div className="relative z-10">
            <header className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex justify-end ">
                    <nav className="flex items-center gap-4 ">
                        <Link href={('/')} className=" text-[14px] inline-flex items-center px-4 md:px-2 sm:px-1 py-2 font-medium text-white hover:text-green-900 dark:hover:text-green-100">
                            Nosotros
                        </Link>
                        <Link href={('/explora')} className=" text-[14px] inline-flex items-center px-4 md:px-2 sm:px-1 py-2 font-medium text-white hover:text-green-900 dark:hover:text-green-100">
                            Explora
                        </Link>
                        <Link href={('/favoritos')} className="text-[14px] inline-flex items-center px-4 md:px-2 sm:px-1 py-2 font-medium text-white hover:text-green-900 dark:hover:text-green-100">
                            Favoritos
                        </Link>
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="text-[14px] inline-flex items-center px-4 md:px-2 sm:px-1 py-2 font-medium text-white hover:text-green-900 dark:hover:text-green-100">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href={route('login')} className="text-[14px] inline-flex items-center px-4 md:px-2 sm:px-1 py-2 font-medium text-white hover:text-green-900 dark:hover:text-green-100">
                                Iniciar sesión
                            </Link>
                        )}
                    </nav>
                </div>
            </header>
        </div>
    );
}