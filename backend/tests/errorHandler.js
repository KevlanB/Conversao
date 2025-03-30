const request = require('supertest');
const app = require('../src/app'); // Verifique se o seu app é exportado corretamente

describe('Testando o middleware de erro', () => {
  it('Deve retornar 404 para rotas inexistentes', async () => {
    const response = await request(app)
      .get('/rota-inexistente') // Acessando uma rota inexistente
      .expect(404); // Espera um erro 404

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Not Found'); // Mensagem de erro
  });

  it('Deve retornar 500 para erros internos', async () => {
    // Simula um erro no servidor
    const response = await request(app)
      .get('/api/time-series') // Substitua com uma rota que cause erro
      .expect(500);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Erro interno no servidor'); // Mensagem de erro
  });
});
