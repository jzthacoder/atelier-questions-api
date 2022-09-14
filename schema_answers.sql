\c jessiezhao;
DROP DATABASE answers;
CREATE DATABASE answers;

\c answers;

CREATE TABLE answers (
  id serial PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR (1000),
  date_written BIGINT NOT NULL,
  answerer_name VARCHAR (60),
  answerer_email VARCHAR (60),
  reported SMALLINT NOT NULL,
  helpful INT
);


COPY answers
FROM '/Users/jessiezhao/Desktop/HackReactor/SEI/atelier-questions-api/raw_data/answers.csv'
DELIMITER ','
CSV HEADER;

