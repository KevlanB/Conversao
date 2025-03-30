# Documentação do Projeto

## 1. Introdução
Este projeto é uma aplicação full stack desenvolvida para análise da taxa de conversão com base em milhões de registros. Durante a execução do docker, é inserido esses dados em um banco de dados PostgreSql.


Decidi fazer o backend em NodeJs + Express pois julgo ter mais familiaridade, fazendo assim de forma mais rápida e para mim de fácil manutenção especificamente nessa situação.

No frontend utilizei ReactJS com Next que são tecnologias atuais, utilizadas em vários projetos. Ainda com ShadcnUI para botões e inputs, e gráficos por conta do recharts.

Para facilitar a instalação todo o projeto está dockerizado. Instalando assim o front, back e subindo o banco de dados. Disponibilizei ainda um arquivo csv na pasta docker, durante a instalação após a criação do banco de dados esse arquivo é inserido já com a coluna de data de envio.

Escolhi utilizar um arquivo csv pois o PostgreSql é mais rápido para inserir um arquivo csv do que um sql com INSERT INTO. Para milhões de dados julgo ser melhor.

## 2. Pré-requisitos
- Node.js
- PostgreSQL
- Docker
- Git

## 3. Instalação
1. Clone o repositório:
    ```bash
    git clone https://link-do-repositorio.git
    ```

## 2. Suba a aplicação com docker:
Na pasta ilumeo rode o comando:
    ```bash
    docker-compose up --build
    ```
Aguarde o docker instalar as dependências e subir os contêineres.

## 4. Arquitetura do Projeto

- O frontend comunica com o backend via API RESTful.
- O backend interage com o banco de dados PostgreSQL filtrando e recuperando dados.

## 5. Banco de Dados
### Tabela `users_surveys_responses_aux`
- **id**: Inteiro
- **origin**: Texto
- **response_status_id**: Inteiro
- **data_envio: Data

## 6. Endpoints
### `GET /api/time-series`
- **Descrição**: Retorna os dados já formatado  em JSON para o frontend utilizar nos gráficos.
- **Resposta**:
    ```json
   {
  "success": true,
  "data": [
    {
      "date": "2025-03-01",
      "channel": "email",
      "conversions": 95,
      "attempts": 8929,
      "conversion_rate": 1.06
    }
  ]
}
    ```

## 7. Configuração do Docker
**Dockerfile**
- Os arquivos Dockerfile estão localizados dentro da pasta docker

**docker-compose.yml**
- Explicação sobre os serviços definidos.

## 8. Testes
Para rodar os testes:
```bash
npm test


