CREATE SCHEMA IF NOT EXISTS inside;

CREATE TABLE IF NOT EXISTS inside.users_surveys_responses_aux (
    id BIGINT PRIMARY KEY,
    origin VARCHAR(50),
    response_status_id INTEGER,
    data_envio DATE
);
