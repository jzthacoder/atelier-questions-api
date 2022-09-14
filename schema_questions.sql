\c jessiezhao;
DROP DATABASE questions;
CREATE DATABASE questions;

\c questions;

CREATE TABLE questions (
  id serial PRIMARY KEY,
  product_id INT NOT NULL,
  body VARCHAR (1000),
  date_written BIGINT NOT NULL,
  asker_name VARCHAR (60),
  asker_email VARCHAR (60),
  reported SMALLINT NOT NULL,
  helpful INT
);



COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/jessiezhao/Desktop/HackReactor/SEI/atelier-questions-api/raw_data/questions.csv'
DELIMITER ','
CSV HEADER;

