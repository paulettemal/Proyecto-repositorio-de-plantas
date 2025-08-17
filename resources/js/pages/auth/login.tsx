import { Head, useForm } from '@inertiajs/react';
import { Leaf, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Iniciar sesión" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-green-700">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            className="border-green-300 focus:ring-green-500 focus:border-green-500"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="text-green-700">Contraseña</Label>
                            {canResetPassword && (
                                <TextLink 
                                    href={route('password.request')} 
                                    className="ml-auto text-sm text-green-600 hover:text-green-800" 
                                    tabIndex={5}
                                >
                                    ¿Olvidaste tu contraseña?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Contraseña"
                            className="border-green-300 focus:ring-green-500 focus:border-green-500"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                            className="border-green-300 text-green-600 focus:ring-green-500"
                        />
                        <Label htmlFor="remember" className="text-green-700">Recordarme</Label>
                    </div>

                    <Button 
                        type="submit" 
                        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all duration-300" 
                        tabIndex={4} 
                        disabled={processing}
                    >
                        {processing ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : (
                            <span className="flex items-center gap-2">
                                <Leaf size={16} />
                                Iniciar sesión
                            </span>
                        )}
                    </Button>
                </div>

                <div className="text-center text-sm text-green-700">
                    ¿No tienes una cuenta?{' '}
                    <TextLink 
                        href={route('register')} 
                        className="text-green-600 hover:text-green-800 font-medium" 
                        tabIndex={5}
                    >
                        Regístrate
                    </TextLink>
                </div>
            </form>

            {status && (
                <div className="mb-4 p-3 text-center text-sm font-medium text-white bg-green-500 rounded-lg">
                    {status}
                </div>
            )}

            <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </AuthLayout>
    );
}
