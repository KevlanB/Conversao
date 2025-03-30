-- Importa os dados do CSV para a tabela
COPY inside.users_surveys_responses_aux (id, origin, response_status_id, data_envio)
FROM '/docker-entrypoint-initdb.d/users_surveys_responses_aux.csv'
DELIMITER ','
CSV HEADER;
