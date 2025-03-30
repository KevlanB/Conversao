import ConversionChart from '@/components/Chart'

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Análise de Conversão</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <ConversionChart />
      </div>
    </main>
  )
}
