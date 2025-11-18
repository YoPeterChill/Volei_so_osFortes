import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // 1. Define a URL de redirecionamento (deve ser exata, sem query strings)
        const redirectUrl = `${window.location.origin}/auth/update-profile`;

        // 🚨 PASSO CRÍTICO: SALVA O NOME NO NAVEGADOR
        localStorage.setItem('pending_full_name', fullName);

        // 2. Chama o Supabase Auth para cadastro e configura o redirecionamento
        //    Para email o campo correto é emailRedirectTo (redirectTo é usado para OAuth)
        const { error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: redirectUrl,
            },
        });

        if (authError) {
            // Se houver erro de Auth, remove o nome do storage para não usarmos depois
            localStorage.removeItem('pending_full_name');
            setMessage(`Erro ao cadastrar: ${authError.message}`);
        } else {
            setMessage('Sucesso! Verifique seu email para confirmar o cadastro. Você será redirecionado para finalizar o perfil após a confirmação.');
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
            <Head><title>Cadastre-se - Vôlei Organizer</title></Head>
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900">
                    Crie sua Conta
                </h2>
                {message && (
                    <p className={`p-3 rounded-md text-sm ${message.includes('Sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </p>
                )}
                <form className="space-y-6" onSubmit={handleSignUp}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome Completo (como jogador)</label>
                        <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {loading ? 'Processando...' : 'Cadastrar'}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Já tem conta?{' '}
                    <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Faça Login
                    </Link>
                </p>
            </div>
        </div >
    );
}