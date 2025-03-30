'use client'
import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { format, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'
import { DateRangePicker } from './DateRangePicker'
import { AlertCircle } from 'lucide-react'
import SkeletonChart from './SkeletonChart'
import useConversionData from '@/hooks/useConversionData'
import { DateRangeType } from '@/types'
import { SelectChannel } from './SelectChannel'

export default function ConversionChart() {
  const [dateRange, setDateRange] = useState<DateRangeType>({
    from: subDays(new Date(), 10),
    to: new Date(),
  })
  const [channel, setChannel] = useState<string>('')

  const { data, isLoading, isError, refetch } = useConversionData(
    dateRange,
    channel,
  )
  // console.log('Dados recebidos chart:', data)

  if (isLoading) return <SkeletonChart />

  if (isError)
    return (
      <div className="h-[400px] flex flex-col items-center justify-center gap-4 text-red-500 border border-red-200 rounded-lg p-4">
        <AlertCircle className="h-12 w-12" />
        <p>Falha ao carregar os dados</p>
        <p className="text-sm text-center max-w-md">
          Verifique o console para detalhes (F12 → Console)
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    )

  if (!data || data.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p>Nenhum dado disponível para o período selecionado</p>
      </div>
    )
  }

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange({
      from: range?.from ?? subDays(new Date(), 10), // Fallback para 10 dias atrás
      to: range?.to ?? new Date(), // Fallback para data atual
    })
  }

  const handleChannelChange = (selectedValue: string) => {
    console.log(selectedValue)
    setChannel(selectedValue)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <DateRangePicker
          selectedRange={{
            from: new Date(dateRange.from),
            to: dateRange.to ? new Date(dateRange.to) : undefined,
          }}
          onSelect={handleDateRangeSelect}
        />
        <SelectChannel onKey={handleChannelChange} value={channel} />
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => {
                const d = new Date(date)
                // Ajusta para o fuso horário local
                d.setMinutes(d.getMinutes() + d.getTimezoneOffset())
                return format(d, 'dd/MM', { locale: ptBR })
              }}
            />
            <YAxis
              domain={[0, 'dataMax + 10']}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              labelFormatter={(date) =>
                format(new Date(date), 'PPPP', { locale: ptBR })
              }
              formatter={(value, name) => [
                `${value}%`,
                name === 'wpp'
                  ? 'WhatsApp'
                  : String(name).charAt(0).toUpperCase() +
                    String(name).slice(1),
              ]}
            />
            <Legend
              formatter={(value) =>
                value === 'wpp'
                  ? 'WhatsApp'
                  : String(value).charAt(0).toUpperCase() +
                    String(value).slice(1)
              }
            />
            <Line
              type="monotone"
              dataKey="MOBILE"
              stroke="#f59e0b"
              name="Mobile"
              strokeWidth={2}
              dot={{ r: 1 }}
            />
            <Line
              type="monotone"
              dataKey="email"
              stroke="#3b82f6"
              name="Email"
              strokeWidth={2}
              dot={{ r: 1 }}
            />
            <Line
              type="monotone"
              dataKey="wpp"
              stroke="#22c55e"
              name="WhatsApp"
              strokeWidth={2}
              dot={{ r: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
