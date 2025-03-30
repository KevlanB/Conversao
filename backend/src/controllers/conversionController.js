const ConversionService = require('../services/conversionService');

const getConversionTimeSeries = async (req, res, next) => {
  try {
    // Extrai e valida os parâmetros
    const { startDate, endDate, period = 'day', channels } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Parâmetros startDate e endDate são obrigatórios'
      });
    }

    // Converte para o formato YYYY-MM-DD se necessário
    const formatDate = (dateStr) => {
      return new Date(dateStr).toISOString().split('T')[0];
    };

    // Obtém os dados do serviço
    const data = await ConversionService.getTimeSeriesData({
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      period: period.toLowerCase(), // day, week, month
      channels: channels === "mobile" ? "MOBILE" : channels === "all" ? "" : channels
    });

    res.json({
      success: true,
      data,
      meta: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        period,
        count: data.length
      }
    });

  } catch (error) {
    console.error('Controller Error:', error);
    next(error); // Passa para o errorHandler
  }
};

module.exports = {
  getConversionTimeSeries
};