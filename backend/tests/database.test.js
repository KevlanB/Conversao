const pool = require('../src/config/database');

describe('Banco de Dados', () => {
  it('deve conectar ao PostgreSQL', async () => {
    const res = await pool.query('SELECT NOW()');
    expect(res.rows[0].now).toBeInstanceOf(Date);
  });

  it('deve ter dados na tabela de respostas', async () => {
    const res = await pool.query('SELECT COUNT(*) FROM inside.users_surveys_responses_aux');
    expect(Number(res.rows[0].count)).toBeGreaterThan(0);
  });
});

afterAll(async () => {
  await pool.end();
});