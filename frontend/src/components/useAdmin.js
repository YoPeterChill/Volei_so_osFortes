import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAdminStatus = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                // Consulta a tabela 'profiles' para verificar a flag is_admin
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('is_admin')
                    .eq('id', user.id)
                    .single();

                if (profile && profile.is_admin) {
                    setIsAdmin(true);
                } else if (error && error.code !== 'PGRST116') { // PGRST116 = não encontrado (pode ocorrer)
                    console.error('Erro ao buscar perfil:', error.message);
                }
            }
            setLoading(false);
        };

        // Roda a checagem na montagem e monitora mudanças de auth
        supabase.auth.onAuthStateChange(() => checkAdminStatus());
        checkAdminStatus();
    }, []);

    return { isAdmin, loading, user };
};