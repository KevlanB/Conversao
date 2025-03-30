const pool = require('./config/database'); // Importe o pool de conexões

async function test() {
  try {
    const data = await ConversionService.getTimeSeriesData({
      start_date: '2023-04-01',
      end_date: '2023-04-30',
      period: 'day',
      channels: "wpp"
    });
    //console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end(); // Fecha a conexão do banco
  }
}

test();
