const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/database');

describe('Testando a rota /api/time-series', () => {
  test("Deve retornar dados da série temporal corretamente", async () => {
    const response = await request(app)
      .get("/api/time-series?startDate=2025-03-01&endDate=2025-03-01")
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);

    response.body.data.forEach((item) => {
      expect(item).toHaveProperty("date");
      expect(item).toHaveProperty("channel");
      expect(item).toHaveProperty("conversions");
      expect(item).toHaveProperty("attempts");
      expect(item).toHaveProperty("conversion_rate");

      expect(typeof item.date).toBe("string");
      expect(typeof item.channel).toBe("string");
      expect(typeof item.conversions).toBe("number");
      expect(typeof item.attempts).toBe("number");
      expect(typeof item.conversion_rate).toBe("number");
    });

    expect(response.body.meta).toMatchObject({
      startDate: "2025-03-01",
      endDate: "2025-03-01",
      period: "day",
      count: expect.any(Number),
    });
  });
});

afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Pequeno delay antes de fechar
  await pool.end(); // Fecha conexões pendentes
});
