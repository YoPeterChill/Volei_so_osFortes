import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Checagem básica para evitar erros
if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Erro: Variáveis de ambiente do Supabase não configuradas corretamente.");
    // Em produção, isso deve ser tratado melhor, mas para desenvolvimento é suficiente.
}

// Garante que o cliente só é criado uma vez
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/*
O que este arquivo faz: Ele importa as chaves públicas (seguras para o frontend)
e exporta o objeto 'supabase' configurado, pronto para fazer chamadas de autenticação
e operações de banco de dados que não exigem privilégios de administrador.
*/