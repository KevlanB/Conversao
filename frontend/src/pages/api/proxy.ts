import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // recebe os parâmetros do frontend
    const { startDate, endDate, period = 'day', channels } = req.query

    // validação básica
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'startDate e endDate são obrigatórios',
      })
    }

    // configuração da chamada para o backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    if (!backendUrl) {
      throw new Error('Variável NEXT_PUBLIC_BACKEND_URL não configurada')
    }

    // transforma os parâmetros para o formato do backend
    const backendParams = {
      startDate,
      endDate,
      period,
      ...(channels && { channels }),
    }

    // console.log('Chamando backend com:', backendParams)

    // faz a chamada real para o backend
    const response = await axios.get(`${backendUrl}/api/time-series`, {
      params: backendParams,
      timeout: 10000,
    })

    // console.log("resposta",response.data.data)

    // retorna os dados no formato esperado pelo frontend
    return res.status(200).json({
      success: true,
      data: response.data.data || [],
    })
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Erro no proxy:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      })

      return res.status(error.response?.status || 500).json({
        success: false,
        error: error.response?.data?.error || 'Erro no servidor',
        ...(process.env.NODE_ENV === 'development' && {
          details: error.message,
        }),
      })
    }

    // Caso o erro não seja do Axios
    if (error instanceof Error) {
      console.error('Erro desconhecido:', { message: error.message })

      return res.status(500).json({
        success: false,
        error: 'Erro interno no servidor',
        ...(process.env.NODE_ENV === 'development' && {
          details: error.message,
        }),
      })
    }

    // Caso o erro seja um tipo inesperado
    console.error('Erro inesperado:', error)
    return res.status(500).json({
      success: false,
      error: 'Erro desconhecido',
    })
  }
}
