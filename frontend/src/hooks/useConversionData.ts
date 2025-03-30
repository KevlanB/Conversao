/* eslint-disable camelcase */
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DateRangeType } from '@/types'
import { format } from 'date-fns'

interface ChannelData {
  email?: number
  wpp?: number
  mobile?: number
}

interface ChartDataPoint extends ChannelData {
  date: string
}

type DataItem = {
  date: string
  channel: 'email' | 'wpp' | 'mobile'
  conversion_rate: number
}

type TransformedDataItem = {
  date: string
  email?: number
  wpp?: number
  mobile?: number
}

export default function useConversionData(
  dateRange: DateRangeType,
  channel: string,
) {
  return useQuery<ChartDataPoint[], Error>({
    queryKey: ['time-series', dateRange.from, dateRange.to, channel],
    queryFn: async () => {
      const params = {
        startDate: format(dateRange.from!, 'yyyy-MM-dd'),
        endDate: format(dateRange.to!, 'yyyy-MM-dd'),
        period: 'day',
        ...(channel && { channels: channel }), // Envia apenas se channel existir
      }

      const { data } = await axios.get('/api/proxy', { params })

      if (!data?.success) {
        throw new Error('Falha ao carregar dados')
      }

      // Transformação para o formato do rechart
      return Object.values(
        data.data.reduce(
          (acc: Record<string, TransformedDataItem>, item: DataItem) => {
            const { date, channel, conversion_rate } = item

            // Se a data ainda não existe no acumulador, cria um objeto base
            if (!acc[date]) {
              acc[date] = { date }
            }

            // Adiciona a conversão ao canal correspondente
            acc[date][channel] = conversion_rate

            return acc
          },
          {},
        ),
      )
    },
    enabled: !!dateRange.from && !!dateRange.to,
  })
}
