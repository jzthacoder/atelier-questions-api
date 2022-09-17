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

CREATE TABLE answers_photos (
  id serial PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR (2048)

);

COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/jessiezhao/Desktop/HackReactor/SEI/atelier-questions-api/raw_data/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers
FROM '/Users/jessiezhao/Desktop/HackReactor/SEI/atelier-questions-api/raw_data/answers.csv'
DELIMITER ','
CSV HEADER;

COPY answers_photos
FROM '/Users/jessiezhao/Desktop/HackReactor/SEI/atelier-questions-api/raw_data/answers_photos.csv'
DELIMITER ','
CSV HEADER;

SET timezone TO 'US/Pacific';

ALTER TABLE questions RENAME COLUMN id TO question_id;
ALTER TABLE questions RENAME COLUMN body TO question_body;
ALTER TABLE questions RENAME COLUMN date_written TO question_date;
ALTER TABLE questions RENAME COLUMN helpful TO question_helpfulness;

ALTER TABLE answers RENAME COLUMN date_written TO date;
ALTER TABLE answers RENAME COLUMN helpful TO helpfulness;

ALTER TABLE questions ALTER COLUMN question_date
TYPE TIMESTAMP with time zone USING to_timestamp(question_date / 1000);

ALTER TABLE questions ALTER reported TYPE bool USING CASE WHEN reported=0 THEN FALSE ELSE TRUE END;

ALTER TABLE answers ALTER COLUMN date
TYPE TIMESTAMP with time zone USING to_timestamp(date / 1000);

ALTER TABLE answers ALTER reported TYPE bool USING CASE WHEN reported=0 THEN FALSE ELSE TRUE END;

-- fix serial
SELECT setval(pg_get_serial_sequence('questions', 'question_id'), coalesce(max(question_id),0) + 1, false) FROM questions;

SELECT setval(pg_get_serial_sequence('answers', 'id'), coalesce(max(id),0) + 1, false) FROM answers;

SELECT setval(pg_get_serial_sequence('answers_photos', 'id'), coalesce(max(id),0) + 1, false) FROM answers_photos;

-- SELECT questions.id, questions.date_written,
--       TIMESTAMP 'epoch' + questions.date_written * INTERVAL '1 millisecond' as unix_date_written
-- FROM questions;

