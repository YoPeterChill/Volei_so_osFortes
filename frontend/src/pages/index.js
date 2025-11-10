import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <Head>
        <title>Vôlei Organizer - Início</title>
      </Head>

      <main className="p-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bem-vindo Vôlei só os Fortes💪🏐!
        </h1>
        <p className="text-lg text-gray-600">
          Próxima Etapa: Conectar ao Supabase.
        </p>
      </main>
    </div>
  );
}