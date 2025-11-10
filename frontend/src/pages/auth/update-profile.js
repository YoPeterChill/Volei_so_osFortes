import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import Head from 'next/head';

export default function UpdateProfile() {
    const router = useRouter();
    const [status, setStatus] = useState('Processando...');

    useEffect(() => {
        // Tenta pegar o nome salvo no LocalStorage
        const pendingFullName = localStorage.getItem('pending_full_name');

        // Remove imediatamente do LocalStorage para evitar que seja usado novamente
        localStorage.removeItem('pending_full_name');

        if (pendingFullName) {
            updateProfileData(pendingFullName);
        } else if (router.isReady) {
            // Se não houver nome, é porque o usuário veio de um login normal ou a URL falhou.
            setStatus('Erro: Dados de perfil incompletos. Redirecionando para eventos.');
            setTimeout(() => router.push('/events'), 3000);
        }
    }, [router.isReady]);

    const updateProfileData = async (fullName) => {
        // 1. Pega a sessão atual
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setStatus('Erro: Nenhuma sessão ativa. Redirecionando para login.');
            setTimeout(() => router.push('/auth/login'), 3000);
            return;
        }

        // 2. Executa a atualização do perfil (usando o nome do localStorage)
        const { error } = await supabase
            .from('profiles')
            .update({ full_name: fullName, updated_at: new Date() })
            .eq('id', user.id);

        if (error) {
            setStatus(`Erro ao finalizar perfil: ${error.message}.`);
            console.error("Erro no Supabase Update Profile:", error);
        } else {
            setStatus('Sucesso! Seu perfil foi atualizado. Você está logado e pronto para jogar!');
            // 3. Redireciona para a lista de eventos
            setTimeout(() => router.push('/events'), 2000);
        }
    };

    return (
        // ... (O JSX permanece o mesmo)
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
            <Head><title>Finalizando Cadastro</title></Head>
            <div className="w-full max-w-md p-8 text-center bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirmação de Cadastro</h2>
                <p className="text-lg text-indigo-600">{status}</p>
                <p className="mt-4 text-sm text-gray-500">Aguarde o redirecionamento automático.</p>
            </div>
        </div>
    );
}