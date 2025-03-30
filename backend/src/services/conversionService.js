const db = require('../config/database');

class ConversionService {
  static async getTimeSeriesData({ start_date, end_date, period = 'day', channels }) {

    //console.log("chegou",start_date, end_date, period = 'day', channels)
    try {
      // Validação das datas
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);

      if (isNaN(startDate.getTime())) throw new Error('Data inicial inválida') 
      if (isNaN(endDate.getTime())) throw new Error('Data final inválida');
      if (startDate > endDate) throw new Error('Data inicial maior que final');

      // Determina se há filtro por canal
      const hasChannelFilter = channels && channels !== '';
      //console.log(hasChannelFilter)
      // Query ajustada para string única
      const query = `
        WITH date_range AS (
          SELECT generate_series($1::date, $2::date, interval '1 ${period}')::date AS date
        ),
        channel_stats AS (
          SELECT
            DATE_TRUNC($3, data_envio)::date AS date,
            origin AS channel,
            COUNT(*) FILTER (WHERE response_status_id IN (5,6)) AS conversions,
            COUNT(*) FILTER (WHERE response_status_id IN (1,4,5,6)) AS attempts,
            ROUND(
              (COUNT(*) FILTER (WHERE response_status_id IN (5,6)) * 100.0 / 
              NULLIF(COUNT(*) FILTER (WHERE response_status_id IN (1,4,5,6)), 0)),
              2
            ) AS conversion_rate
          FROM inside.users_surveys_responses_aux
          WHERE 
            data_envio BETWEEN $1 AND $2 AND
            response_status_id IN (1,4,5,6)
            ${hasChannelFilter ? 'AND origin = $4' : ''}
          GROUP BY 1, 2
        )
        SELECT
          dr.date,
          COALESCE(cs.channel, 'all') AS channel,
          COALESCE(cs.conversions, 0) AS conversions,
          COALESCE(cs.attempts, 0) AS attempts,
          COALESCE(cs.conversion_rate, 0) AS conversion_rate
        FROM date_range dr
        LEFT JOIN channel_stats cs ON dr.date = cs.date
        ${hasChannelFilter ? 'WHERE cs.channel IS NOT NULL' : ''}
        ORDER BY dr.date ASC, cs.channel ASC;
      `;

      const params = [start_date, end_date, period];
      if (hasChannelFilter) {
        params.push(channels);
      }

      const { rows } = await db.query(query, params);
      //console.log(rows)

      return rows.map(row => ({
        date: row.date.toISOString().split('T')[0],
        channel: row.channel,
        conversions: Number(row.conversions),
        attempts: Number(row.attempts),
        conversion_rate: Number(row.conversion_rate)
      }));

    } catch (error) {
      console.error('ConversionService Error:', {
        params: { start_date, end_date, period, channels },
        error: error.message
      });
      throw error;
    }
  }
}

module.exports = ConversionService;