import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
    const [session, setSession] = useState(null);
    const router = useRouter();

    // Monitora a sessão de autenticação do Supabase
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );
        // Inicializa a sessão na primeira carga
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login');
    };

    // Componente de Navegação
    const Nav = () => (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center text-xl font-bold text-indigo-600">
                            Vôlei Organizer
                        </Link>
                        {session && (
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link href="/events" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Eventos
                                </Link>
                                {/* Futuros links de Admin/Perfil podem ir aqui */}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        {!session ? (
                            <>
                                <Link href="/auth/login" className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link href="/auth/signup" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                                    Cadastre-se
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Sair ({session.user.email})
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <Nav />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}