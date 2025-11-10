import { createClient } from '@supabase/supabase-js';

// Este arquivo será completado na Parte 2, após termos as chaves.
// Por enquanto, criamos o esqueleto.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Garante que o cliente só é criado uma vez
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/*
O que este arquivo fará:
1. Importa o método createClient da biblioteca do Supabase.
2. Pega as chaves públicas (URL e ANON KEY) das variáveis de ambiente.
3. Exporta uma instância do cliente Supabase para ser usada em todo o frontend.
*/